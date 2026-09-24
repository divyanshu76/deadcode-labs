/**
 * DEADCODE LABS — Email Templates
 *
 * HTML + plaintext email templates for:
 *  1. Admin notification (new inquiry alert)
 *  2. Client confirmation (thank-you receipt)
 *
 * Design language: warm ivory, espresso text, burnt copper accents.
 * Uses table-safe HTML for maximum email client compatibility.
 * No external fonts, no JavaScript, no complex CSS.
 */

// ─── Shared palette ───────────────────────────────────────────────────────────

const C = {
  ivory: "#F5F0E8",
  ivoryDark: "#EDE7D9",
  espresso: "#3A2920",
  espressoMid: "#6F5A4B",
  espressoLight: "#927D6C",
  copper: "#C96F3D",
  copperDark: "#A9512C",
  border: "#D9CEBD",
  white: "#FFFFFF",
};

// ─── Base layout wrapper ──────────────────────────────────────────────────────

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>DEADCODE LABS</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: ${C.ivoryDark}; }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${C.ivoryDark};font-family:Georgia,'Times New Roman',serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${C.ivoryDark};min-height:100vh;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <!-- Email card -->
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background-color:${C.ivory};border:1px solid ${C.border};border-radius:8px;overflow:hidden;">
          ${content}
        </table>
        <!-- Footer note -->
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;margin-top:24px;">
          <tr>
            <td align="center" style="font-family:Georgia,'Times New Roman',serif;font-size:11px;color:${C.espressoLight};line-height:1.6;">
              DEADCODE LABS &mdash; Digital Product &amp; Systems Studio<br/>
              This is an automated message. Please do not reply to this email directly.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function emailHeader(subtitle: string): string {
  return `
  <!-- Header -->
  <tr>
    <td style="padding:32px 40px 24px;border-bottom:1px solid ${C.border};background-color:${C.espresso};">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td>
            <p style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${C.copper};font-weight:bold;">
              DEADCODE LABS
            </p>
            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:bold;color:${C.white};letter-spacing:-0.3px;">
              ${subtitle}
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

function divider(): string {
  return `
  <tr>
    <td style="padding:0 40px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr><td style="border-top:1px solid ${C.border};padding-top:0;line-height:0;">&nbsp;</td></tr>
      </table>
    </td>
  </tr>`;
}

function sectionLabel(label: string): string {
  return `<p style="margin:0 0 12px;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:${C.espressoLight};font-weight:bold;">${label}</p>`;
}

function dataRow(label: string, value: string | undefined | null): string {
  if (!value || !value.trim()) return "";
  return `
  <tr>
    <td width="140" valign="top" style="padding:0 12px 10px 0;">
      <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:${C.espressoLight};">${label}</p>
    </td>
    <td valign="top" style="padding:0 0 10px;">
      <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:${C.espresso};line-height:1.55;">${escapeHtml(value)}</p>
    </td>
  </tr>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\n/g, "<br/>");
}

// ─── Admin notification email ─────────────────────────────────────────────────

export interface AdminEmailData {
  name: string;
  business?: string;
  email: string;
  phone?: string;
  preferredContact?: string;
  projectType: string;
  projectTitle?: string;
  projectDescription: string;
  websiteUrl?: string;
  budget: string;
  inquiryId: string;
  createdAt: string; // ISO 8601
}

export function buildAdminEmailHtml(d: AdminEmailData): string {
  const formattedDate = new Date(d.createdAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "long",
    timeStyle: "short",
  });

  const body = `
  ${emailHeader("New Project Inquiry")}

  <!-- Status badge row -->
  <tr>
    <td style="padding:18px 40px 0;">
      <table border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td style="background-color:${C.copper};border-radius:3px;padding:3px 10px;">
            <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:${C.white};font-weight:bold;">NEW</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- CLIENT section -->
  <tr>
    <td style="padding:24px 40px 0;">
      ${sectionLabel("Client")}
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        ${dataRow("Name", d.name)}
        ${dataRow("Business", d.business)}
        ${dataRow("Email", d.email)}
        ${dataRow("Phone", d.phone)}
        ${dataRow("Preferred Contact", d.preferredContact)}
      </table>
    </td>
  </tr>

  ${divider()}

  <!-- PROJECT section -->
  <tr>
    <td style="padding:20px 40px 0;">
      ${sectionLabel("Project")}
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        ${dataRow("Type", d.projectType)}
        ${dataRow("Title", d.projectTitle)}
        ${dataRow("Budget", d.budget)}
        ${dataRow("Website", d.websiteUrl)}
      </table>
    </td>
  </tr>

  ${divider()}

  <!-- DESCRIPTION section -->
  <tr>
    <td style="padding:20px 40px 0;">
      ${sectionLabel("Project Details")}
      <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:${C.espresso};line-height:1.7;white-space:pre-wrap;">${escapeHtml(d.projectDescription)}</p>
    </td>
  </tr>

  ${divider()}

  <!-- Meta section -->
  <tr>
    <td style="padding:20px 40px 28px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        ${dataRow("Submitted", formattedDate)}
        ${dataRow("Inquiry ID", d.inquiryId)}
        ${dataRow("Source", "Website")}
      </table>
    </td>
  </tr>`;

  return emailWrapper(body);
}

