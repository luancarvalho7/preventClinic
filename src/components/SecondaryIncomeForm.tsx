import React, { useState } from 'react';
import { FormStepProps } from '../types/form';

export default function SecondaryIncomeForm({ onContinue, formData }: FormStepProps) {
  const [hasSecondaryIncome, setHasSecondaryIncome] = useState(formData?.hasSecondaryIncome || '');
  const [secondaryIncomeSource, setSecondaryIncomeSource] = useState(formData?.secondaryIncomeSource || '');
  const [secondaryWorkRegime, setSecondaryWorkRegime] = useState(formData?.secondaryWorkRegime || '');

  const regimeOptions = ['CLT', 'PJ', 'Autônomo', 'Outros'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasSecondaryIncome === 'Não') {
      onContinue({ hasSecondaryIncome });
    } else if (hasSecondaryIncome === 'Sim' && secondaryIncomeSource && secondaryWorkRegime) {
      onContinue({ hasSecondaryIncome, secondaryIncomeSource, secondaryWorkRegime });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Possui outra fonte de renda?
            </label>
            <div className="space-y-3">
              {['Não', 'Sim'].map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="hasSecondaryIncome"
                    value={option}
                    checked={hasSecondaryIncome === option}
                    onChange={(e) => setHasSecondaryIncome(e.target.value)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="ml-3 text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {hasSecondaryIncome === 'Sim' && (
            <>
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-3">
                  Fonte de renda secundária
                </label>
                <input
                  type="text"
                  value={secondaryIncomeSource}
                  onChange={(e) => setSecondaryIncomeSource(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Ex: Freelance, aluguel..."
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Regime de trabalho (secundário)
                </label>
                <div className="space-y-3">
                  {regimeOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="secondaryWorkRegime"
                        value={option}
                        checked={secondaryWorkRegime === option}
                        onChange={(e) => setSecondaryWorkRegime(e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="ml-3 text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={!hasSecondaryIncome || (hasSecondaryIncome === 'Sim' && (!secondaryIncomeSource || !secondaryWorkRegime))}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
