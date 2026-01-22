import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

export default function DeficitActionForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [deficitAction, setDeficitAction] = useState(formData?.deficitAction || '');

  const options = [
    'Uso cartão de crédito',
    'Empréstimo',
    'Cheque especial',
    'Peço ajuda',
    'Reduzo gastos',
    'Outro'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deficitAction) {
      onContinue({ deficitAction });
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
              E quando falta dinheiro, como costuma resolver?
            </label>
            <div className="space-y-3">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="deficitAction"
                    value={option}
                    checked={deficitAction === option}
                    onChange={(e) => setDeficitAction(e.target.value)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="ml-3 text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pb-16">
            <button
              type="submit"
              disabled={!deficitAction}
              className={`w-full max-w-[576px] mx-auto text-white py-3 px-6 rounded-full font-medium transition-colors ${
                deficitAction
                  ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  : 'bg-black cursor-not-allowed'
              }`}
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