export function buildAdminEmailText(d: AdminEmailData): string {
  const formattedDate = new Date(d.createdAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "long",
    timeStyle: "short",
  });

  return `DEADCODE LABS — New Project Inquiry
=====================================
STATUS: NEW

CLIENT
------
Name:              ${d.name}
Business:          ${d.business || "—"}
Email:             ${d.email}
Phone:             ${d.phone || "—"}
Preferred Contact: ${d.preferredContact || "—"}

PROJECT
-------
Type:    ${d.projectType}
Title:   ${d.projectTitle || "—"}
Budget:  ${d.budget}
Website: ${d.websiteUrl || "—"}

PROJECT DETAILS
---------------
${d.projectDescription}

META
----
Submitted:  ${formattedDate}
Inquiry ID: ${d.inquiryId}
Source:     Website
`.trim();
}

// ─── Client confirmation email ────────────────────────────────────────────────

export interface ClientEmailData {
  name: string;
  projectType: string;
  budget: string;
}

export function buildClientEmailHtml(d: ClientEmailData): string {
  const websiteUrl = "https://deadcode.space";

  const body = `
  ${emailHeader("We&rsquo;ve received your project brief.")}

  <!-- Greeting -->
  <tr>
    <td style="padding:32px 40px 0;">
      <p style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:${C.espresso};line-height:1.6;">
        Hi ${escapeHtml(d.name)},
      </p>
      <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:${C.espressoMid};line-height:1.7;">
        Thanks for reaching out to DEADCODE LABS. We&rsquo;ve received your project brief and will review the details you&rsquo;ve shared.
      </p>
    </td>
  </tr>

  ${divider()}

  <!-- Project summary -->
  <tr>
    <td style="padding:20px 40px 0;">
      ${sectionLabel("Your Submission")}
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        ${dataRow("Project Type", d.projectType)}
        ${dataRow("Budget", d.budget)}
      </table>
    </td>
  </tr>

  ${divider()}

  <!-- Next steps -->
  <tr>
    <td style="padding:20px 40px 32px;">
      <p style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:${C.espresso};line-height:1.7;font-weight:bold;">
        What happens next?
      </p>
      <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:${C.espressoMid};line-height:1.8;">
        Our team will review your brief and get back to you with the next steps. We&rsquo;ll typically reach out via the contact details you&rsquo;ve provided.
      </p>
    </td>
  </tr>

  <!-- Footer brand -->
  <tr>
    <td style="padding:20px 40px 28px;border-top:1px solid ${C.border};background-color:${C.espresso};">
      <p style="margin:0 0 4px;font-family:Georgia,'Times New Roman',serif;font-size:13px;font-weight:bold;color:${C.white};">
        DEADCODE LABS
      </p>
      <p style="margin:0 0 10px;font-family:Georgia,'Times New Roman',serif;font-size:12px;color:${C.copper};">
        Digital Product &amp; Systems Studio
      </p>
      <a href="${websiteUrl}" style="font-family:'Courier New',Courier,monospace;font-size:11px;color:${C.copper};text-decoration:none;letter-spacing:0.05em;">
        ${websiteUrl}
      </a>
    </td>
  </tr>`;

  return emailWrapper(body);
}

export function buildClientEmailText(d: ClientEmailData): string {
  return `Hi ${d.name},

Thanks for reaching out to DEADCODE LABS.

We've received your project brief and will review the details you've shared.

YOUR SUBMISSION
---------------
Project Type: ${d.projectType}
Budget:       ${d.budget}

Our team will review your brief and get back to you with the next steps. We'll typically reach out via the contact details you've provided.

—
DEADCODE LABS
Digital Product & Systems Studio
https://deadcode.space
`.trim();
}
