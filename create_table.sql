/*
  # Create form_submissions table with all fields

  This table stores all responses from the financial diagnostic form.

  1. Fields include:
    - Personal data (birthDate, maritalStatus, dependents, etc.)
    - Income information (main, secondary, passive income)
    - Expenses and financial control
    - Debts information
    - Assets and investments (patrimony)
    - Goals and priorities
    - Expectations and engagement

  2. Security:
    - Enable RLS
    - Add policy for authenticated users to insert their own data
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS public.form_submissions (
  id serial not null,
  email character varying(255) not null,

  -- SEÇÃO 1: Dados Pessoais
  "birthDate" date null,
  "maritalStatus" character varying(100) null,
  "hasDependents" text null,
  "dependentsCount" integer null,
  "livingWith" text null,

  -- SEÇÃO 2: Renda
  "currentProfession" text null,
  "mainIncomeSource" text null,
  "workRegime" character varying(50) null,
  "hasSecondaryIncome" text null,
  "secondaryIncomeSource" text null,
  "secondaryWorkRegime" character varying(50) null,
  "grossIncome" numeric(10, 2) null,
  "netIncome" numeric(10, 2) null,
  "incomeVariability" text null,
  "incomeVariabilityDetails" text null,
  "hasPassiveIncome" text null,
  "otherIncome" text null,

  -- SEÇÃO 3: Despesas
  "hasExpenseControl" character varying(100) null,
  "monthlyExpenses" numeric(10, 2) null,
  "surplusAction" text null,
  "deficitAction" text null,

  -- SEÇÃO 4: Dívidas
  "hasDebts" text null,
  "debtTypes" text[] null,
  "totalDebtAmount" numeric(10, 2) null,
  "averageInterestRate" numeric(5, 2) null,
  "hasOverdueDebts" text null,
  "triedRenegotiation" text null,

  -- SEÇÃO 5: Patrimônio e Investimentos
  "hasEmergencyFund" text null,
  "emergencyFundMonths" integer null,
  "emergencyFundLocation" text null,
  "alreadyInvests" text null,
  "investmentTypes" text null,
  "monthlyInvestment" numeric(10, 2) null,
  "investmentGoal" text null,
  "retirementIncome" numeric(10, 2) null,
  "hasVehicle" text null,
  "vehicleDetails" text null,
  "hasProperty" text null,
  "propertyDetails" text null,
  "otherAssets" text null,

  -- SEÇÃO 6: Objetivos e Prioridades
  "goals12Months" text null,
  "goals5Years" text null,
  "topPriority" text null,
  "goalImpact" text null,

  -- SEÇÃO 7: Expectativas e Engajamento
  "changeCommitment" integer null,
  "consultingGoals" text[] null,
  "successDefinition" text null,

  -- Metadata
  "submittedAt" timestamp without time zone null default now(),

  constraint form_submissions_pkey primary key (id)
) TABLESPACE pg_default;

-- Enable Row Level Security
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (for form submissions)
CREATE POLICY "Anyone can submit form"
  ON public.form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Users can read their own submissions by email
CREATE POLICY "Users can read own submissions"
  ON public.form_submissions
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Optional: Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON public.form_submissions(email);

-- Optional: Create index on submittedAt for date range queries
CREATE INDEX IF NOT EXISTS idx_form_submissions_submitted_at ON public.form_submissions("submittedAt");
