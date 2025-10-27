import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

// Nota: adicionamos novos campos no payload do onContinue (veja ao final)
export default function GoalsSection6Form({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  // EXISTENTES
  const [goals12Months, setGoals12Months] = useState<string>(formData?.goals12Months || '');
  const [goals5Years, setGoals5Years] = useState<string>(formData?.goals5Years || '');
  const [topPriority, setTopPriority] = useState<string>(formData?.topPriority || '');
  const [goalImpact, setGoalImpact] = useState<string>(formData?.goalImpact || '');
  const [changeCommitment, setChangeCommitment] = useState<string>(formData?.changeCommitment || '');

  // NOVOS CAMPOS – Objetivos selecionáveis (inclui “outros” com campo texto)
  type GoalOption = 'Reserva de emergência' | 'Compra de automóvel' | 'Outros';
  const [goalsSelection, setGoalsSelection] = useState<GoalOption[]>(formData?.goalsSelection || []);
  const [goalsOtherText, setGoalsOtherText] = useState<string>(formData?.goalsOtherText || '');

  // NOVOS CAMPOS – Hábito de investir (condicional para valor médio)
  type InvestsMonthly = 'Sim' | 'Não' | '';
  const [investsMonthly, setInvestsMonthly] = useState<InvestsMonthly>(formData?.investsMonthly || '');
  const [averageMonthlyInvestment, setAverageMonthlyInvestment] = useState<string>(
    formData?.averageMonthlyInvestment !== undefined && formData?.averageMonthlyInvestment !== null
      ? String(formData.averageMonthlyInvestment)
      : ''
  );

  const toggleGoal = (opt: GoalOption) => {
    setGoalsSelection((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };

  const canSubmit =
    // mantém obrigatoriedade das perguntas originais
    !!goals12Months &&
    !!goals5Years &&
    !!topPriority &&
    !!goalImpact &&
    !!changeCommitment &&
    // exige resposta para “Tem o hábito de investir mensalmente?”
    !!investsMonthly &&
    // se Sim, exige valor; se Não, libera sem valor
    (investsMonthly === 'Não' || averageMonthlyInvestment.trim() !== '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const avgValue = investsMonthly === 'Sim' && averageMonthlyInvestment.trim() !== ''
      ? Number(averageMonthlyInvestment)
      : undefined;

    onContinue({
      // campos existentes (inalterados)
      goals12Months,
      goals5Years,
      topPriority,
      goalImpact,
      changeCommitment,
      // novos campos adicionados
      goalsSelection,
      goalsOtherText: goalsSelection.includes('Outros') ? goalsOtherText : undefined,
      investsMonthly,
      averageMonthlyInvestment: avgValue,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Seção 6 – Objetivos e Prioridades
          </h2>
          <p className="text-gray-600">
            Aqui vamos alinhar o planejamento ao que realmente importa pra você — seus sonhos e metas financeiras.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NOVA ÁREA: Objetivos (checkbox) */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Selecione seus objetivos financeiros principais
            </label>
            <div className="space-y-3">
              {(['Reserva de emergência', 'Compra de automóvel', 'Outros'] as GoalOption[]).map((opt) => (
                <label key={opt} className="flex items-start p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 text-accent focus:ring-accent"
                    checked={goalsSelection.includes(opt)}
                    onChange={() => toggleGoal(opt)}
                  />
                  <span className="ml-3 text-gray-900">{opt}</span>
                </label>
              ))}
            </div>

            {goalsSelection.includes('Outros') && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descreva outros objetivos
                </label>
                <input
                  type="text"
                  value={goalsOtherText}
                  onChange={(e) => setGoalsOtherText(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Ex: viagem específica, curso, reforma, negócios, etc."
                />
              </div>
            )}
          </div>

          {/* CAMPOS ORIGINAIS mantidos */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Quais são seus principais objetivos financeiros para os próximos 12 meses?
            </label>
            <textarea
              value={goals12Months}
              onChange={(e) => setGoals12Months(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              rows={4}
              placeholder="Ex: Pagar dívidas, criar reserva de emergência, comprar um carro..."
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              E para os próximos 5 anos?
            </label>
            <textarea
              value={goals5Years}
              onChange={(e) => setGoals5Years(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              rows={4}
              placeholder="Ex: Comprar imóvel, trocar de carro, viajar para o exterior, aposentadoria..."
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Entre esses, qual é sua prioridade número 1 no momento?
            </label>
            <input
              type="text"
              value={topPriority}
              onChange={(e) => setTopPriority(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Seu objetivo mais importante"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Qual seria o impacto positivo em sua vida se atingisse esse objetivo?
            </label>
            <textarea
              value={goalImpact}
              onChange={(e) => setGoalImpact(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              rows={4}
              placeholder="Descreva como sua vida mudaria ao alcançar esse objetivo..."
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Você está disposto(a) a mudar hábitos para alcançá-lo?
            </label>
            <div className="space-y-3">
              {[
                '1 - Pouco disposto(a)',
                '2 - Levemente comprometido(a)',
                '3 - Moderadamente comprometido(a)',
                '4 - Muito comprometido(a)',
                '5 - Totalmente comprometido(a)',
              ].map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="changeCommitment"
                    value={option}
                    checked={changeCommitment === option}
                    onChange={(e) => setChangeCommitment(e.target.value)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="ml-3 text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* NOVA PERGUNTA: Hábito de investir + valor médio condicional */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Tem o hábito de investir mensalmente?
            </label>
            <div className="flex gap-4">
              {(['Sim', 'Não'] as InvestsMonthly[]).map((opt) => (
                <label key={opt} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="investsMonthly"
                    value={opt}
                    checked={investsMonthly === opt}
                    onChange={(e) => setInvestsMonthly(e.target.value as InvestsMonthly)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="ml-2 text-gray-900">{opt}</span>
                </label>
              ))}
            </div>

            {investsMonthly === 'Sim' && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor médio mensal (R$)
                </label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  inputMode="decimal"
                  value={averageMonthlyInvestment}
                  onChange={(e) => setAverageMonthlyInvestment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Ex: 300, 500, 1000"
                  // intencionalmente SEM required — pedido do cliente
                />
                <p className="text-xs text-gray-500 mt-1">Se não souber o valor exato, pode deixar em branco.</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full bg-slate-900 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>

        {/*\n  NOVAS CHAVES adicionadas ao payload:\n  - goalsSelection: string[]\n  - goalsOtherText?: string\n  - investsMonthly: 'Sim' | 'Não'\n  - averageMonthlyInvestment?: number\n  Campos antigos NÃO foram renomeados nem removidos.\n*/}
      </div>
    </div>
  );
}
