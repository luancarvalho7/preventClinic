import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';

export default function OtherIncomeForm({ onContinue, formData, questionNumber }: FormStepProps) {
  const [otherIncome, setOtherIncome] = useState(formData?.otherIncome || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue({ otherIncome: otherIncome || 'Nenhum' });
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Outro tipo de renda (pensão, mesada etc.)
            </label>
            <input
              type="text"
              value={otherIncome}
              onChange={(e) => setOtherIncome(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Digite se houver, ou deixe em branco"
            />
            <p className="mt-2 text-sm text-gray-500">Opcional</p>
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
