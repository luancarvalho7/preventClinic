import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';
import { formatCurrencyInput, parseCurrency } from '../utils/currency';

export default function OtherIncomeForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [otherIncome, setOtherIncome] = useState(formData?.otherIncome || '');
  const [otherIncomeValue, setOtherIncomeValue] = useState(formData?.otherIncomeValue || '');
  const [displayValue, setDisplayValue] = useState(
    formData?.otherIncomeValue ? formatCurrencyInput(formData.otherIncomeValue) : ''
  );

  const options = [
    'Sim, recebo pensão ou ajuda financeira regular',
    'Sim, recebo bolsas, benefícios ou auxílios (ex: bolsa de estudo, auxílio governamental)',
    'Sim, recebo mesada ou apoio familiar eventual',
    'Não possuo outra fonte de renda',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasOtherIncome = otherIncome.startsWith('Sim');

    if (otherIncome === 'Não possuo outra fonte de renda') {
      onContinue({ otherIncome, otherIncomeValue: '' });
      return;
    }

    if (hasOtherIncome && otherIncomeValue.trim() !== '') {
      onContinue({ otherIncome, otherIncomeValue: otherIncomeValue.trim() });
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
              Você possui algum outro tipo de renda complementar?<br />
              <span className="text-gray-600 text-base">
                (ex: pensão, mesada, ajuda familiar, bolsas, benefícios, etc.)
              </span>
            </label>

            <div className="space-y-3">
              {options.map((option) => (
                <label
                  key={option}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    otherIncome === option
                      ? 'border-accent bg-slate-900/10'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="otherIncome"
                    value={option}
                    checked={otherIncome === option}
                    onChange={(e) => setOtherIncome(e.target.value)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="ml-3 text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {otherIncome.startsWith('Sim') && (
            <div className="mt-4">
              <label className="block text-lg font-medium text-gray-900 mb-2">
                Valor total aproximado mensal da renda complementar:
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={displayValue}
                onChange={(e) => {
                  const formatted = formatCurrencyInput(e.target.value);
                  setDisplayValue(formatted);
                  setOtherIncomeValue(String(parseCurrency(e.target.value)));
                }}
                placeholder="R$ 0,00"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={
              !otherIncome ||
              (otherIncome.startsWith('Sim') && otherIncomeValue.trim() === '')
            }
            className="w-full bg-slate-900 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
