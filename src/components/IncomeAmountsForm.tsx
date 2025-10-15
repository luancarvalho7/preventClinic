import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import { formatCurrency, parseCurrency } from '../utils/currency';

export default function IncomeAmountsForm({ onContinue, formData }: FormStepProps) {
  const [grossIncome, setGrossIncome] = useState(formData?.grossIncome || '');
  const [netIncome, setNetIncome] = useState(formData?.netIncome || '');
  const [displayGrossIncome, setDisplayGrossIncome] = useState(grossIncome ? formatCurrency(grossIncome) : '');
  const [displayNetIncome, setDisplayNetIncome] = useState(netIncome ? formatCurrency(netIncome) : '');

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
            <input
              type="text"
              value={displayGrossIncome}
              onChange={(e) => {
                const rawValue = parseCurrency(e.target.value);
                setGrossIncome(rawValue);
                setDisplayGrossIncome(formatCurrency(rawValue));
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="R$ 0,00"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Renda total líquida (após descontos)
            </label>
            <input
              type="text"
              value={displayNetIncome}
              onChange={(e) => {
                const rawValue = parseCurrency(e.target.value);
                setNetIncome(rawValue);
                setDisplayNetIncome(formatCurrency(rawValue));
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="R$ 0,00"
              required
            />
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
