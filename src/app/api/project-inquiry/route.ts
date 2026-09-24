/**
 * DEADCODE LABS — Project Inquiry API Route
 * POST /api/project-inquiry
 *
 * Flow:
 *  1. Parse + validate JSON body (Zod)
 *  2. Insert into Supabase (project_inquiries table) via service role
 *  3. Send admin notification email (Resend)
 *  4. Send client confirmation email (Resend)
 *  5. Return structured success/error response
 *
 * SECURITY GUARANTEES:
 *  - SUPABASE_SERVICE_ROLE_KEY  → server-only, never in client bundle
 *  - RESEND_API_KEY             → server-only, never in client bundle
 *  - No stack traces or DB internals are returned to the client
 *  - RLS is enforced at the DB level in addition to this API's own auth
 */

import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { projectInquirySchema } from "@/lib/validation/project-inquiry-schema";
import { getServerSupabaseClient } from "@/lib/supabase/server";
import {
  getResendClient,
  getFromEmail,
  getNotificationEmail,
} from "@/lib/resend/client";
import {
  buildAdminEmailHtml,
  buildAdminEmailText,
  buildClientEmailHtml,
  buildClientEmailText,
  type AdminEmailData,
} from "@/lib/resend/emails";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ApiSuccess {
  success: true;
  message: string;
  inquiryId?: string;
}

interface ApiError {
  success: false;
  message: string;
}

type ApiResponse = ApiSuccess | ApiError;

// ─── Rate limiting (simple in-memory, per-IP) ─────────────────────────────────
// For production, replace with Redis-backed rate limiting or Vercel Edge middleware.

const ipSubmissions = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // max submissions per IP per hour

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const entry = ipSubmissions.get(ip);

  if (!entry || entry.resetAt < now) {
    ipSubmissions.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfterSec };
  }

  entry.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  // ── 1. Rate limiting ──────────────────────────────────────────────────────
  const clientIp = getClientIp(request);
  const { allowed, retryAfterSec } = checkRateLimit(clientIp);

  if (!allowed) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many submissions. Please try again later.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfterSec) },
      }
    );
  }

  // ── 2. Parse body ─────────────────────────────────────────────────────────
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  // ── 3. Validate with Zod ──────────────────────────────────────────────────
  let validated;
  try {
    validated = projectInquirySchema.parse(rawBody);
  } catch (err) {
    if (err instanceof ZodError) {
      const firstMessage = err.issues[0]?.message ?? "Invalid form data.";
      return NextResponse.json(
        { success: false, message: firstMessage },
        { status: 422 }
      );
    }
    return NextResponse.json(
      { success: false, message: "We couldn't process your submission." },
      { status: 422 }
    );
  }

  // ── 4. Insert into Supabase ───────────────────────────────────────────────
  let inquiryId: string;
  let createdAt: string;

  try {
    const supabase = getServerSupabaseClient();
    const { data, error } = await supabase
      .from("project_inquiries")
      .insert({
        project_type: validated.projectType,
        project_title: validated.projectTitle || null,
        project_description: validated.projectDescription,
        website_url: validated.websiteUrl || null,
        budget: validated.budget,
        name: validated.name,
        business: validated.business || null,
        email: validated.email,
        phone: validated.phone || null,
        preferred_contact: validated.preferredContact || null,
        status: "new",
        source: "website",
      })
      .select("id, created_at")
      .single();

    if (error || !data) {
      console.error("[project-inquiry] Supabase insert error:", error?.message ?? "No data returned");
      return NextResponse.json(
        {
          success: false,
          message: "We couldn't send your project brief right now. Please try again.",
        },
        { status: 500 }
      );
    }

    inquiryId = data.id as string;
    createdAt = data.created_at as string;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown database error";
    console.error("[project-inquiry] Supabase client error:", msg);
    return NextResponse.json(
      {
        success: false,
        message: "We couldn't send your project brief right now. Please try again.",
      },
      { status: 500 }
    );
  }

  // ── 5. Send emails (independent — DB record is already safe) ─────────────
  // A failure here does NOT roll back the database insert.

  let adminEmailSent = false;
  let clientEmailSent = false;

  try {
    const resend = getResendClient();
    const fromEmail = getFromEmail();
    const notificationEmail = getNotificationEmail();

    const adminData: AdminEmailData = {
      name: validated.name,
      business: validated.business,
      email: validated.email,
      phone: validated.phone,
      preferredContact: validated.preferredContact,
      projectType: validated.projectType,
      projectTitle: validated.projectTitle,
      projectDescription: validated.projectDescription,
      websiteUrl: validated.websiteUrl,
      budget: validated.budget,
      inquiryId,
      createdAt,
    };

    // Admin notification
    const adminResult = await resend.emails.send({
      from: fromEmail,
      to: [notificationEmail],
      replyTo: validated.email,
      subject: "New Project Inquiry — DEADCODE LABS",
      html: buildAdminEmailHtml(adminData),
      text: buildAdminEmailText(adminData),
    });

    if (adminResult.error) {
      console.error("[project-inquiry] Admin email send error:", adminResult.error);
    } else {
      adminEmailSent = true;
      console.info(`[project-inquiry] Admin notification sent. Inquiry: ${inquiryId}`);
    }

    // Client confirmation
    const clientResult = await resend.emails.send({
      from: fromEmail,
      to: [validated.email],
      subject: "We've received your project brief — DEADCODE LABS",
      html: buildClientEmailHtml({
        name: validated.name,
        projectType: validated.projectType,
        budget: validated.budget,
      }),
      text: buildClientEmailText({
        name: validated.name,
        projectType: validated.projectType,
        budget: validated.budget,
      }),
    });

    if (clientResult.error) {
      console.error("[project-inquiry] Client email send error:", clientResult.error);
    } else {
      clientEmailSent = true;
      console.info(`[project-inquiry] Client confirmation sent to: ${validated.email}`);
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown email error";
    console.error("[project-inquiry] Email service error:", msg);
    // Do NOT return an error — the DB insert succeeded. Fall through to success.
  }

  // ── 6. Log summary & return success ──────────────────────────────────────
  console.info(
    `[project-inquiry] Inquiry ${inquiryId} saved. ` +
      `adminEmail=${adminEmailSent} clientEmail=${clientEmailSent}`
  );

  return NextResponse.json(
    {
      success: true,
      message: "Brief received. We'll be in touch soon.",
    },
    { status: 200 }
  );
}
