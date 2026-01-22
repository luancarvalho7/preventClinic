import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

export default function DependentsForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [hasDependents, setHasDependents] = useState(formData?.hasDependents || '');
  const [dependentsCount, setDependentsCount] = useState(formData?.dependentsCount || '');

  const countOptions = ['1', '2', '3', '4', '5 ou mais'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Normaliza dependentsCount pra garantir persistência consistente
    const finalData = {
      hasDependents,
      dependentsCount: hasDependents === 'sim' ? dependentsCount || '' : '0',
    };

    if (
      (hasDependents === 'sim' && dependentsCount) ||
      hasDependents === 'não'
    ) {
      onContinue(finalData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter px-6 py-8">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="w-full max-w-2xl mx-auto">
        <QuestionNumber number={questionNumber} />
        <form id="dependents-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Pergunta principal */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Você tem dependentes financeiros? (filhos ou familiares)
            </label>
            <div className="flex gap-4">
              {['sim', 'não'].map((option) => (
                <label
                  key={option}
                  className={`flex-1 text-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    hasDependents === option
                      ? 'border-accent bg-slate-900/10'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="hasDependents"
                    value={option}
                    checked={hasDependents === option}
                    onChange={(e) => {
                      const value = e.target.value;
                      setHasDependents(value);
                      // Só limpa dependentsCount se escolher "não"
                      if (value === 'não') setDependentsCount('');
                    }}
                    className="hidden"
                  />
                  <span className="capitalize text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Se tiver dependentes, mostra a quantidade */}
          {hasDependents === 'sim' && (
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                Quantos dependentes?
              </label>
              <div className="space-y-3">
                {countOptions.map((option) => (
                  <label
                    key={option}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      dependentsCount === option
                        ? 'border-accent bg-slate-900/10'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="dependentsCount"
                      value={option}
                      checked={dependentsCount === option}
                      onChange={(e) => setDependentsCount(e.target.value)}
                      className="w-4 h-4 text-accent focus:ring-accent"
                    />
                    <span className="ml-3 text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

        </form>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-50 to-transparent">
        <div className="w-full max-w-2xl mx-auto">
          <button
            form="dependents-form"
            type="submit"
            disabled={
              !hasDependents || (hasDependents === 'sim' && !dependentsCount)
            }
            className="w-full py-4 bg-primary text-white rounded-full hover:bg-blue-600 transition-colors duration-200 font-medium text-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
