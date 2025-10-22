import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import { formatCurrencyInput, parseCurrency } from '../utils/currency';

export default function SecondaryIncomeForm({ onContinue, formData, questionNumber }: FormStepProps) {
  const [hasSecondaryIncome, setHasSecondaryIncome] = useState(formData?.hasSecondaryIncome || '');
  const [selectedSources, setSelectedSources] = useState<string[]>(formData?.secondaryIncomeSources || []);
  const [otherSegundaryIncomeSource, setotherSegundaryIncomeSource] = useState(formData?.otherSegundaryIncomeSource || '');
  const [secondaryIncomeValue, setSecondaryIncomeValue] = useState(formData?.secondaryIncomeValue || '');
  const [displayValue, setDisplayValue] = useState(formData?.secondaryIncomeValue ? formatCurrencyInput(formData.secondaryIncomeValue) : '');


  const incomeOptions = [
    'Salário fixo (CLT)',
    'Pró-labore / honorários de empresa própria',
    'Prestação de serviços autônomos',
    'Comissões por vendas / resultados',
    'Freelance / trabalhos eventuais',
    'Aposentadoria / pensão',
    'Outros',
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

    if (hasSecondaryIncome === 'Não') {
      onContinue({
        hasSecondaryIncome,
        secondaryIncomeSources: [],
        otherSegundaryIncomeSource: '',
        secondaryIncomeValue: '',
      });
      return;
    }

    if (
      hasSecondaryIncome === 'Sim' &&
      selectedSources.length > 0 &&
      (!selectedSources.includes('Outros') || otherSegundaryIncomeSource.trim() !== '') &&
      secondaryIncomeValue.trim() !== ''
    ) {
      const dataToSend = {
        hasSecondaryIncome,
        secondaryIncomeSources: selectedSources,
        otherSegundaryIncomeSource: selectedSources.includes('Outros')
          ? otherSegundaryIncomeSource.trim()
          : '',
        secondaryIncomeValue: secondaryIncomeValue.trim(),
      };
      onContinue(dataToSend);
    }
  };

  const isValid =
    hasSecondaryIncome === 'Não' ||
    (hasSecondaryIncome === 'Sim' &&
      selectedSources.length > 0 &&
      secondaryIncomeValue.trim() !== '' &&
      (!selectedSources.includes('Outros') || otherSegundaryIncomeSource.trim() !== ''));

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pergunta principal */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Possui outra fonte de renda ativa?
            </label>
            <div className="flex gap-4">
              {['Não', 'Sim'].map((option) => (
                <label
                  key={option}
                  className={`flex-1 text-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    hasSecondaryIncome === option
                      ? 'border-accent bg-slate-900/10'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="hasSecondaryIncome"
                    value={option}
                    checked={hasSecondaryIncome === option}
                    onChange={(e) => {
                      setHasSecondaryIncome(e.target.value);
                      if (e.target.value === 'Não') {
                        setSelectedSources([]);
                        setotherSegundaryIncomeSource('');
                        setSecondaryIncomeValue('');
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
          {hasSecondaryIncome === 'Sim' && (
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

              {/* Campo "Outros" condicional */}
              {selectedSources.includes('Outros') && (
                <div className="mt-4">
                  <label className="block text-lg font-medium text-gray-900 mb-2">
                    Especifique:
                  </label>
                  <input
                    type="text"
                    value={otherSegundaryIncomeSource}
                    onChange={(e) => setotherSegundaryIncomeSource(e.target.value)}
                    placeholder="Descreva sua outra fonte de renda"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
              )}

              {/* Campo de valor */}
              <div className="mt-4">
  <label className="block text-lg font-medium text-gray-900 mb-2">
    Valor mensal aproximado dessa renda
  </label>
  <input
    type="text"
    inputMode="numeric"
    value={displayValue}
    onChange={(e) => {
      const formatted = formatCurrencyInput(e.target.value);
      setDisplayValue(formatted);
      setSecondaryIncomeValue(String(parseCurrency(e.target.value)));
    }}
    placeholder="Ex: R$ 1.500,00"
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
  />
</div>

            </div>
          )}

          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-slate-900 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
