import React from 'react';
import PageHeader from './PageHeader';
import BackButton from './BackButton';
import { FormStepProps } from '../types/form';
import { AlertCircle, TrendingUp, Sparkles } from 'lucide-react';

interface DiagnosisType {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const diagnosisTypes: Record<string, DiagnosisType> = {
  fundamentos: {
    title: 'Fundamentos',
    subtitle: 'Você ainda não sabe quanto sobra no mês.',
    icon: <AlertCircle className="w-12 h-12" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  patrimonio: {
    title: 'Patrimônio',
    subtitle: 'Você é estável, mas não constrói com rotina.',
    icon: <TrendingUp className="w-12 h-12" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  otimizacao: {
    title: 'Otimização',
    subtitle: 'A base existe. Falta eficiência.',
    icon: <Sparkles className="w-12 h-12" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  }
};

export default function DiagnosisResult({ onContinue, onBack, canGoBack, formData }: FormStepProps) {
  const yesCount = formData.diagnosisYesCount || 0;

  let diagnosisKey: string;
  if (yesCount === 0) {
    diagnosisKey = 'fundamentos';
  } else if (yesCount <= 2) {
    diagnosisKey = 'patrimonio';
  } else {
    diagnosisKey = 'otimizacao';
  }

  const diagnosis = diagnosisTypes[diagnosisKey];

  return (
    <>
      <PageHeader />
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter px-6 py-8 pt-20">
        <div className="w-full max-w-2xl mx-auto">
          <div className="text-sm font-medium text-slate-500 mb-6">
            Seu Diagnóstico
          </div>

          <div className={`${diagnosis.bgColor} ${diagnosis.color} p-8 rounded-3xl mb-8`}>
            <div className="flex items-start gap-4 mb-4">
              {diagnosis.icon}
              <div>
                <h2 className="text-2xl font-funnel font-bold mb-2">
                  {diagnosis.title}
                </h2>
                <p className="text-lg opacity-90">
                  {diagnosis.subtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              Por que esse diagnóstico?
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {yesCount === 0 && "Você ainda está construindo a base do seu controle financeiro. O primeiro passo é entender seu fluxo de caixa."}
              {yesCount === 1 && "Você tem algum controle, mas ainda falta construir uma rotina consistente de reserva e investimento."}
              {yesCount === 2 && "Você está no caminho certo, mas ainda há espaço para melhorar sua consistência e planejamento."}
              {yesCount === 3 && "Você tem uma boa base financeira. Agora é hora de otimizar e tornar seu dinheiro mais eficiente."}
            </p>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-16 bg-gradient-to-t from-slate-50 to-transparent">
          <div className="w-full max-w-[576px] mx-auto">
            <button
              onClick={() => onContinue({ diagnosisType: diagnosisKey })}
              className="w-full py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium text-lg shadow-md hover:shadow-lg"
            >
              Ver meu plano
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
