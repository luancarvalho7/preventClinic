import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';


export default function PatrimonyEmergencyFundForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [hasEmergencyFund, setHasEmergencyFund] = useState(formData?.hasEmergencyFund || '');
  const [emergencyFundMonths, setemergencyFundMonths] = useState(formData?.emergencyFundMonths || '');
  const [emergencyFundLocation, setemergencyFundLocation] = useState<string[]>(formData?.emergencyFundLocation || []);

  const monthOptions = [
    '1 a 2 meses',
    '3 a 6 meses',
    '6 a 12 meses',
    '1 a 2 anos',
    'Mais de 2 anos',
  ];

  const locationOptions = [
    'Conta corrente',
    'Poupança',
    'CDB com liquidez diária',
    'Fundo de renda fixa / Tesouro Selic',
    'Aplicativo de conta digital (Nubank, Inter, PicPay etc.)',
    'Outro',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue({
      hasEmergencyFund,
      emergencyFundMonths: hasEmergencyFund === 'Sim' ? emergencyFundMonths : '',
      emergencyFundLocation: hasEmergencyFund === 'Sim' ? emergencyFundLocation : [],
    });
  };

  const isValid =
    hasEmergencyFund === 'Não' ||
    (hasEmergencyFund === 'Sim' && emergencyFundMonths && emergencyFundLocation.length > 0);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Seção 5 – Patrimônio e Investimentos</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 20 */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Você possui reserva de emergência?
            </label>
            <div className="flex gap-4">
              {['Não', 'Sim'].map((option) => (
                <label
                  key={option}
                  className={`flex-1 text-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    hasEmergencyFund === option ? 'border-accent bg-slate-900/10' : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="hasEmergencyFund"
                    value={option}
                    checked={hasEmergencyFund === option}
                    onChange={(e) => setHasEmergencyFund(e.target.value)}
                    className="hidden"
                  />
                  <span className="capitalize text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 21–22 */}
          {hasEmergencyFund === 'Sim' && (
            <>
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Ela cobre quantos meses dos seus gastos?
                </label>
                <div className="space-y-3">
                  {monthOptions.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        emergencyFundMonths === opt ? 'border-accent bg-slate-900/10' : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="emergencyFundMonths"
                        value={opt}
                        checked={emergencyFundMonths === opt}
                        onChange={(e) => setemergencyFundMonths(e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="ml-3 text-gray-900">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Onde essa reserva está aplicada?
                </label>
                <div className="space-y-3">
                  {locationOptions.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        emergencyFundLocation.includes(opt) ? 'border-accent bg-slate-900/10' : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={opt}
                        checked={emergencyFundLocation.includes(opt)}
                        onChange={(e) =>
                          setemergencyFundLocation((prev) =>
                            prev.includes(opt)
                              ? prev.filter((x) => x !== opt)
                              : [...prev, opt]
                          )
                        }
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="ml-3 text-gray-900">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-slate-900 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
