import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

export default function SurplusActionForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [surplusAction, setSurplusAction] = useState(formData?.surplusAction || '');

  const options = [
    'Deixo parado na conta corrente',
    'Guardo na poupança',
    'Invisto (renda fixa, fundos, ações, cripto etc.)',
    'Gasto depois (em lazer, compras, imprevistos etc.)',
    'Guardo em espécie (dinheiro físico)',
    'Outro'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (surplusAction) {
      onContinue({ surplusAction });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter px-6 py-8 pt-20">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="w-full max-w-2xl mx-auto">
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

          <div className="pb-16">
            <button
              type="submit"
              disabled={!surplusAction}
              className={`w-full max-w-[576px] mx-auto text-white py-3 px-6 rounded-full font-medium transition-colors ${
                surplusAction
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
