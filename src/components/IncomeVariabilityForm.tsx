import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

export default function IncomeVariabilityForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [incomeVariability, setIncomeVariability] = useState(formData?.incomeVariability || '');
  const [incomeVariabilityDetails, setIncomeVariabilityDetails] = useState(formData?.incomeVariabilityDetails || '');

  const options = [
    'Não',
    'Sim, varia pouco',
    'Sim, varia muito'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (incomeVariability === 'Não') {
      onContinue({ incomeVariability, incomeVariabilityDetails: '' });
    } else if (incomeVariability && incomeVariabilityDetails) {
      onContinue({ incomeVariability, incomeVariabilityDetails });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Sua renda costuma variar?
            </label>
            <div className="space-y-3">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="incomeVariability"
                    value={option}
                    checked={incomeVariability === option}
                    onChange={(e) => setIncomeVariability(e.target.value)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="ml-3 text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {incomeVariability !== 'Não' && incomeVariability && (
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-3">
                Explique o motivo e a média dessa variação
              </label>
              <textarea
                value={incomeVariabilityDetails}
                onChange={(e) => setIncomeVariabilityDetails(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                rows={4}
                placeholder="Ex: Trabalho com comissões que variam entre R$ 2.000 e R$ 5.000"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={!incomeVariability || (incomeVariability !== 'Não' && !incomeVariabilityDetails)}
            className="w-full bg-slate-900 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
