import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

export default function ExpectationsSection7Form({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [consultingGoals, setConsultingGoals] = useState<string[]>(formData?.consultingGoals || []);
  const [successDefinition, setSuccessDefinition] = useState(formData?.successDefinition || '');

  const goalOptions = [
    'Organização',
    'Redução de dívidas',
    'Investimentos',
    'Crescimento patrimonial',
    'Outros'
  ];

  const handleGoalToggle = (option: string) => {
    setConsultingGoals(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (consultingGoals.length > 0 && successDefinition) {
      onContinue({
        consultingGoals,
        successDefinition
      });
    }
  };

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter px-6 py-8 pt-20">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="w-full max-w-2xl mx-auto">
        <QuestionNumber number={questionNumber} />
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Seção 7 – Expectativas e Engajamento
          </h2>
          <p className="text-gray-600">
            Por fim, quero entender suas expectativas sobre o acompanhamento financeiro e o que seria um resultado de sucesso pra você.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              O que você busca com esse acompanhamento financeiro?
            </label>
            <div className="space-y-3">
              {goalOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={consultingGoals.includes(option)}
                    onChange={() => handleGoalToggle(option)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-600 rounded"
                  />
                  <span className="ml-3 text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              O que te faria considerar essa consultoria um sucesso?
            </label>
            <textarea
              value={successDefinition}
              onChange={(e) => setSuccessDefinition(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              rows={5}
              placeholder="Descreva o que seria um resultado bem-sucedido para você..."
              required
            />
          </div>

          <div className="pb-16">
            <button
              type="submit"
              disabled={consultingGoals.length === 0 || !successDefinition}
              className={`w-full max-w-[576px] mx-auto text-white py-3 px-6 rounded-full font-medium transition-colors ${
                consultingGoals.length > 0 && successDefinition
                  ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  : 'bg-black cursor-not-allowed'
              }`}
            >
              Finalizar
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
