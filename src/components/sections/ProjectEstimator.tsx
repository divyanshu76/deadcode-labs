"use client";

import React, { useReducer, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ArrowLeft, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  ProjectInquiry,
  ProjectType,
  BudgetRange,
  PreferredContact,
  ProjectInquiryResponse,
} from "@/types/project-inquiry";
import { EMPTY_INQUIRY } from "@/types/project-inquiry";

// ─── Constants ───────────────────────────────────────────────────────────────

const PROJECT_TYPES: ProjectType[] = [
  "Website",
  "E-commerce",
  "Web App",
  "SaaS",
  "AI Product",
  "Automation",
  "Other",
];

const BUDGET_OPTIONS: BudgetRange[] = [
  "₹15k – ₹30k",
  "₹30k – ₹60k",
  "₹60k – ₹1L",
  "₹1L+",
  "Not sure yet",
];

const CONTACT_METHODS: Exclude<PreferredContact, "">[] = [
  "Email",
  "WhatsApp",
  "Phone Call",
];

const TOTAL_STEPS = 5;
const STEP_LABELS = ["Type", "Details", "Budget", "Contact", "Review"];

// ─── State & Reducer ─────────────────────────────────────────────────────────

type SubmissionState = "idle" | "submitting" | "success" | "error";

interface FormState {
  step: number;
  data: ProjectInquiry;
  errors: Partial<Record<keyof ProjectInquiry, string>>;
  submissionState: SubmissionState;
}

type FormAction =
  | { type: "SET_FIELD"; field: keyof ProjectInquiry; value: string }
  | { type: "SET_ERRORS"; errors: Partial<Record<keyof ProjectInquiry, string>> }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "GOTO_STEP"; step: number }
  | { type: "SET_SUBMISSION_STATE"; state: SubmissionState }
  | { type: "RESET" };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: undefined },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "NEXT_STEP":
      return { ...state, step: Math.min(state.step + 1, TOTAL_STEPS - 1), errors: {} };
    case "PREV_STEP":
      return { ...state, step: Math.max(state.step - 1, 0), errors: {} };
    case "GOTO_STEP":
      return { ...state, step: action.step, errors: {} };
    case "SET_SUBMISSION_STATE":
      return { ...state, submissionState: action.state };
    case "RESET":
      return { step: 0, data: EMPTY_INQUIRY, errors: {}, submissionState: "idle" };
    default:
      return state;
  }
}

// ─── Validation ──────────────────────────────────────────────────────────────

function validateStep(
  step: number,
  data: ProjectInquiry
): Partial<Record<keyof ProjectInquiry, string>> {
  const errors: Partial<Record<keyof ProjectInquiry, string>> = {};

  if (step === 0) {
    if (!data.projectType) errors.projectType = "Please select a project type.";
  }
  if (step === 1) {
    if (!data.projectDescription.trim()) {
      errors.projectDescription = "Please tell us about your project.";
    } else if (data.projectDescription.trim().length < 20) {
      errors.projectDescription = "Please add a bit more detail (at least 20 characters).";
    }
    if (data.websiteUrl && !/^https?:\/\/.+/.test(data.websiteUrl.trim())) {
      errors.websiteUrl = "Enter a valid URL starting with http:// or https://";
    }
  }
  if (step === 2) {
    if (!data.budget) errors.budget = "Please select a budget range.";
  }
  if (step === 3) {
    if (!data.name.trim() || data.name.trim().length < 2) {
      errors.name = "Please enter your full name (at least 2 characters).";
    }
    if (!data.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
  }
  return errors;
}

// ─── Transition variants ─────────────────────────────────────────────────────

const easeOut: [number, number, number, number] = [0.25, 1, 0.5, 1];

const stepVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 14 : -14,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: easeOut },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -14 : 14,
    transition: { duration: 0.22, ease: easeOut },
  }),
};

