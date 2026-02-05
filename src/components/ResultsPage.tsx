import React from 'react';
import Logo from './Logo';
import { FormData } from '../types/form';
import { Check } from 'lucide-react';

interface ResultsPageProps {
  formData: FormData;
  onBack: () => void;
  finalPrice?: string;
}

const PRICING_TIERS = [
  { total: 5000, link: 'https://atompar.pay.nova.money/pt-BR/checkout/66291fac-49db-4c7d-ab20-f568897f47ae' },
  { total: 8000, link: 'https://atompar.pay.nova.money/pt-BR/checkout/42a17c0c-421f-46c2-8fef-74bb47e00712' },
  { total: 10000, link: 'https://atompar.pay.nova.money/pt-BR/checkout/7b075e4c-8893-4818-8953-b1fc3352479f' },
  { total: 12000, link: 'https://atompar.pay.nova.money/pt-BR/checkout/3011cae9-577a-41a1-bfa7-5ffb99e608fe' },
  { total: 15000, link: 'https://atompar.pay.nova.money/pt-BR/checkout/47b153d9-303f-4976-bc69-12faec55c14c' },
  { total: 18000, link: 'https://atompar.pay.nova.money/pt-BR/checkout/2333dc52-92a9-4030-884f-fb74b29eba79' },
  { total: 21000, link: 'https://atompar.pay.nova.money/pt-BR/checkout/4a2f5191-bc7d-444a-a6a1-952531ff538b' },
  { total: 24000, link: 'https://atompar.pay.nova.money/pt-BR/checkout/28d1fb29-f94b-4dd2-88b2-ed15b7b4b342' },
  { total: 27000, link: 'https://atompar.pay.nova.money/pt-BR/checkout/b873bd44-e6ff-419b-8204-ab1d374a5b2f' },
  { total: 29000, link: 'https://atompar.pay.nova.money/pt-BR/checkout/92935835-1744-47a2-8fc3-9295e894d5c0' },
  { total: 32000, link: 'https://atompar.pay.nova.money/pt-BR/checkout/a0b6b549-6fe0-4ebc-8405-196ee79d6b11' },
  { total: 35000, link: 'https://atompar.pay.nova.money/pt-BR/checkout/76cea33e-8ea2-4dbc-ac13-a2c8cf973a5f' },
  { total: 38000, link: 'https://atompar.pay.nova.money/pt-BR/checkout/aeb55d93-9d78-4629-8432-4a3db2590e05' },
  { total: 42000, link: 'https://atompar.pay.nova.money/pt-BR/checkout/344e267f-a134-4dbd-9076-33fd68b2e153' },
  { total: 50000, link: 'https://atompar.pay.nova.money/pt-BR/checkout/80f050a2-61e7-449a-923b-0283357b40ae' },
  { total: 56000, link: 'https://atompar.pay.nova.money/pt-BR/checkout/23287117-efa1-491f-85a6-2dd24aaac242' },
  { total: 84000, link: 'https://atompar.pay.nova.money/checkout/9908cfdd-25ba-4d18-b493-a62cac6d17a8' },
  { total: 115000, link: 'https://atompar.pay.nova.money/pt-BR/checkout/4e3a3eeb-4478-42f3-ab9e-f7f5ef520903' },
];

function calculatePricingTier(monthlyPrice: string) {
  const monthly = parseFloat(monthlyPrice.replace(/\./g, '').replace(',', '.'));
  const annual = monthly * 12;

  let closestTier = PRICING_TIERS[0];
  let minDiff = Math.abs(annual - closestTier.total);

  for (const tier of PRICING_TIERS) {
    const diff = Math.abs(annual - tier.total);
    if (diff < minDiff) {
      minDiff = diff;
      closestTier = tier;
    }
  }

  const adjustedMonthly = closestTier.total / 12;

  return {
    monthly: adjustedMonthly.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    total: closestTier.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    link: closestTier.link
  };
}

export default function ResultsPage({ formData, finalPrice }: ResultsPageProps) {
  const pricingInfo = finalPrice ? calculatePricingTier(finalPrice) : null;

  const handleComprar = () => {
    if (pricingInfo) {
      window.location.href = pricingInfo.link;
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
          {pricingInfo && (
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

                  <div className="space-y-3 pt-4 border-t border-slate-700">
                    <div className="text-sm text-gray-400">Investimento mensal</div>
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      R$ {pricingInfo.monthly}
                      <span className="text-lg text-gray-400 font-normal">/mês</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Plano anual: R$ {pricingInfo.total}
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    Com base em suas respostas, preparamos uma consultoria exclusiva para estruturar seu plano financeiro e alcançar seus objetivos.
                  </p>

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