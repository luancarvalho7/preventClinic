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
              <div className="relative">
                {/* Ambient glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-3xl blur-2xl opacity-20" />

                {/* Main card */}
                <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl">
                  {/* Top accent bar */}
                  <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500" />

                  <div className="p-6 sm:p-8 lg:p-10 space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-3">
                      <div className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-2">
                        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                          Oferta Exclusiva
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        Consultoria Personalizada
                      </h2>
                      <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto">
                        Estruture seu plano financeiro com especialistas
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed text-center max-w-md mx-auto">
                      Com base em suas respostas, preparamos uma consultoria exclusiva para estruturar seu plano financeiro e alcançar seus objetivos.
                    </p>

                    {/* Pricing Section */}
                    {fullPrice !== undefined && (
                      <div className="space-y-6">
                        {/* Main pricing card */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl" />
                          <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-cyan-500/20">
                            <div className="text-center space-y-6">
                              {/* Installment price - HERO */}
                              <div className="space-y-3">
                                <p className="text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-widest">
                                  Parcelado em
                                </p>
                                <div className="flex items-end justify-center gap-2 sm:gap-3">
                                  <span className="text-3xl sm:text-4xl text-cyan-400 font-bold">
                                    12x
                                  </span>
                                  <div className="pb-1">
                                    <div className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent leading-none">
                                      {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                      }).format(fullPrice / 12)}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Divider */}
                              <div className="flex items-center justify-center gap-3 py-2">
                                <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-600" />
                                <span className="text-xs sm:text-sm text-slate-500 font-medium uppercase">ou</span>
                                <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-600" />
                              </div>

                              {/* Cash price */}
                              <div className="space-y-2">
                                <p className="text-xs text-slate-400 uppercase tracking-wide">
                                  Pagamento à vista
                                </p>
                                <div className="inline-flex items-baseline gap-2 px-5 sm:px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl">
                                  <span className="text-2xl sm:text-3xl font-bold text-cyan-400">
                                    {new Intl.NumberFormat('pt-BR', {
                                      style: 'currency',
                                      currency: 'BRL',
                                    }).format(fullPrice)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <button
                          onClick={handleComprar}
                          className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 p-0.5 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <div className="relative bg-gradient-to-r from-cyan-600 to-blue-600 rounded-[14px] px-6 py-4 transition-all duration-300 group-hover:from-cyan-500 group-hover:to-blue-500">
                            <span className="text-base sm:text-lg font-bold text-white">
                              Comprar Agora
                            </span>
                          </div>
                        </button>

                        {/* Footer text */}
                        <p className="text-xs text-center text-slate-500">
                          🔒 Acesso imediato após o pagamento
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}