// ─── SelectCard ───────────────────────────────────────────────────────────────

interface SelectCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function SelectCard({ label, selected, onClick }: SelectCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") onClick();
      }}
      className={cn(
        "text-left px-4 py-3.5 md:px-5 md:py-4 rounded-xl border transition-all duration-200",
        "flex items-center justify-between group",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C96F3D]/50 focus-visible:ring-offset-2",
        selected
          ? "border-[#C96F3D] bg-[rgba(201,111,61,0.07)] shadow-[0_0_0_1px_rgba(201,111,61,0.2)]"
          : "border-white/50 bg-white/20 hover:border-[#C96F3D]/40 hover:bg-white/30"
      )}
    >
      <span
        className={cn(
          "block text-sm font-semibold transition-colors duration-200",
          selected
            ? "text-[#3A2920]"
            : "text-[#6F5A4B] group-hover:text-[#3A2920]"
        )}
      >
        {label}
      </span>
      <div
        className={cn(
          "w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center",
          "transition-all duration-200 ml-3",
          selected
            ? "border-[#C96F3D] bg-[#C96F3D]"
            : "border-[#B5A090] group-hover:border-[#C96F3D]/60"
        )}
      >
        {selected && (
          <svg
            viewBox="0 0 8 8"
            className="w-2 h-2"
            aria-hidden="true"
          >
            <path
              d="M1.5 4L3 5.5L6.5 2"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </button>
  );
}

// ─── Field ────────────────────────────────────────────────────────────────────

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, required, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#6F5A4B] font-mono"
      >
        {label}
        {required && (
          <span className="text-[#C96F3D] ml-0.5" aria-label="required">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          role="alert"
          id={`${id}-error`}
          className="text-xs text-[#C96F3D] mt-0.5 flex items-center gap-1.5"
        >
          <span
            className="inline-block w-3.5 h-3.5 rounded-full bg-[#C96F3D]/12 flex-shrink-0
                       flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="block w-1 h-1 rounded-full bg-[#C96F3D]" />
          </span>
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls = cn(
  "glass-input w-full px-4 py-3 rounded-xl",
  "text-sm text-[#3A2920] placeholder:text-[#B5A090]",
  "min-h-[46px] focus:outline-none transition-all duration-200"
);

// ─── Steps ────────────────────────────────────────────────────────────────────

interface StepProps {
  data: ProjectInquiry;
  errors: Partial<Record<keyof ProjectInquiry, string>>;
  dispatch: React.Dispatch<FormAction>;
}

function Step1Type({ data, errors, dispatch }: StepProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-[#3A2920] mb-1">
          What do you need?
        </h3>
        {errors.projectType && (
          <p role="alert" className="text-xs text-[#C96F3D] mt-1">
            {errors.projectType}
          </p>
        )}
      </div>
      <div
        className="grid grid-cols-2 gap-2 md:gap-2.5"
        role="radiogroup"
        aria-label="Project type"
      >
        {PROJECT_TYPES.map((type) => (
          <SelectCard
            key={type}
            label={type}
            selected={data.projectType === type}
            onClick={() =>
              dispatch({ type: "SET_FIELD", field: "projectType", value: type })
            }
          />
        ))}
      </div>
    </div>
  );
}

function Step2Details({ data, errors, dispatch }: StepProps) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-[#3A2920]">
        Tell us about the project.
      </h3>

      <Field id="projectTitle" label="Project name / working title">
        <input
          id="projectTitle"
          type="text"
          value={data.projectTitle}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "projectTitle", value: e.target.value })
          }
          placeholder="e.g. Aura — Brand Refresh"
          className={inputCls}
          autoComplete="off"
        />
      </Field>

      <Field
        id="projectDescription"
        label="Project description"
        required
        error={errors.projectDescription}
      >
        <textarea
          id="projectDescription"
          value={data.projectDescription}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "projectDescription",
              value: e.target.value,
            })
          }
          placeholder="Tell us what you're looking to build, improve, or automate..."
          rows={5}
          className={cn(inputCls, "resize-none min-h-[120px]")}
          aria-describedby={errors.projectDescription ? "projectDescription-error" : undefined}
        />
      </Field>

      <Field
        id="websiteUrl"
        label="Existing website / app URL"
        error={errors.websiteUrl}
      >
        <input
          id="websiteUrl"
          type="url"
          value={data.websiteUrl}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "websiteUrl", value: e.target.value })
          }
          placeholder="https://yourwebsite.com"
          className={inputCls}
          autoComplete="url"
        />
      </Field>
    </div>
  );
}

