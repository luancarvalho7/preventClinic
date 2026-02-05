import React, { useState } from 'react';
import PageHeader from './PageHeader';
import { FormStepProps } from '../types/form';
import BackButton from './BackButton';

export default function NameForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [name, setName] = useState(formData?.name || '');
  const [error, setError] = useState('');

  const isValid = name.trim().length >= 2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const val = name.trim();
    if (!val) {
      setError('Por favor, digite seu nome');
      return;
    }
    if (val.length < 2) {
      setError('Nome muito curto');
      return;
    }

    onContinue({ name: val });
  };

  return (
    <>
      <PageHeader />
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter px-6 py-8 pt-20">
        <div className="w-full max-w-2xl mx-auto">
          {questionNumber && (
            <div className="text-sm font-medium text-slate-500 mb-2">
              Pergunta {questionNumber}
            </div>
          )}
          <h1 className="text-2xl md:text-3xl font-funnel font-bold text-slate-900 mb-6">
            Qual é o seu nome?
          </h1>

          <form id="name-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-slate-900 mb-3">
                Digite seu nome completo:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-slate-900 focus:outline-none transition-colors text-lg"
                placeholder="João Silva"
                autoComplete="name"
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

          </form>
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-16 bg-gradient-to-t from-slate-50 to-transparent">
          <div className="w-full max-w-[576px] mx-auto">
            <button
              type="submit"
              form="name-form"
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
