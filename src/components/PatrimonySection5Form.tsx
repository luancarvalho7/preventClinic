import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';
import { formatCurrency, parseCurrency } from '../utils/currency';

export default function PatrimonySection5Form({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [hasEmergencyFund, setHasEmergencyFund] = useState(formData?.hasEmergencyFund || '');
  const [emergencyFundMonths, setEmergencyFundMonths] = useState(formData?.emergencyFundMonths || '');
  const [emergencyFundLocation, setEmergencyFundLocation] = useState(formData?.emergencyFundLocation || '');
  const [alreadyInvests, setAlreadyInvests] = useState(formData?.alreadyInvests || '');
  const [investmentTypes, setInvestmentTypes] = useState(formData?.investmentTypes || '');
  const [monthlyInvestment, setMonthlyInvestment] = useState(formData?.monthlyInvestment || '');
  const [displayMonthlyInvestment, setDisplayMonthlyInvestment] = useState(monthlyInvestment ? formatCurrency(monthlyInvestment) : '');
  const [investmentGoal, setInvestmentGoal] = useState(formData?.investmentGoal || '');
  const [retirementIncome, setRetirementIncome] = useState(formData?.retirementIncome || '');
  const [displayRetirementIncome, setDisplayRetirementIncome] = useState(retirementIncome ? formatCurrency(retirementIncome) : '');
  const [hasVehicle, setHasVehicle] = useState(formData?.hasVehicle || '');
  const [vehicleDetails, setVehicleDetails] = useState(formData?.vehicleDetails || '');
  const [hasProperty, setHasProperty] = useState(formData?.hasProperty || '');
  const [propertyDetails, setPropertyDetails] = useState(formData?.propertyDetails || '');
  const [otherAssets, setOtherAssets] = useState(formData?.otherAssets || '');

  const locationOptions = ['Conta corrente', 'Poupança', 'CDB', 'Fundo', 'Outro'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue({
      hasEmergencyFund,
      emergencyFundMonths: hasEmergencyFund === 'Sim' ? emergencyFundMonths : '0',
      emergencyFundLocation: hasEmergencyFund === 'Sim' ? emergencyFundLocation : '',
      alreadyInvests,
      investmentTypes: alreadyInvests === 'Sim' ? investmentTypes : '',
      monthlyInvestment: alreadyInvests === 'Sim' ? monthlyInvestment : '0',
      investmentGoal: alreadyInvests === 'Sim' ? investmentGoal : '',
      retirementIncome,
      hasVehicle,
      vehicleDetails: hasVehicle === 'Sim' ? vehicleDetails : '',
      hasProperty,
      propertyDetails: hasProperty === 'Sim' ? propertyDetails : '',
      otherAssets: otherAssets || 'Nenhum'
    });
  };

  const isValid = hasEmergencyFund &&
    (hasEmergencyFund === 'Não' || (emergencyFundMonths && emergencyFundLocation)) &&
    alreadyInvests &&
    (alreadyInvests === 'Não' || (investmentTypes && monthlyInvestment && investmentGoal)) &&
    retirementIncome &&
    hasVehicle &&
    (hasVehicle === 'Não' || vehicleDetails) &&
    hasProperty &&
    (hasProperty === 'Não' || propertyDetails);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Seção 5 – Patrimônio e Investimentos
          </h2>
          <p className="text-gray-600">
            Agora quero entender o quanto você já construiu de segurança financeira e patrimônio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Você possui reserva de emergência?
            </label>
            <div className="space-y-3">
              {['Não', 'Sim'].map((option) => (
                <label key={option} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="hasEmergencyFund"
                    value={option}
                    checked={hasEmergencyFund === option}
                    onChange={(e) => setHasEmergencyFund(e.target.value)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="ml-3 text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {hasEmergencyFund === 'Sim' && (
            <>
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-3">
                  Ela cobre quantos meses do seu custo fixo?
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={emergencyFundMonths}
                  onChange={(e) => setEmergencyFundMonths(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Ex: 3"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Onde essa reserva está aplicada?
                </label>
                <div className="space-y-3">
                  {locationOptions.map((option) => (
                    <label key={option} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="emergencyFundLocation"
                        value={option}
                        checked={emergencyFundLocation === option}
                        onChange={(e) => setEmergencyFundLocation(e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="ml-3 text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Você já investe?
            </label>
            <div className="space-y-3">
              {['Não', 'Sim'].map((option) => (
                <label key={option} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="alreadyInvests"
                    value={option}
                    checked={alreadyInvests === option}
                    onChange={(e) => setAlreadyInvests(e.target.value)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="ml-3 text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {alreadyInvests === 'Sim' && (
            <>
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-3">
                  Onde investe atualmente? (CDB, fundos, ações, previdência etc.)
                </label>
                <input
                  type="text"
                  value={investmentTypes}
                  onChange={(e) => setInvestmentTypes(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Ex: CDB, Tesouro Direto, Ações"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-900 mb-3">
                  Valor médio investido mensalmente
                </label>
                <input
                  type="text"
                  value={displayMonthlyInvestment}
                  onChange={(e) => {
                    const rawValue = parseCurrency(e.target.value);
                    setMonthlyInvestment(rawValue);
                    setDisplayMonthlyInvestment(formatCurrency(rawValue));
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="R$ 0,00"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-900 mb-3">
                  Qual é o principal objetivo dos seus investimentos?
                </label>
                <input
                  type="text"
                  value={investmentGoal}
                  onChange={(e) => setInvestmentGoal(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Ex: aposentadoria, casa, viagem"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Pensando no futuro, quanto precisaria receber de aposentadoria para viver tranquilo(a)?
            </label>
            <input
              type="text"
              value={displayRetirementIncome}
              onChange={(e) => {
                const rawValue = parseCurrency(e.target.value);
                setRetirementIncome(rawValue);
                setDisplayRetirementIncome(formatCurrency(rawValue));
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="R$ 0,00"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Possui veículo?
            </label>
            <div className="space-y-3">
              {['Não', 'Sim'].map((option) => (
                <label key={option} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="hasVehicle"
                    value={option}
                    checked={hasVehicle === option}
                    onChange={(e) => setHasVehicle(e.target.value)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="ml-3 text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {hasVehicle === 'Sim' && (
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-3">
                Qual modelo e valor estimado atual?
              </label>
              <input
                type="text"
                value={vehicleDetails}
                onChange={(e) => setVehicleDetails(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Ex: Honda Civic 2018, R$ 80.000"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Possui imóveis?
            </label>
            <div className="space-y-3">
              {['Não', 'Sim'].map((option) => (
                <label key={option} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="hasProperty"
                    value={option}
                    checked={hasProperty === option}
                    onChange={(e) => setHasProperty(e.target.value)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="ml-3 text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {hasProperty === 'Sim' && (
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-3">
                Descreva tipo(s) e valor estimado
              </label>
              <textarea
                value={propertyDetails}
                onChange={(e) => setPropertyDetails(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                rows={3}
                placeholder="Ex: Apartamento em São Paulo, R$ 500.000"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Tem algum outro bem relevante (empresa, joias, terrenos etc.)?
            </label>
            <input
              type="text"
              value={otherAssets}
              onChange={(e) => setOtherAssets(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Digite se houver, ou deixe em branco"
            />
            <p className="mt-2 text-sm text-gray-500">Opcional</p>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full text-white py-3 px-6 rounded-lg font-medium transition-colors ${
              isValid
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                : 'bg-black cursor-not-allowed'
            }`}
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