function Step3Budget({ data, errors, dispatch }: StepProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-[#3A2920] mb-1">
          What&apos;s your expected budget?
        </h3>
        <p className="text-sm text-[#6F5A4B]">
          Not sure? That&apos;s completely fine. We&apos;ll help define the scope first.
        </p>
        {errors.budget && (
          <p role="alert" className="text-xs text-[#C96F3D] mt-1">
            {errors.budget}
          </p>
        )}
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-2.5"
        role="radiogroup"
        aria-label="Budget range"
      >
        {BUDGET_OPTIONS.map((option) => (
          <SelectCard
            key={option}
            label={option}
            selected={data.budget === option}
            onClick={() =>
              dispatch({ type: "SET_FIELD", field: "budget", value: option })
            }
          />
        ))}
      </div>
    </div>
  );
}

function Step4Contact({ data, errors, dispatch }: StepProps) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-[#3A2920]">
        How can we reach you?
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id="name" label="Full name" required error={errors.name}>
          <input
            id="name"
            type="text"
            value={data.name}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })
            }
            placeholder="Your name"
            className={inputCls}
            autoComplete="name"
          />
        </Field>

        <Field id="business" label="Business / Brand">
          <input
            id="business"
            type="text"
            value={data.business}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "business", value: e.target.value })
            }
            placeholder="Your company or brand"
            className={inputCls}
            autoComplete="organization"
          />
        </Field>
      </div>

      <Field id="email" label="Email address" required error={errors.email}>
        <input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })
          }
          placeholder="you@example.com"
          className={inputCls}
          autoComplete="email"
        />
      </Field>

      <Field id="phone" label="Phone / WhatsApp">
        <input
          id="phone"
          type="tel"
          value={data.phone}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "phone", value: e.target.value })
          }
          placeholder="+91 98765 43210"
          className={inputCls}
          autoComplete="tel"
        />
      </Field>

      <Field id="preferredContact" label="Preferred contact method">
        <div
          className="flex flex-wrap gap-2"
          role="radiogroup"
          aria-label="Preferred contact method"
        >
          {CONTACT_METHODS.map((method) => (
            <button
              key={method}
              type="button"
              role="radio"
              aria-checked={data.preferredContact === method}
              onClick={() =>
                dispatch({
                  type: "SET_FIELD",
                  field: "preferredContact",
                  value: data.preferredContact === method ? "" : method,
                })
              }
              className={cn(
                "px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C96F3D]/50",
                data.preferredContact === method
                  ? "border-[#C96F3D] bg-[rgba(201,111,61,0.08)] text-[#3A2920]"
                  : "border-white/50 bg-white/20 text-[#6F5A4B] hover:border-[#C96F3D]/40 hover:text-[#3A2920]"
              )}
            >
              {method}
            </button>
          ))}
        </div>
      </Field>
    </div>
  );
}

// ─── Review Row ───────────────────────────────────────────────────────────────

interface ReviewRowProps {
  label: string;
  value: string;
  onEdit: () => void;
}

