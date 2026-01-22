import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';
import { formatCurrencyInput, handleCurrencyInput } from '../utils/currency';

export default function MonthlyExpensesForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(
    typeof formData?.monthlyExpenses === 'number' ? formData.monthlyExpenses : 0
  );
  const [displayExpenses, setDisplayExpenses] = useState(
    monthlyExpenses > 0 ? formatCurrencyInput(monthlyExpenses) : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (monthlyExpenses > 0) {
      onContinue({ monthlyExpenses });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Quanto gasta em média por mês (total)?
            </label>
            <input
              type="text"
              value={displayExpenses}
              onChange={(e) => {
                const newCents = handleCurrencyInput(e.target.value, monthlyExpenses);
                setMonthlyExpenses(newCents);
                setDisplayExpenses(formatCurrencyInput(newCents));
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="R$ 0,00"
              required
            />
          </div>

          <button
            type="submit"
            disabled={monthlyExpenses === 0}
            className={`w-full text-white py-3 px-6 rounded-lg font-medium transition-colors ${
              monthlyExpenses > 0
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                : 'bg-black cursor-not-allowed'
            }`}
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
