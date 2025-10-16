import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import { formatCurrencyInput, parseCurrency } from '../utils/currency';

export default function PatrimonyInvestmentsForm({ onContinue, formData, questionNumber }: FormStepProps) {
  const [alreadyInvests, setAlreadyInvests] = useState(formData?.alreadyInvests || '');
  const [investmentTypes, setInvestmentTypes] = useState<string[]>(formData?.investmentTypes || []);
  const [monthlyInvestment, setMonthlyInvestment] = useState(formData?.monthlyInvestment || '');
  const [displayInvestment, setDisplayInvestment] = useState(
    formData?.monthlyInvestment ? formatCurrencyInput(formData.monthlyInvestment) : ''
  );
  const [investmentGoal, setInvestmentGoal] = useState(formData?.investmentGoal || '');

  const investmentOptions = [
    'CDB / Renda Fixa',
    'Fundos de investimento',
    'Tesouro Direto',
    'Ações',
    'Fundos Imobiliários (FIIs)',
    'Previdência privada',
    'Criptomoedas',
    'Outros',
  ];

  const goalOptions = [
    'Aposentadoria / independência financeira',
    'Compra de imóvel',
    'Viagens e experiências',
    'Formação / educação própria ou dos filhos',
    'Aumentar patrimônio / renda passiva',
    'Outro',
  ];

  const handleCheckboxChange = (opt: string) => {
    setInvestmentTypes((prev) =>
      prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (alreadyInvests === 'Não') {
      onContinue({ alreadyInvests, investmentTypes: [], monthlyInvestment: '', investmentGoal: '' });
      return;
    }

    if (alreadyInvests === 'Sim' && investmentTypes.length > 0 && monthlyInvestment && investmentGoal) {
      onContinue({
        alreadyInvests,
        investmentTypes,
        monthlyInvestment,
        investmentGoal,
      });
    }
  };

  const isValid =
    alreadyInvests === 'Não' ||
    (alreadyInvests === 'Sim' && investmentTypes.length > 0 && monthlyInvestment && investmentGoal);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Seção 5 – Patrimônio e Investimentos
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 23. Você já investe? */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Você já investe?
            </label>
            <div className="flex gap-4">
              {['Não', 'Sim'].map((option) => (
                <label
                  key={option}
                  className={`flex-1 text-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    alreadyInvests === option
                      ? 'border-accent bg-accent/10'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="alreadyInvests"
                    value={option}
                    checked={alreadyInvests === option}
                    onChange={(e) => {
                      setAlreadyInvests(e.target.value);
                      if (e.target.value === 'Não') {
                        setInvestmentTypes([]);
                        setMonthlyInvestment('');
                        setInvestmentGoal('');
                        setDisplayInvestment('');
                      }
                    }}
                    className="hidden"
                  />
                  <span className="capitalize text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sub-seção se Sim */}
          {alreadyInvests === 'Sim' && (
            <>
              {/* Onde investe */}
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Onde investe atualmente?
                </label>
                <div className="space-y-3">
                  {investmentOptions.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        investmentTypes.includes(opt)
                          ? 'border-accent bg-accent/10'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={opt}
                        checked={investmentTypes.includes(opt)}
                        onChange={() => handleCheckboxChange(opt)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="ml-3 text-gray-900">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Valor médio mensal */}
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-3">
                  Valor médio investido mensalmente
                </label>
                <input
                  type="text"
                  value={displayInvestment}
                  onChange={(e) => {
                    const formatted = formatCurrencyInput(e.target.value);
                    setDisplayInvestment(formatted);
                    setMonthlyInvestment(String(parseCurrency(e.target.value)));
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Ex: R$ 500,00"
                />
              </div>

              {/* Objetivo */}
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Qual é o principal objetivo dos seus investimentos?
                </label>
                <div className="space-y-3">
                  {goalOptions.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        investmentGoal === opt
                          ? 'border-accent bg-accent/10'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="investmentGoal"
                        value={opt}
                        checked={investmentGoal === opt}
                        onChange={(e) => setInvestmentGoal(e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="ml-3 text-gray-900">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
