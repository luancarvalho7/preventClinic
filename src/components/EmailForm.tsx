import React, { useEffect, useMemo, useState } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center font-sans px-6">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {questionNumber && (
            <div className="text-sm font-medium text-slate-500 mb-2 text-center">
              Pergunta {questionNumber}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-center">
            Diagnóstico Financeiro Pessoal
          </h1>

          <div className="prose prose-slate max-w-none mb-8 text-slate-700 leading-relaxed">
            <p className="text-lg mb-4">Olá!</p>
            <p className="mb-4">
              Este questionário é o primeiro passo para que possamos começar a traçar o seu planejamento financeiro personalizado.
              Queremos te ajudar a organizar o fluxo de dinheiro, eliminar eventuais dívidas, investir melhor e alcançar seus objetivos.
            </p>
            <p className="mb-4">Reserve cerca de 10 minutos para responder com calma.</p>
            <p className="font-medium text-slate-900">
              Não há respostas certas ou erradas. O importante é que sejam verdadeiras e completas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-slate-900 mb-3">
                Para começar, digite seu e-mail:
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
              {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200 font-medium text-lg shadow-md hover:shadow-lg"
            >
              Iniciar Diagnóstico
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
