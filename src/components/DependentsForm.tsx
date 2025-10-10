import React, { useState } from 'react';
import { FormStepProps } from '../types/form';

export default function DependentsForm({ onContinue, formData }: FormStepProps) {
  const [hasDependents, setHasDependents] = useState(formData?.hasDependents || '');
  const [dependentsCount, setDependentsCount] = useState(formData?.dependentsCount || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasDependents === 'Não') {
      onContinue({ hasDependents, dependentsCount: '0' });
    } else if (hasDependents === 'Sim' && dependentsCount) {
      onContinue({ hasDependents, dependentsCount });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Você tem dependentes financeiros? (filhos ou familiares)
            </label>
            <div className="space-y-3">
              {['Não', 'Sim'].map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="hasDependents"
                    value={option}
                    checked={hasDependents === option}
                    onChange={(e) => setHasDependents(e.target.value)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="ml-3 text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {hasDependents === 'Sim' && (
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-3">
                Quantos dependentes?
              </label>
              <input
                type="number"
                min="1"
                value={dependentsCount}
                onChange={(e) => setDependentsCount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Digite o número de dependentes"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={!hasDependents || (hasDependents === 'Sim' && !dependentsCount)}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
