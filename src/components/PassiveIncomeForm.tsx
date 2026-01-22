import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';
import { formatCurrencyInput, handleCurrencyInput } from '../utils/currency';

export default function PassiveIncomeForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [hasPassiveIncome, setHasPassiveIncome] = useState(formData?.hasPassiveIncome || '');
  const [selectedSources, setSelectedSources] = useState<string[]>(formData?.passiveIncomeSources || []);
  const [passiveIncomeValue, setPassiveIncomeValue] = useState<number>(
    typeof formData?.passiveIncomeValue === 'number' ? formData.passiveIncomeValue : 0
  );
  const [displayValue, setDisplayValue] = useState(
    passiveIncomeValue > 0 ? formatCurrencyInput(passiveIncomeValue) : ''
  );

  const incomeOptions = [
    'Aluguéis de imóveis',
    'Investimentos financeiros (renda fixa, dividendos, fundos imobiliários etc.)',
    'Royalties de livros, marcas, patentes ou franquias',
    'Negócio automatizado / online que gera receita recorrente',
    'Participação societária (lucros de empresa em que não atua diretamente)',
    'Outras',
  ];

  const handleCheckboxChange = (option: string) => {
    setSelectedSources((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (hasPassiveIncome === 'Não') {
      onContinue({
        hasPassiveIncome,
        passiveIncomeSources: [],
        passiveIncomeValue: 0,
      });
      return;
    }

    if (hasPassiveIncome === 'Sim' && selectedSources.length > 0 && passiveIncomeValue > 0) {
      const dataToSend = {
        hasPassiveIncome,
        passiveIncomeSources: selectedSources,
        passiveIncomeValue,
      };
      onContinue(dataToSend);
    }
  };

  const isValid =
    hasPassiveIncome === 'Não' ||
    (hasPassiveIncome === 'Sim' &&
      selectedSources.length > 0 &&
      passiveIncomeValue > 0);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pergunta principal */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Você possui renda passiva (aluguéis, investimentos, royalties etc.)?
            </label>
            <div className="flex gap-4">
              {['Não', 'Sim'].map((option) => (
                <label
                  key={option}
                  className={`flex-1 text-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    hasPassiveIncome === option
                      ? 'border-accent bg-slate-900/10'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="hasPassiveIncome"
                    value={option}
                    checked={hasPassiveIncome === option}
                    onChange={(e) => {
                      setHasPassiveIncome(e.target.value);
                      if (e.target.value === 'Não') {
                        setSelectedSources([]);
                        setPassiveIncomeValue(0);
                        setDisplayValue('');
                      }
                    }}
                    className="hidden"
                  />
                  <span className="capitalize text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Opções se "Sim" */}
          {hasPassiveIncome === 'Sim' && (
            <div className="space-y-4">
              <label className="block text-lg font-medium text-gray-900 mb-4">
                Se sim, quais?
              </label>
              <div className="space-y-3">
                {incomeOptions.map((option) => (
                  <label
                    key={option}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedSources.includes(option)
                        ? 'border-accent bg-slate-900/10'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedSources.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                      className="w-4 h-4 text-accent focus:ring-accent"
                    />
                    <span className="ml-3 text-gray-900">{option}</span>
                  </label>
                ))}
              </div>

              {/* Campo de valor formatado */}
              {selectedSources.length > 0 && (
                <div className="mt-4">
                  <label className="block text-lg font-medium text-gray-900 mb-2">
                    Valor total aproximado mensal da renda complementar:
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={displayValue}
                    onChange={(e) => {
                      const newCents = handleCurrencyInput(e.target.value, passiveIncomeValue);
                      setPassiveIncomeValue(newCents);
                      setDisplayValue(formatCurrencyInput(newCents));
                    }}
                    placeholder="R$ 0,00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
              )}
            </div>
          )}

          {/* Botão de continuar */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full text-white py-3 px-6 rounded-lg font-medium transition-colors ${
              isValid
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
