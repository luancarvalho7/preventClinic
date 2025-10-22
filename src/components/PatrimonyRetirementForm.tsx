import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';
import { formatCurrencyInput, parseCurrency } from '../utils/currency';

export default function PatrimonyRetirementForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [retirementIncome, setRetirementIncome] = useState(formData?.retirementIncome || '');
  const [displayRetirement, setDisplayRetirement] = useState(
    formData?.retirementIncome ? formatCurrencyInput(formData.retirementIncome) : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (retirementIncome) {
      onContinue({ retirementIncome });
    }
  };

  const isValid = !!retirementIncome;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Seção 5 – Patrimônio e Investimentos
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Pensando no futuro, quanto precisaria receber por mês de aposentadoria para viver tranquilo(a)?
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={displayRetirement}
              onChange={(e) => {
                const formatted = formatCurrencyInput(e.target.value);
                setDisplayRetirement(formatted);
                setRetirementIncome(String(parseCurrency(e.target.value)));
              }}
              placeholder="Ex: R$ 5.000,00"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-slate-900 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