function ReviewRow({ label, value, onEdit }: ReviewRowProps) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between py-3 border-b border-white/30 last:border-0 gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#927D6C] mb-0.5">
          {label}
        </p>
        <p className="text-sm text-[#3A2920] font-medium break-words leading-relaxed">
          {value}
        </p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="text-[11px] text-[#C96F3D] font-semibold hover:underline flex-shrink-0 mt-0.5
                   focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C96F3D]/50 rounded px-1"
        aria-label={`Edit ${label}`}
      >
        Edit
      </button>
    </div>
  );
}

// ─── Step 5 Review ────────────────────────────────────────────────────────────

interface Step5ReviewProps {
  data: ProjectInquiry;
  onGotoStep: (step: number) => void;
  isSubmitting: boolean;
  onSubmit: () => void;
}

function Step5Review({ data, onGotoStep, isSubmitting, onSubmit }: Step5ReviewProps) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-[#3A2920]">
        Review your project brief.
      </h3>

      <div className="rounded-xl border border-white/40 bg-white/20 px-4 py-1 md:px-5">
        <ReviewRow
          label="Project type"
          value={data.projectType}
          onEdit={() => onGotoStep(0)}
        />
        {data.projectTitle && (
          <ReviewRow
            label="Working title"
            value={data.projectTitle}
            onEdit={() => onGotoStep(1)}
          />
        )}
        <ReviewRow
          label="Description"
          value={data.projectDescription}
          onEdit={() => onGotoStep(1)}
        />
        {data.websiteUrl && (
          <ReviewRow
            label="Website"
            value={data.websiteUrl}
            onEdit={() => onGotoStep(1)}
          />
        )}
        <ReviewRow label="Budget" value={data.budget} onEdit={() => onGotoStep(2)} />
        <ReviewRow label="Name" value={data.name} onEdit={() => onGotoStep(3)} />
        {data.business && (
          <ReviewRow
            label="Business / Brand"
            value={data.business}
            onEdit={() => onGotoStep(3)}
          />
        )}
        <ReviewRow label="Email" value={data.email} onEdit={() => onGotoStep(3)} />
        {data.phone && (
          <ReviewRow
            label="Phone / WhatsApp"
            value={data.phone}
            onEdit={() => onGotoStep(3)}
          />
        )}
        {data.preferredContact && (
          <ReviewRow
            label="Preferred contact"
            value={data.preferredContact}
            onEdit={() => onGotoStep(3)}
          />
        )}
      </div>

      <Button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className={cn(
          "w-full justify-center text-sm h-[50px] md:h-[54px]",
          isSubmitting && "opacity-70 pointer-events-none"
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            Sending brief...
          </>
        ) : (
          <>
            Send Project Brief{" "}
            <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
          </>
        )}
      </Button>
    </div>
  );
}

// ─── Success State ────────────────────────────────────────────────────────────

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: easeOut }}
      className="flex flex-col items-center text-center py-10 md:py-14 gap-5"
    >
      <div className="w-16 h-16 rounded-full bg-[rgba(201,111,61,0.10)] flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8 text-[#C96F3D]" aria-hidden="true" />
      </div>
      <div>
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#C96F3D] font-semibold mb-2">
          BRIEF RECEIVED
        </p>
        <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#3A2920] mb-3">
          You&apos;re on our radar.
        </h3>
        <p className="text-sm md:text-base text-[#6F5A4B] max-w-sm mx-auto leading-relaxed">
          Thanks for sharing your project. We&apos;ll review the brief and get back to you with
          next steps.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 text-sm text-[#6F5A4B] hover:text-[#3A2920] underline underline-offset-4
                   transition-colors focus-visible:outline-none focus-visible:ring-1
                   focus-visible:ring-[#C96F3D]/50 rounded"
      >
        Back to site
      </button>
    </motion.div>
  );
}

