import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import { formatCurrency, parseCurrency } from '../utils/currency';

export default function MonthlyExpensesForm({ onContinue, formData }: FormStepProps) {
  const [monthlyExpenses, setMonthlyExpenses] = useState(formData?.monthlyExpenses || '');
  const [displayExpenses, setDisplayExpenses] = useState(monthlyExpenses ? formatCurrency(monthlyExpenses) : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (monthlyExpenses) {
      onContinue({ monthlyExpenses });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Quanto gasta em média por mês (total)?
            </label>
            <input
              type="text"
              value={displayExpenses}
              onChange={(e) => {
                const rawValue = parseCurrency(e.target.value);
                setMonthlyExpenses(rawValue);
                setDisplayExpenses(formatCurrency(rawValue));
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="R$ 0,00"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!monthlyExpenses}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
