import React, { useState } from 'react';
import { FormStepProps } from '../types/form';

export default function GoalsSection6Form({ onContinue, formData }: FormStepProps) {
  const [goals12Months, setGoals12Months] = useState(formData?.goals12Months || '');
  const [goals5Years, setGoals5Years] = useState(formData?.goals5Years || '');
  const [topPriority, setTopPriority] = useState(formData?.topPriority || '');
  const [goalImpact, setGoalImpact] = useState(formData?.goalImpact || '');
  const [changeCommitment, setChangeCommitment] = useState(formData?.changeCommitment || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goals12Months && goals5Years && topPriority && goalImpact && changeCommitment) {
      onContinue({
        goals12Months,
        goals5Years,
        topPriority,
        goalImpact,
        changeCommitment
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Seção 6 – Objetivos e Prioridades
          </h2>
          <p className="text-gray-600">
            Aqui vamos alinhar o planejamento ao que realmente importa pra você — seus sonhos e metas financeiras.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              {['1 - Pouco disposto', '2', '3', '4', '5 - Totalmente comprometido'].map((option) => (
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

          <button
            type="submit"
            disabled={!goals12Months || !goals5Years || !topPriority || !goalImpact || !changeCommitment}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