// ─── Error State ──────────────────────────────────────────────────────────────

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: easeOut }}
      className="flex flex-col items-center text-center py-10 md:py-14 gap-5"
    >
      <div className="w-16 h-16 rounded-full bg-[rgba(201,111,61,0.07)] flex items-center justify-center">
        <XCircle className="w-8 h-8 text-[#C96F3D]/70" aria-hidden="true" />
      </div>
      <div>
        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-[#3A2920] mb-2">
          Something went wrong.
        </h3>
        <p className="text-sm text-[#6F5A4B] max-w-sm mx-auto leading-relaxed">
          We couldn&apos;t send your project brief right now. Please try again or reach out
          directly.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
        <Button type="button" onClick={onRetry} className="text-sm h-[46px] px-6">
          Try Again
        </Button>
        <a
          href="mailto:divyanshuv0905@gmail.com"
          className="text-sm text-[#C96F3D] hover:text-[#A9512C] underline underline-offset-4
                     transition-colors font-medium"
        >
          Email us directly
        </a>
      </div>
    </motion.div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  return (
    <div
      className="flex items-end gap-1.5 mb-8 md:mb-10"
      role="progressbar"
      aria-valuenow={step + 1}
      aria-valuemin={1}
      aria-valuemax={TOTAL_STEPS}
      aria-label={`Step ${step + 1} of ${TOTAL_STEPS}: ${STEP_LABELS[step]}`}
    >
      {STEP_LABELS.map((label, i) => (
        <div key={label} className="flex-1 flex flex-col gap-1">
          <div
            className={cn(
              "h-[3px] rounded-full transition-all duration-400",
              i < step
                ? "bg-[#C96F3D]/45"
                : i === step
                ? "bg-[#C96F3D]"
                : "bg-[#B5A090]/22"
            )}
          />
          <span
            className={cn(
              "hidden md:block text-[9px] font-mono uppercase tracking-wider",
              "transition-colors duration-200",
              i === step ? "text-[#C96F3D]" : "text-[#B5A090]/55"
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ProjectEstimator() {
  const [state, dispatch] = useReducer(formReducer, {
    step: 0,
    data: EMPTY_INQUIRY,
    errors: {},
    submissionState: "idle",
  });

  const [direction, setDirection] = useState(1);

  const handleNext = useCallback(() => {
    const errors = validateStep(state.step, state.data);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }
    setDirection(1);
    dispatch({ type: "NEXT_STEP" });
  }, [state.step, state.data]);

  const handleBack = useCallback(() => {
    setDirection(-1);
    dispatch({ type: "PREV_STEP" });
  }, []);

  const handleGotoStep = useCallback(
    (step: number) => {
      setDirection(step > state.step ? 1 : -1);
      dispatch({ type: "GOTO_STEP", step });
    },
    [state.step]
  );

  const handleSubmit = useCallback(async () => {
    if (state.submissionState === "submitting") return;
    dispatch({ type: "SET_SUBMISSION_STATE", state: "submitting" });

    const payload: ProjectInquiry = {
      ...state.data,
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/project-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: ProjectInquiryResponse = await res.json();

      if (res.ok && result.success) {
        dispatch({ type: "SET_SUBMISSION_STATE", state: "success" });
      } else {
        dispatch({ type: "SET_SUBMISSION_STATE", state: "error" });
      }
    } catch {
      dispatch({ type: "SET_SUBMISSION_STATE", state: "error" });
    }
  }, [state.data, state.submissionState]);

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" });
    setDirection(1);
  }, []);

  const handleRetry = useCallback(() => {
    dispatch({ type: "SET_SUBMISSION_STATE", state: "idle" });
  }, []);

  const isSubmitting = state.submissionState === "submitting";

  // Soft "can continue" gate (button enabled/disabled)
  const canContinue = (() => {
    if (state.step === 0) return !!state.data.projectType;
    if (state.step === 1) return state.data.projectDescription.trim().length >= 1;
    if (state.step === 2) return !!state.data.budget;
    if (state.step === 3) return !!(state.data.name.trim() && state.data.email.trim());
    return true;
  })();

  const isTerminalState =
    state.submissionState === "success" || state.submissionState === "error";

  return (
    <>
      {/* Anchor alias so Final CTA "Start a Project" button also works */}
      <div id="start-a-project" className="sr-only" aria-hidden="true" />

      <section
        id="start-project"
        className="py-14 md:py-24 border-t border-white/30"
        aria-labelledby="estimator-heading"
        style={{ scrollMarginTop: "100px" }}
      >
        <Container>
          <div className="max-w-[820px] mx-auto">
            {/* ── Section Header ── */}
            <div className="text-center mb-10 md:mb-16">
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#C96F3D] font-semibold block mb-3">
                PROJECT ESTIMATOR
              </span>
              <h2
                id="estimator-heading"
                className="font-display text-4xl md:text-5xl lg:text-[64px] font-bold tracking-tight text-[#3A2920] mb-4 leading-[1.05]"
              >
                Start a project.
              </h2>
              <p className="text-sm md:text-base text-[#6F5A4B] max-w-md mx-auto leading-relaxed">
                Tell us what you&apos;re building. We&apos;ll help shape the scope, estimate the
                effort, and define the right technical direction.
              </p>
            </div>

            {/* ── Glass Card ── */}
            <div className="glass-elevated rounded-[28px] md:rounded-[36px] p-5 sm:p-8 md:p-10 lg:p-12 overflow-hidden">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                {state.submissionState === "success" ? (
                  <motion.div key="success">
                    <SuccessState onReset={handleReset} />
                  </motion.div>
                ) : state.submissionState === "error" ? (
                  <motion.div key="error">
                    <ErrorState onRetry={handleRetry} />
                  </motion.div>
                ) : (
                  <motion.div
                    key={`step-${state.step}`}
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col max-w-2xl mx-auto w-full"
                  >
                    {/* Progress */}
                    <ProgressBar step={state.step} />

                    {/* Step Content */}
                    <div>
                      {state.step === 0 && (
                        <Step1Type
                          data={state.data}
                          errors={state.errors}
                          dispatch={dispatch}
                        />
                      )}
                      {state.step === 1 && (
                        <Step2Details
                          data={state.data}
                          errors={state.errors}
                          dispatch={dispatch}
                        />
                      )}
                      {state.step === 2 && (
                        <Step3Budget
                          data={state.data}
                          errors={state.errors}
                          dispatch={dispatch}
                        />
                      )}
                      {state.step === 3 && (
                        <Step4Contact
                          data={state.data}
                          errors={state.errors}
                          dispatch={dispatch}
                        />
                      )}
                      {state.step === 4 && (
                        <Step5Review
                          data={state.data}
                          onGotoStep={handleGotoStep}
                          isSubmitting={isSubmitting}
                          onSubmit={handleSubmit}
                        />
                      )}
                    </div>

                    {/* ── Navigation footer (all steps except review) ── */}
                    {!isTerminalState && state.step < TOTAL_STEPS - 1 && (
                      <div className="mt-8 pt-5 border-t border-white/30 flex items-center justify-between">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={handleBack}
                          disabled={state.step === 0}
                          className={cn(
                            "text-sm h-[46px] px-4",
                            state.step === 0 ? "invisible" : ""
                          )}
                          aria-hidden={state.step === 0}
                        >
                          <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" />
                          Back
                        </Button>
                        <Button
                          type="button"
                          onClick={handleNext}
                          disabled={!canContinue}
                          className="text-sm h-[46px] px-6"
                        >
                          Continue{" "}
                          <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                        </Button>
                      </div>
                    )}

                    {/* ── Back button on review step ── */}
                    {!isTerminalState && state.step === TOTAL_STEPS - 1 && !isSubmitting && (
                      <div className="mt-4 pt-4 border-t border-white/30">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={handleBack}
                          className="text-sm h-[42px] px-4"
                        >
                          <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" />
                          Back
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
