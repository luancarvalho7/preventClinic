import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';

export default function DependentsForm({ onContinue, formData, questionNumber }: FormStepProps) {
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
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <form onSubmit={handleSubmit} className="space-y-6">
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
                      ? 'border-accent bg-accent/10'
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
                        ? 'border-accent bg-accent/10'
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

          {/* Botão continuar */}
          <button
            type="submit"
            disabled={
              !hasDependents || (hasDependents === 'sim' && !dependentsCount)
            }
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
