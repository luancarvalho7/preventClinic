import React from 'react';
import PageHeader from './PageHeader';
import BackButton from './BackButton';
import { FormStepProps } from '../types/form';
import { BookOpen, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

interface PlanStep {
  number: number;
  title: string;
  description: string;
  action: string;
  icon: React.ReactNode;
}

const planSteps: PlanStep[] = [
  {
    number: 1,
    title: 'Fundamentos do seu dinheiro',
    description: 'Organize seu mês em 15 minutos.',
    action: 'Começar agora',
    icon: <BookOpen className="w-8 h-8" />
  },
  {
    number: 2,
    title: 'Construa seu patrimônio',
    description: 'Crie rotina de reserva e investimento.',
    action: 'Ver próxima etapa',
    icon: <TrendingUp className="w-8 h-8" />
  },
  {
    number: 3,
    title: 'Otimize com inteligência',
    description: 'Use IA para tornar seu dinheiro eficiente.',
    action: 'Explorar ferramentas',
    icon: <Sparkles className="w-8 h-8" />
  }
];

export default function DirectedPlan({ onBack, canGoBack, formData }: FormStepProps) {
  const diagnosisType = formData.diagnosisType || 'fundamentos';

  const getCurrentStepIndex = () => {
    if (diagnosisType === 'fundamentos') return 0;
    if (diagnosisType === 'patrimonio') return 1;
    return 2;
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <>
      <PageHeader />
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter px-6 py-8 pt-20 pb-24">
        <div className="w-full max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-funnel font-bold text-slate-900 mb-3">
              Seu Plano Direcionado
            </h1>
            <p className="text-lg text-slate-600">
              Siga estas etapas na ordem para transformar sua vida financeira.
            </p>
          </div>

          <div className="space-y-4">
            {planSteps.map((step, index) => {
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;
              const isLocked = index > currentStepIndex;

              return (
                <div
                  key={step.number}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                    isActive
                      ? 'border-blue-600 bg-blue-50 shadow-lg scale-[1.02]'
                      : isCompleted
                      ? 'border-green-200 bg-green-50'
                      : 'border-slate-200 bg-white opacity-60'
                  }`}
                >
                  {isActive && (
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                      Comece aqui
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : isCompleted
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}>
                      {step.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-sm font-semibold ${
                          isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-slate-400'
                        }`}>
                          Etapa {step.number}
                        </span>
                      </div>

                      <h3 className={`text-xl font-bold mb-2 ${
                        isLocked ? 'text-slate-400' : 'text-slate-900'
                      }`}>
                        {step.title}
                      </h3>

                      <p className={`mb-4 ${
                        isLocked ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {step.description}
                      </p>

                      {isActive && (
                        <button className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                          {step.action}
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      )}

                      {isCompleted && (
                        <div className="text-green-600 font-semibold">
                          ✓ Concluído
                        </div>
                      )}

                      {isLocked && (
                        <div className="text-slate-400 text-sm">
                          🔒 Desbloqueie completando as etapas anteriores
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-6 bg-white rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              💡 Dica
            </h3>
            <p className="text-slate-700">
              {diagnosisType === 'fundamentos' && "Comece simples: anote suas receitas e despesas por 30 dias. Isso já vai transformar sua visão sobre seu dinheiro."}
              {diagnosisType === 'patrimonio' && "Automatize! Configure transferências automáticas para sua reserva e investimentos assim que o salário cair."}
              {diagnosisType === 'otimizacao' && "Use ferramentas de IA para encontrar oportunidades de economia e otimização que você ainda não viu."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
