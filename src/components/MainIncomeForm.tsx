import React, { useEffect, useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';

export default function MainIncomeForm({ onContinue, formData, questionNumber }: FormStepProps) {
  const [mainIncomeSource, setMainIncomeSource] = useState(formData?.mainIncomeSource || '');
  const [mainIncomeSourceOther, setMainIncomeSourceOther] = useState(formData?.mainIncomeSourceOther || '');

  // Guarde o valor em CENTAVOS (number). Nunca use float.
  const initialCents =
    typeof formData?.mainIncomeAmount === 'number'
      ? formData.mainIncomeAmount
      : Number(String(formData?.mainIncomeAmount || '0').replace(/\D/g, ''));

  const [mainIncomeAmount, setMainIncomeAmount] = useState<number>(initialCents);
  const [displayAmount, setDisplayAmount] = useState<string>('');

  // Helpers locais (jogue fora suas utils bugadas)
  const toCents = (s: string) => {
    const digits = s.replace(/\D/g, '');
    return digits ? Number(digits) : 0;
  };
  const formatBRL = (cents: number) =>
    (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  useEffect(() => {
    setDisplayAmount(formatBRL(mainIncomeAmount));
  }, [mainIncomeAmount]);

  const incomeOptions = [
    'Salário fixo (CLT)',
    'Pró-labore / honorários de empresa própria',
    'Prestação de serviços autônomos',
    'Comissões por vendas / resultados',
    'Freelance / trabalhos eventuais',
    'Dividendos / lucros de investimentos',
    'Aluguel de imóveis',
    'Aposentadoria / pensão',
    'Outros',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mainIncomeSource && mainIncomeAmount > 0 && (mainIncomeSource !== 'Outros' || mainIncomeSourceOther)) {
      onContinue({
        mainIncomeSource,
        mainIncomeSourceOther: mainIncomeSource === 'Outros' ? mainIncomeSourceOther : '',
        // Passe em centavos (número). Se seu backend espera string, serialize aqui.
        mainIncomeAmount,
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Seção 2 – Renda</h2>
          <p className="text-gray-600">
            Vamos mapear suas fontes de renda — principais e adicionais — para compreender seu potencial de poupança e investimento.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">Fonte de renda principal</label>
            <div className="space-y-3">
              {incomeOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="mainIncomeSource"
                    value={option}
                    checked={mainIncomeSource === option}
                    onChange={(e) => setMainIncomeSource(e.target.value)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="ml-3 text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {mainIncomeSource === 'Outros' && (
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-3">Especifique sua fonte de renda:</label>
              <input
                type="text"
                value={mainIncomeSourceOther}
                onChange={(e) => setMainIncomeSourceOther(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Digite aqui..."
                required
              />
            </div>
          )}

          {mainIncomeSource && (
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-3">Valor da renda principal (mensal):</label>
              <input
                type="text"
                inputMode="numeric"
                value={displayAmount}
                onChange={(e) => {
                  const cents = toCents(e.target.value);
                  setMainIncomeAmount(cents);
                  // formatBRL será refletido pelo useEffect; manter responsivo enquanto digita:
                  setDisplayAmount(formatBRL(cents));
                }}
                onBlur={() => setDisplayAmount(formatBRL(mainIncomeAmount))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="R$ 0,00"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={!mainIncomeSource || mainIncomeAmount <= 0 || (mainIncomeSource === 'Outros' && !mainIncomeSourceOther)}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
