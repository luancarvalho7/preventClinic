import React from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';

export default function IntroForm({ onContinue, formData, questionNumber }: FormStepProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex flex-col items-center justify-center font-inter px-6 py-12">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <QuestionNumber number={questionNumber} />
          <h2 className="text-3xl md:text-4xl font-funnel font-bold text-slate-900 mb-6 text-center">
            Seção 1 – Perfil e Contexto
          </h2>

          <p className="text-lg text-slate-700 mb-8 leading-relaxed text-center">
            Aqui queremos entender um pouco mais sobre quem você é e o seu momento atual de vida.
            Isso ajuda a adaptar o plano à sua realidade.
          </p>

          <button
            onClick={() => onContinue({})}
            className="w-full max-w-[576px] mx-auto py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium text-lg shadow-md hover:shadow-lg"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
