import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';

export default function SurplusActionForm({ onContinue, formData, questionNumber }: FormStepProps) {
  const [surplusAction, setSurplusAction] = useState(formData?.surplusAction || '');

  const options = [
    'Deixo na conta',
    'Gasto depois',
    'Invisto',
    'Guardo em espécie',
    'Outro'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (surplusAction) {
      onContinue({ surplusAction });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Quando sobra dinheiro, o que você faz com ele?
            </label>
            <div className="space-y-3">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="surplusAction"
                    value={option}
                    checked={surplusAction === option}
                    onChange={(e) => setSurplusAction(e.target.value)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="ml-3 text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!surplusAction}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
