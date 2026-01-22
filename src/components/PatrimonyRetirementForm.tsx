import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';
import { formatCurrencyInput, handleCurrencyInput } from '../utils/currency';

export default function PatrimonyRetirementForm({
  onContinue,
  onBack,
  canGoBack,
  formData,
  questionNumber,
}: FormStepProps) {
  const [retirementIncome, setRetirementIncome] = useState<number>(
    typeof formData?.retirementIncome === 'number' ? formData.retirementIncome : 0
  );
  const [displayRetirement, setDisplayRetirement] = useState(
    retirementIncome > 0 ? formatCurrencyInput(retirementIncome) : ''
  );
  const [retirementAge, setRetirementAge] = useState(formData?.retirementAge || '');

  // NOVOS CAMPOS – Seguro de vida
  const [hasLifeInsurance, setHasLifeInsurance] = useState(formData?.hasLifeInsurance || '');
  const [lifeInsuranceCompany, setLifeInsuranceCompany] = useState(formData?.lifeInsuranceCompany || '');
  const [lifeInsurancePremium, setLifeInsurancePremium] = useState<number>(
    typeof formData?.lifeInsurancePremium === 'number' ? formData.lifeInsurancePremium : 0
  );
  const [displayLifeInsurancePremium, setDisplayLifeInsurancePremium] = useState(
    lifeInsurancePremium > 0 ? formatCurrencyInput(lifeInsurancePremium) : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (retirementIncome > 0 && retirementAge && hasLifeInsurance) {
      onContinue({
        retirementIncome,
        retirementAge,
        hasLifeInsurance,
        lifeInsuranceCompany: hasLifeInsurance === 'Sim' ? lifeInsuranceCompany : '',
        lifeInsurancePremium:
          hasLifeInsurance === 'Sim' ? lifeInsurancePremium : 0,
      });
    }
  };

  const isValid =
    retirementIncome > 0 &&
    !!retirementAge &&
    !!hasLifeInsurance &&
    (hasLifeInsurance === 'Não' ||
      (lifeInsuranceCompany.trim() !== '' && lifeInsurancePremium > 0));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter px-6 py-8 pt-20">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="w-full max-w-2xl mx-auto">
        <QuestionNumber number={questionNumber} />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Seção 5 – Patrimônio e Investimentos
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Pensando no futuro, quanto precisaria receber por mês de aposentadoria para viver tranquilo(a)?
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={displayRetirement}
              onChange={(e) => {
                const newCents = handleCurrencyInput(e.target.value, retirementIncome);
                setRetirementIncome(newCents);
                setDisplayRetirement(formatCurrencyInput(newCents));
              }}
              placeholder="Ex: R$ 5.000,00"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Com quantos anos pretende se aposentar?
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              placeholder="Ex: 65"
              min="1"
              max="120"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          {/* NOVA PERGUNTA – Seguro de vida */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Possui seguro de vida?
            </label>
            <div className="flex gap-4">
              {['Não', 'Sim'].map((opt) => (
                <label
                  key={opt}
                  className={`flex-1 text-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    hasLifeInsurance === opt
                      ? 'border-accent bg-slate-900/10'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="hasLifeInsurance"
                    value={opt}
                    checked={hasLifeInsurance === opt}
                    onChange={(e) => {
                      setHasLifeInsurance(e.target.value);
                      if (e.target.value === 'Não') {
                        setLifeInsuranceCompany('');
                        setLifeInsurancePremium(0);
                        setDisplayLifeInsurancePremium('');
                      }
                    }}
                    className="hidden"
                  />
                  <span className="text-gray-900">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {hasLifeInsurance === 'Sim' && (
            <>
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-3">
                  Qual empresa?
                </label>
                <input
                  type="text"
                  value={lifeInsuranceCompany}
                  onChange={(e) => setLifeInsuranceCompany(e.target.value)}
                  placeholder="Ex: Porto Seguro, Bradesco, Prudential..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-900 mb-3">
                  Qual valor do prêmio mensal (R$)?
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={displayLifeInsurancePremium}
                  onChange={(e) => {
                    const newCents = handleCurrencyInput(e.target.value, lifeInsurancePremium);
                    setLifeInsurancePremium(newCents);
                    setDisplayLifeInsurancePremium(formatCurrencyInput(newCents));
                  }}
                  placeholder="R$ 0,00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </>
          )}

          <div className="pb-16">
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full max-w-[576px] mx-auto text-white py-3 px-6 rounded-full font-medium transition-colors ${
                isValid
                  ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  : 'bg-black cursor-not-allowed'
              }`}
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
