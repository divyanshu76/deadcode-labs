/**
 * DEADCODE LABS — Resend Email Client (Server-Only)
 *
 * Wraps the Resend SDK. Never import from client components.
 * RESEND_API_KEY must NOT be prefixed with NEXT_PUBLIC_.
 */

import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResendClient(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "[Resend] Missing RESEND_API_KEY. Set it in .env.local (server-side only)."
    );
  }
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

export function getFromEmail(): string {
  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) {
    throw new Error(
      "[Resend] Missing RESEND_FROM_EMAIL. Example: DEADCODE LABS <hello@deadcode.space>"
    );
  }
  return from;
}

export function getNotificationEmail(): string {
  const to = process.env.INQUIRY_NOTIFICATION_EMAIL;
  if (!to) {
    throw new Error(
      "[Resend] Missing INQUIRY_NOTIFICATION_EMAIL. Set the admin inbox address."
    );
  }
  return to;
}
