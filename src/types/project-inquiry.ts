/**
 * DEADCODE LABS — Project Inquiry Types
 * Future-ready for Supabase + Resend integration.
 * Add email/DB logic only in the API route — never here or in client components.
 */

export type ProjectType =
  | "Website"
  | "E-commerce"
  | "Web App"
  | "SaaS"
  | "AI Product"
  | "Automation"
  | "Other";

export type BudgetRange =
  | "₹15k – ₹30k"
  | "₹30k – ₹60k"
  | "₹60k – ₹1L"
  | "₹1L+"
  | "Not sure yet";

export type PreferredContact = "Email" | "WhatsApp" | "Phone Call" | "";

/**
 * The canonical project inquiry payload.
 * This exact shape is sent to POST /api/project-inquiry.
 */
export interface ProjectInquiry {
  projectType: ProjectType | "";
  projectTitle: string;
  projectDescription: string;
  websiteUrl: string;
  budget: BudgetRange | "";
  name: string;
  business: string;
  email: string;
  phone: string;
  preferredContact: PreferredContact;
  submittedAt: string; // ISO 8601
}

/**
 * The empty/initial state of the form.
 */
export const EMPTY_INQUIRY: ProjectInquiry = {
  projectType: "",
  projectTitle: "",
  projectDescription: "",
  websiteUrl: "",
  budget: "",
  name: "",
  business: "",
  email: "",
  phone: "",
  preferredContact: "",
  submittedAt: "",
};

/**
 * API response shape from POST /api/project-inquiry
 */
export interface ProjectInquiryResponse {
  success: boolean;
  message: string;
  /** Returned on success — not displayed in UI but available if needed */
  inquiryId?: string;
}
