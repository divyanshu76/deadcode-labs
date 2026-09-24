/**
 * DEADCODE LABS — Project Inquiry Zod Schema
 *
 * Server-side validation using Zod (already a project dependency).
 * Independent of frontend validation — the server validates everything itself.
 */

import { z } from "zod";

// ─── Character limits ─────────────────────────────────────────────────────────

const LIMITS = {
  name: 150,
  business: 200,
  projectTitle: 200,
  projectDescription: 5000,
  websiteUrl: 500,
  phone: 50,
  preferredContact: 50,
  projectType: 100,
  budget: 100,
} as const;

// ─── Schema ───────────────────────────────────────────────────────────────────

export const projectInquirySchema = z.object({
  projectType: z
    .string()
    .trim()
    .min(1, "Project type is required.")
    .max(LIMITS.projectType, `Project type must be at most ${LIMITS.projectType} characters.`),

  projectTitle: z
    .string()
    .trim()
    .max(LIMITS.projectTitle, `Project title must be at most ${LIMITS.projectTitle} characters.`)
    .optional(),

  projectDescription: z
    .string()
    .trim()
    .min(1, "Project description is required.")
    .min(20, "Please add a bit more detail (at least 20 characters).")
    .max(
      LIMITS.projectDescription,
      `Project description must be at most ${LIMITS.projectDescription} characters.`
    ),

  websiteUrl: z
    .string()
    .trim()
    .max(LIMITS.websiteUrl, `Website URL must be at most ${LIMITS.websiteUrl} characters.`)
    .refine(
      (val) => !val || /^https?:\/\/.+/.test(val),
      "Website URL must start with http:// or https://"
    )
    .optional(),

  budget: z
    .string()
    .trim()
    .min(1, "Budget range is required.")
    .max(LIMITS.budget, `Budget must be at most ${LIMITS.budget} characters.`),

  name: z
    .string()
    .trim()
    .min(2, "A valid name is required (at least 2 characters).")
    .max(LIMITS.name, `Name must be at most ${LIMITS.name} characters.`),

  business: z
    .string()
    .trim()
    .max(LIMITS.business, `Business name must be at most ${LIMITS.business} characters.`)
    .optional(),

  email: z
    .string()
    .trim()
    .min(1, "Email address is required.")
    .email("Please enter a valid email address.")
    .max(254, "Email address is too long."),

  phone: z
    .string()
    .trim()
    .max(LIMITS.phone, `Phone number must be at most ${LIMITS.phone} characters.`)
    .optional(),

  preferredContact: z
    .string()
    .trim()
    .max(
      LIMITS.preferredContact,
      `Preferred contact must be at most ${LIMITS.preferredContact} characters.`
    )
    .optional(),
});

export type ValidatedInquiry = z.infer<typeof projectInquirySchema>;
