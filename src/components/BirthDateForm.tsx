import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';

export default function BirthDateForm({ onContinue, formData, questionNumber }: FormStepProps) {
  const [birthDate, setBirthDate] = useState(formData?.birthDate || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthDate) {
      onContinue({ birthDate });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Seção 1 – Perfil e Contexto
          </h2>
          <p className="text-gray-600">
            Aqui queremos entender um pouco mais sobre quem você é e o seu momento atual de vida. Isso ajuda a adaptar o plano à sua realidade.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <button
            type="submit"
            disabled={!birthDate}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
