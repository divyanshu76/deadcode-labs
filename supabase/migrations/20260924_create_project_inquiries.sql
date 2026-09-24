-- ============================================================
-- DEADCODE LABS — Supabase Migration
-- Table: project_inquiries
-- 
-- Run this in the Supabase SQL Editor or via the Supabase CLI.
-- Safe to run on a fresh project. Checks for table existence
-- before creating to avoid destructive re-runs.
-- ============================================================

-- ── Create table ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS project_inquiries (
  id                  uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          timestamptz   NOT NULL DEFAULT now(),

  -- Project fields
  project_type        text          NOT NULL,
  project_title       text,
  project_description text          NOT NULL,
  website_url         text,
  budget              text          NOT NULL,

  -- Contact fields
  name                text          NOT NULL,
  business            text,
  email               text          NOT NULL,
  phone               text,
  preferred_contact   text,

  -- CRM fields
  status              text          NOT NULL DEFAULT 'new',
  source              text          NOT NULL DEFAULT 'website',
  admin_notes         text
);

-- ── Comments ──────────────────────────────────────────────────────────────────

COMMENT ON TABLE  project_inquiries               IS 'Project inquiry leads submitted via the DEADCODE LABS website estimator.';
COMMENT ON COLUMN project_inquiries.status        IS 'Lead status: new | reviewed | contacted | qualified | closed';
COMMENT ON COLUMN project_inquiries.source        IS 'Lead origin: website | referral | etc. Set server-side, not user-editable.';
COMMENT ON COLUMN project_inquiries.admin_notes   IS 'Internal notes added by the DEADCODE LABS team — never exposed to the client.';

-- ── Indexes ───────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS project_inquiries_created_at_idx ON project_inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS project_inquiries_status_idx     ON project_inquiries (status);
CREATE INDEX IF NOT EXISTS project_inquiries_email_idx      ON project_inquiries (email);

-- ── Row Level Security ────────────────────────────────────────────────────────
-- Enable RLS. Public users cannot read or modify rows.
-- All inserts must go through the server-side API (service role key bypasses RLS).

ALTER TABLE project_inquiries ENABLE ROW LEVEL SECURITY;

-- Drop old policies if re-running (safe: IF EXISTS)
DROP POLICY IF EXISTS "Public users cannot read inquiries"  ON project_inquiries;
DROP POLICY IF EXISTS "Public users cannot insert directly" ON project_inquiries;
DROP POLICY IF EXISTS "Public users cannot update"         ON project_inquiries;
DROP POLICY IF EXISTS "Public users cannot delete"         ON project_inquiries;

-- Deny all operations for anon/authenticated roles via the public API
-- (Service role key used server-side is exempt from RLS)
CREATE POLICY "Public users cannot read inquiries"
  ON project_inquiries FOR SELECT
  USING (false);

CREATE POLICY "Public users cannot insert directly"
  ON project_inquiries FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Public users cannot update"
  ON project_inquiries FOR UPDATE
  USING (false);

CREATE POLICY "Public users cannot delete"
  ON project_inquiries FOR DELETE
  USING (false);

-- ── Status constraint (optional but recommended) ──────────────────────────────

ALTER TABLE project_inquiries
  DROP CONSTRAINT IF EXISTS project_inquiries_status_check;

ALTER TABLE project_inquiries
  ADD CONSTRAINT project_inquiries_status_check
  CHECK (status IN ('new', 'reviewed', 'contacted', 'qualified', 'closed'));

-- ============================================================
-- END OF MIGRATION
-- ============================================================
