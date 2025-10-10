import React, { useState } from 'react';
import { FormStepProps } from '../types/form';

export default function MainIncomeForm({ onContinue, formData }: FormStepProps) {
  const [mainIncomeSource, setMainIncomeSource] = useState(formData?.mainIncomeSource || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mainIncomeSource) {
      onContinue({ mainIncomeSource });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Seção 2 – Renda
          </h2>
          <p className="text-gray-600">
            Vamos mapear suas fontes de renda — principais e adicionais — para compreender seu potencial de poupança e investimento.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Fonte de renda principal
            </label>
            <input
              type="text"
              value={mainIncomeSource}
              onChange={(e) => setMainIncomeSource(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Ex: Salário, honorários, vendas..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={!mainIncomeSource}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
