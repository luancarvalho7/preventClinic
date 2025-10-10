import React, { useState } from 'react';
import { FormStepProps } from '../types/form';

export default function IncomeAmountsForm({ onContinue, formData }: FormStepProps) {
  const [grossIncome, setGrossIncome] = useState(formData?.grossIncome || '');
  const [netIncome, setNetIncome] = useState(formData?.netIncome || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (grossIncome && netIncome) {
      onContinue({ grossIncome, netIncome });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Renda total bruta (média mensal)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-500">R$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={grossIncome}
                onChange={(e) => setGrossIncome(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="0,00"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Renda total líquida (após descontos)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-500">R$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={netIncome}
                onChange={(e) => setNetIncome(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="0,00"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!grossIncome || !netIncome}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
