import React, { useState } from 'react';
import { FormStepProps } from '../types/form';

export default function DebtsForm({ onContinue, formData }: FormStepProps) {
  const [hasDebts, setHasDebts] = useState(formData?.hasDebts || '');
  const [debtTypes, setDebtTypes] = useState<string[]>(formData?.debtTypes || []);
  const [totalDebtAmount, setTotalDebtAmount] = useState(formData?.totalDebtAmount || '');
  const [averageInterestRate, setAverageInterestRate] = useState(formData?.averageInterestRate || '');
  const [hasOverdueDebts, setHasOverdueDebts] = useState(formData?.hasOverdueDebts || '');
  const [triedRenegotiation, setTriedRenegotiation] = useState(formData?.triedRenegotiation || '');

  const debtTypeOptions = [
    'Cartão de crédito',
    'Empréstimo pessoal',
    'Financiamento imobiliário',
    'Financiamento de veículo',
    'Cheque especial',
    'Outros'
  ];

  const renegotiationOptions = ['Sim', 'Não', 'Em andamento'];

  const handleDebtTypeToggle = (option: string) => {
    setDebtTypes(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasDebts === 'Não') {
      onContinue({ hasDebts });
    } else if (hasDebts === 'Sim' && debtTypes.length > 0 && totalDebtAmount && hasOverdueDebts && triedRenegotiation) {
      onContinue({
        hasDebts,
        debtTypes,
        totalDebtAmount,
        averageInterestRate: averageInterestRate || 'Não sei',
        hasOverdueDebts,
        triedRenegotiation
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Seção 4 – Dívidas e Compromissos Financeiros
          </h2>
          <p className="text-gray-600">
            Essa parte ajuda a mapear compromissos e possíveis endividamentos — informação essencial para planejar sua recuperação financeira.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Você possui dívidas atualmente?
            </label>
            <div className="space-y-3">
              {['Não', 'Sim'].map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="hasDebts"
                    value={option}
                    checked={hasDebts === option}
                    onChange={(e) => setHasDebts(e.target.value)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="ml-3 text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {hasDebts === 'Sim' && (
            <>
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Quais tipos de dívidas possui?
                </label>
                <div className="space-y-3">
                  {debtTypeOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={debtTypes.includes(option)}
                        onChange={() => handleDebtTypeToggle(option)}
                        className="w-4 h-4 text-accent focus:ring-accent rounded"
                      />
                      <span className="ml-3 text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-900 mb-3">
                  Valor total aproximado das dívidas
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500">R$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={totalDebtAmount}
                    onChange={(e) => setTotalDebtAmount(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="0,00"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-900 mb-3">
                  Taxas de juros médias (se souber)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={averageInterestRate}
                    onChange={(e) => setAverageInterestRate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Ex: 3% ao mês"
                  />
                  <span className="absolute right-4 top-3 text-gray-400">%</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Opcional</p>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Há algum atraso ou pendência em aberto?
                </label>
                <div className="space-y-3">
                  {['Não', 'Sim'].map((option) => (
                    <label
                      key={option}
                      className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="hasOverdueDebts"
                        value={option}
                        checked={hasOverdueDebts === option}
                        onChange={(e) => setHasOverdueDebts(e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="ml-3 text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Já tentou renegociar ou consolidar suas dívidas?
                </label>
                <div className="space-y-3">
                  {renegotiationOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="triedRenegotiation"
                        value={option}
                        checked={triedRenegotiation === option}
                        onChange={(e) => setTriedRenegotiation(e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="ml-3 text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={!hasDebts || (hasDebts === 'Sim' && (debtTypes.length === 0 || !totalDebtAmount || !hasOverdueDebts || !triedRenegotiation))}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
