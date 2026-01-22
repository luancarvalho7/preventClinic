import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

export default function BirthDateForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [birthDate, setBirthDate] = useState(formData?.birthDate || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthDate) {
      onContinue({ birthDate });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter px-6 py-8">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="w-full max-w-2xl mx-auto">
        <QuestionNumber number={questionNumber} />
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-funnel font-bold text-slate-900 mb-2">
            Seção 1 – Perfil e Contexto
          </h1>
          <p className="text-gray-600">
            Aqui queremos entender um pouco mais sobre quem você é e o seu momento atual de vida. Isso ajuda a adaptar o plano à sua realidade.
          </p>
        </div>

        <form id="birth-date-form" onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Data de nascimento
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>
        </form>
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-16 bg-gradient-to-t from-slate-50 to-transparent">
        <div className="w-full max-w-[576px] mx-auto">
          <button
            form="birth-date-form"
            type="submit"
            disabled={!birthDate}
            className={`w-full py-4 text-white rounded-full transition-colors duration-200 font-medium text-lg shadow-md ${
              birthDate
                ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg cursor-pointer'
                : 'bg-black cursor-not-allowed'
            }`}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
