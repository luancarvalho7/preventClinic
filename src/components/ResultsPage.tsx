import React from 'react';
import Logo from './Logo';
import { FormData } from '../types/form';

interface ResultsPageProps {
  formData: FormData;
  onBack: () => void;
}

export default function ResultsPage({ formData }: ResultsPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Logo />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center space-y-6">
          <div className="text-4xl mb-4">✅</div>

          <h1 className="text-3xl font-funnel font-bold text-gray-900">
            Questionário Concluído!
          </h1>

          <div className="space-y-4 text-left text-gray-700 max-w-2xl mx-auto">
            <p className="text-lg">
              Obrigada por dedicar esse tempo a olhar para suas finanças com atenção e cuidado.
            </p>
            <p>
              Suas respostas serão guia para a estruturação de um plano personalizado, feito para trazer clareza, equilíbrio e evolução financeira.
            </p>
            <p className="font-medium">
              Em breve seu consultor entrará em contato para conversarem sobre os próximos passos.
            </p>
          </div>

          <div className="pt-8">
            <div className="inline-block px-6 py-3 bg-slate-900/10 text-slate-900 rounded-lg font-medium">
              Respostas enviadas com sucesso
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}