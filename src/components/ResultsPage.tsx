import React from 'react';
import Logo from './Logo';
import { FormData } from '../types/form';
import { Check } from 'lucide-react';

interface ResultsPageProps {
  formData: FormData;
  onBack: () => void;
  checkoutUrl?: string;
  fullPrice?: number;
  urlParams?: string;
}

export default function ResultsPage({ formData, checkoutUrl, fullPrice, urlParams }: ResultsPageProps) {
  const finalCheckoutUrl = checkoutUrl && urlParams ? `${checkoutUrl}${urlParams}` : checkoutUrl;

  const handleComprar = () => {
    if (finalCheckoutUrl) {
      window.location.href = finalCheckoutUrl;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 font-inter">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-16">
          <Logo invert height="h-5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Section - Content */}
          <div className="space-y-8 pt-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-500/20 text-green-400">
                  <Check size={24} />
                </div>
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-funnel font-bold text-white mb-4">
                  Questionário<br />Concluído!
                </h1>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-lg text-gray-200 leading-relaxed">
                Obrigada por dedicar esse tempo a olhar para suas finanças com atenção e cuidado.
              </p>
              <p className="text-base text-gray-300 leading-relaxed">
                Suas respostas serão guia para a estruturação de um plano personalizado, feito para trazer clareza, equilíbrio e evolução financeira.
              </p>
              <p className="text-base text-gray-300 leading-relaxed">
                Em breve seu consultor entrará em contato para conversarem sobre os próximos passos.
              </p>
            </div>

            <div className="pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg font-medium text-sm">
                <Check size={16} />
                Respostas enviadas com sucesso
              </div>
            </div>
          </div>

          {/* Right Section - Consultoria */}
          {finalCheckoutUrl && (
            <div className="lg:pt-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-300" />
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 space-y-6 border border-slate-700">
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-2">
                      Consultoria Personalizada
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Estruture seu plano financeiro com especialistas
                    </p>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    Com base em suas respostas, preparamos uma consultoria exclusiva para estruturar seu plano financeiro e alcançar seus objetivos.
                  </p>

                  {fullPrice !== undefined && (
                    <div className="py-6 space-y-3">
                      <div className="bg-gradient-to-br from-cyan-500/20 via-slate-700/30 to-slate-800/50 rounded-2xl p-6 sm:p-8 border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                        <div className="text-center space-y-4">
                          <p className="text-xs sm:text-sm text-cyan-400 uppercase tracking-widest font-semibold">
                            Investimento Mensal
                          </p>

                          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                            <span className="text-xl sm:text-2xl text-gray-400 font-light">
                              12x
                            </span>
                            <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-none">
                              {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              }).format(fullPrice / 12)}
                            </span>
                          </div>

                          <div className="flex items-center justify-center gap-2 text-gray-400 py-2">
                            <div className="h-px bg-gray-600 w-8 sm:w-12"></div>
                            <span className="text-xs sm:text-sm">ou</span>
                            <div className="h-px bg-gray-600 w-8 sm:w-12"></div>
                          </div>

                          <div className="inline-flex items-baseline gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-slate-800/60 rounded-full border border-slate-600/50">
                            <span className="text-lg sm:text-2xl font-bold text-cyan-400">
                              {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              }).format(fullPrice)}
                            </span>
                            <span className="text-xs sm:text-sm text-cyan-400/80 font-medium">
                              à vista
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleComprar}
                    className="w-full mt-8 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                  >
                    Comprar Agora
                  </button>

                  <p className="text-xs text-gray-500 text-center pt-2">
                    Acesso imediato após o pagamento
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}