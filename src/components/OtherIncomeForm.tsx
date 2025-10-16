import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';

export default function OtherIncomeForm({ onContinue, formData, questionNumber }: FormStepProps) {
  const [otherIncome, setOtherIncome] = useState(formData?.otherIncome || '');

  const options = [
    'Sim, recebo pensão ou ajuda financeira regular',
    'Sim, recebo bolsas, benefícios ou auxílios (ex: bolsa de estudo, auxílio governamental)',
    'Sim, recebo mesada ou apoio familiar eventual',
    'Não possuo outra fonte de renda',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otherIncome) {
      onContinue({ otherIncome });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
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
                      ? 'border-accent bg-accent/10'
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

          <button
            type="submit"
            disabled={!otherIncome}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
