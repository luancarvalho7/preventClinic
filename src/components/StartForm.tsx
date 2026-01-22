import React from 'react';
import { FormStepProps } from '../types/form';

export default function StartForm({ onContinue, questionNumber }: FormStepProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center font-inter px-6">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-funnel font-bold text-slate-900 mb-4 text-center">
            Diagnóstico Financeiro Pessoal
          </h1>

          <div className="prose prose-slate max-w-none mb-8 text-slate-700 leading-relaxed">
            <p className="text-lg mb-4">Olá!</p>
            <p className="mb-4">
              Este questionário é o primeiro passo para que possamos começar a traçar o seu planejamento financeiro personalizado.
              Queremos te ajudar a organizar o fluxo de dinheiro, eliminar eventuais dívidas, investir melhor e alcançar seus objetivos.
            </p>
            <p className="mb-4">Reserve cerca de 10 minutos para responder com calma.</p>
            <p className="font-medium text-slate-900">
              Não há respostas certas ou erradas. O importante é que sejam verdadeiras e completas.
            </p>
          </div>

          <button
            onClick={() => onContinue({})}
            className="w-full max-w-[576px] mx-auto py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium text-lg shadow-md hover:shadow-lg"
          >
            Iniciar Diagnóstico
          </button>
        </div>
      </div>
    </div>
  );
}