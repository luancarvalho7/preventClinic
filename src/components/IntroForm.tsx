import React from 'react';
import PageHeader from './PageHeader';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';

export default function IntroForm({ onContinue, formData, questionNumber }: FormStepProps) {
  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter px-6 py-8">
      <div className="w-full max-w-2xl mx-auto">
        <QuestionNumber number={questionNumber} />
        <h2 className="text-3xl md:text-4xl font-funnel font-bold text-slate-900 mb-6">
          Seção 1 – Perfil e Contexto
        </h2>

        <p className="text-lg text-slate-700 mb-8 leading-relaxed">
          Aqui queremos entender um pouco mais sobre quem você é e o seu momento atual de vida.
          Isso ajuda a adaptar o plano à sua realidade.
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-16 bg-gradient-to-t from-slate-50 to-transparent">
        <div className="w-full max-w-[576px] mx-auto">
          <button
            onClick={() => onContinue({})}
            className="w-full py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium text-lg shadow-md hover:shadow-lg"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
