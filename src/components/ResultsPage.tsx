import React from 'react';
import Logo from './Logo';
import { FormData } from '../types/form';

interface ResultsPageProps {
  formData: FormData;
  onBack: () => void;
  finalPrice?: string;
}

export default function ResultsPage({ formData, finalPrice }: ResultsPageProps) {
  const handleComprar = () => {
    window.location.href = '#';
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Logo />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center space-y-8">
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
          </div>

          {finalPrice && (
            <div className="border-2 border-blue-200 bg-blue-50 rounded-lg p-8 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Consultoria Personalizada
              </h2>
              <p className="text-gray-700">
                Com base em suas respostas, preparamos uma consultoria exclusiva para você estruturar seu plano financeiro.
              </p>
              <div className="pt-4">
                <div className="text-sm text-gray-600 mb-2">Investimento</div>
                <div className="text-3xl font-bold text-blue-600">
                  R$ {finalPrice}
                </div>
              </div>
              <button
                onClick={handleComprar}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Comprar
              </button>
            </div>
          )}

          <div className="pt-4">
            <div className="inline-block px-6 py-3 bg-slate-900/10 text-slate-900 rounded-lg font-medium">
              Respostas enviadas com sucesso
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}