import React from 'react';
import { FormStepProps } from '../types/form';

export default function IntroForm({ onContinue }: FormStepProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Diagnóstico Financeiro Pessoal
          </h1>

          <div className="space-y-3 text-left text-gray-700">
            <p className="text-lg">
              Olá!
            </p>
            <p>
              Este questionário é o primeiro passo para que possamos começar a traçar o seu planejamento financeiro personalizado. Queremos te ajudar a organizar o fluxo de dinheiro, eliminar eventuais dívidas, investir melhor e alcançar seus objetivos.
            </p>
            <p>
              Reserve cerca de 10 minutos para responder com calma.
            </p>
            <p className="font-medium">
              Não há respostas certas ou erradas. O importante é que sejam verdadeiras e completas.
            </p>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={() => onContinue({})}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Começar
          </button>
        </div>
      </div>
    </div>
  );
}
