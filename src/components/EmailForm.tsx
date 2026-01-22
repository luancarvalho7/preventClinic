import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from './PageHeader';
import { FormStepProps } from '../types/form';

export default function EmailForm({ onContinue, formData, questionNumber }: FormStepProps) {
  const [email, setEmail] = useState(formData.email || '');
  const [error, setError] = useState('');

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // Lê ?email= da URL (client-side) e pré-preenche se for válido
  const emailFromUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const qs = new URLSearchParams(window.location.search);
    return (qs.get('email') || '').trim();
  }, []);

  useEffect(() => {
    if (!formData.email && emailFromUrl && validateEmail(emailFromUrl)) {
      setEmail(emailFromUrl);
    }
  }, [emailFromUrl, formData.email]);

  const isValid = email.trim() && validateEmail(email.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const val = email.trim();
    if (!val) {
      setError('Por favor, digite seu e-mail');
      return;
    }
    if (!validateEmail(val)) {
      setError('Por favor, digite um e-mail válido');
      return;
    }

    onContinue({ email: val });
  };

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter px-6 py-8">
      <div className="w-full max-w-2xl mx-auto">
          {questionNumber && (
            <div className="text-sm font-medium text-slate-500 mb-2">
              Pergunta {questionNumber}
            </div>
          )}
          <h1 className="text-2xl md:text-3xl font-funnel font-bold text-slate-900 mb-6">
            Qual é o seu e-mail?
          </h1>

          <form id="email-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-slate-900 mb-3">
                Digite seu e-mail:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-slate-900 focus:outline-none transition-colors text-lg"
                placeholder="seu@email.com"
                autoComplete="email"
                inputMode="email"
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

          </form>
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-16 bg-gradient-to-t from-slate-50 to-transparent">
          <div className="w-full max-w-[576px] mx-auto">
            <button
              type="submit"
              form="email-form"
              disabled={!isValid}
              className={`w-full py-4 text-white rounded-full transition-colors duration-200 font-medium text-lg shadow-md ${
                isValid
                  ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg cursor-pointer'
                  : 'bg-black cursor-not-allowed'
              }`}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
