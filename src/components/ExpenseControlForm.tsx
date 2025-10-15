import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';

export default function ExpenseControlForm({ onContinue, formData, questionNumber }: FormStepProps) {
  const [hasExpenseControl, setHasExpenseControl] = useState(formData?.hasExpenseControl || '');

  const options = [
    'Planilha',
    'Aplicativo',
    'Caderno',
    'Mental',
    'Nenhum'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasExpenseControl) {
      onContinue({ hasExpenseControl });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Seção 3 – Gastos
          </h2>
          <p className="text-gray-600">
            Aqui o foco é entender o seu fluxo de gastos e como você lida com sobras ou apertos no fim do mês.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Você possui algum tipo de controle de gastos?
            </label>
            <div className="space-y-3">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="hasExpenseControl"
                    value={option}
                    checked={hasExpenseControl === option}
                    onChange={(e) => setHasExpenseControl(e.target.value)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="ml-3 text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!hasExpenseControl}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
