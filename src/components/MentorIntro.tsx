import React from 'react';
import PageHeader from './PageHeader';
import { FormStepProps } from '../types/form';

export default function MentorIntro({ onContinue }: FormStepProps) {
  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center font-inter px-6">
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-funnel font-bold text-slate-900 mb-4">
            Mentor do seu Plano
          </h1>

          <p className="text-xl text-slate-700 mb-12">
            Responda 3 perguntas com sim ou não e veja seu plano.
          </p>

          <button
            onClick={() => onContinue({})}
            className="px-12 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium text-lg shadow-lg hover:shadow-xl"
          >
            Começar
          </button>
        </div>
      </div>
    </>
  );
}
