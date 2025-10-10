/*
  # Create Form Responses Table

  1. New Tables
    - `form_responses`
      - `id` (uuid, primary key)
      - `email` (text) - Email do usuário que preencheu
      - `responses` (jsonb) - Todas as respostas do formulário em formato JSON
      - `submitted_at` (timestamptz) - Data e hora do envio
      - `created_at` (timestamptz) - Data de criação do registro

  2. Security
    - Enable RLS on `form_responses` table
    - Add policy for inserting responses (public access for form submissions)
    - Add policy for reading responses (authenticated users only)
*/

CREATE TABLE IF NOT EXISTS form_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  responses jsonb NOT NULL,
  submitted_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE form_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert form responses"
  ON form_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all responses"
  ON form_responses
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX idx_form_responses_email ON form_responses(email);
CREATE INDEX idx_form_responses_submitted_at ON form_responses(submitted_at DESC);