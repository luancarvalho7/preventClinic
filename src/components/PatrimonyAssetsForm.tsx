import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';
import { formatCurrencyInput, handleCurrencyInput, parseCurrency } from '../utils/currency';

export default function PatrimonyAssetsForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [hasVehicle, setHasVehicle] = useState(formData?.hasVehicle || '');
  const [vehicleModels, setVehicleModels] = useState<string[]>(formData?.vehicleModels || []);
  const [vehicleValue, setVehicleValue] = useState<number>(
    typeof formData?.vehicleValue === 'number' ? formData.vehicleValue :
    typeof formData?.vehicleValue === 'string' ? Number(formData.vehicleValue) : 0
  );
  const [displayVehicleValue, setDisplayVehicleValue] = useState(
    vehicleValue > 0 ? formatCurrencyInput(vehicleValue) : ''
  );

  // NOVO: seguro de veículo
  const [hasVehicleInsurance, setHasVehicleInsurance] = useState(formData?.hasVehicleInsurance || ''); // 'Sim' | 'Não' | ''
  const [vehicleInsurancePremium, setVehicleInsurancePremium] = useState<number>(
    typeof formData?.vehicleInsurancePremium === 'number' ? formData.vehicleInsurancePremium :
    typeof formData?.vehicleInsurancePremium === 'string' ? Number(formData.vehicleInsurancePremium) : 0
  );
  const [displayVehicleInsurancePremium, setDisplayVehicleInsurancePremium] = useState(
    vehicleInsurancePremium > 0 ? formatCurrencyInput(vehicleInsurancePremium) : ''
  );

  const [hasProperty, setHasProperty] = useState(formData?.hasProperty || '');
  const [propertyTypes, setPropertyTypes] = useState<string[]>(formData?.propertyTypes || []);
  const [propertyValue, setPropertyValue] = useState<number>(
    typeof formData?.propertyValue === 'number' ? formData.propertyValue :
    typeof formData?.propertyValue === 'string' ? Number(formData.propertyValue) : 0
  );
  const [displayPropertyValue, setDisplayPropertyValue] = useState(
    propertyValue > 0 ? formatCurrencyInput(propertyValue) : ''
  );

  // NOVO: seguro de imóvel
  const [hasPropertyInsurance, setHasPropertyInsurance] = useState(formData?.hasPropertyInsurance || ''); // 'Sim' | 'Não' | ''
  const [propertyInsurancePremium, setPropertyInsurancePremium] = useState<number>(
    typeof formData?.propertyInsurancePremium === 'number' ? formData.propertyInsurancePremium :
    typeof formData?.propertyInsurancePremium === 'string' ? Number(formData.propertyInsurancePremium) : 0
  );
  const [displayPropertyInsurancePremium, setDisplayPropertyInsurancePremium] = useState(
    propertyInsurancePremium > 0 ? formatCurrencyInput(propertyInsurancePremium) : ''
  );

  const [otherAssets, setOtherAssets] = useState(formData?.otherAssets || '');

  const vehicleModelOptions = ['Carro', 'Moto', 'Caminhão', 'Outro'];
  const propertyTypeOptions = ['Casa', 'Apartamento', 'Terreno', 'Sítio/Chácara', 'Outro'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue({
      hasVehicle,
      vehicleModels: hasVehicle === 'Sim' ? vehicleModels : [],
      vehicleValue: hasVehicle === 'Sim' ? vehicleValue : 0,
      hasVehicleInsurance: hasVehicle === 'Sim' ? hasVehicleInsurance : '',
      vehicleInsurancePremium:
        hasVehicle === 'Sim' && hasVehicleInsurance === 'Sim' ? vehicleInsurancePremium : 0,

      hasProperty,
      propertyTypes: hasProperty === 'Sim' ? propertyTypes : [],
      propertyValue: hasProperty === 'Sim' ? propertyValue : 0,
      hasPropertyInsurance: hasProperty === 'Sim' ? hasPropertyInsurance : '',
      propertyInsurancePremium:
        hasProperty === 'Sim' && hasPropertyInsurance === 'Sim' ? propertyInsurancePremium : 0,

      otherAssets: otherAssets || 'Nenhum',
    });
  };

  const isValid =
    hasVehicle &&
    (hasVehicle === 'Não' || (vehicleModels.length > 0 && vehicleValue > 0)) &&
    // se informou que tem veículo, pergunta de seguro obrigatória; se Sim, exige prêmio
    (hasVehicle !== 'Sim' || (hasVehicleInsurance && (hasVehicleInsurance === 'Não' || vehicleInsurancePremium > 0))) &&
    hasProperty &&
    (hasProperty === 'Não' || (propertyTypes.length > 0 && propertyValue > 0)) &&
    // se informou que tem imóvel, pergunta de seguro obrigatória; se Sim, exige prêmio
    (hasProperty !== 'Sim' || (hasPropertyInsurance && (hasPropertyInsurance === 'Não' || propertyInsurancePremium > 0)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter px-6 py-8 pt-20">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="w-full max-w-2xl mx-auto">
        <QuestionNumber number={questionNumber} />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Patrimônio e Investimentos
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 25 */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Possui veículo?
            </label>
            <div className="flex gap-4">
              {['Não', 'Sim'].map((opt) => (
                <label
                  key={opt}
                  className={`flex-1 text-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    hasVehicle === opt
                      ? 'border-accent bg-blue-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="hasVehicle"
                    value={opt}
                    checked={hasVehicle === opt}
                    onChange={(e) => {
                      setHasVehicle(e.target.value);
                      // reset dependentes
                      if (e.target.value === 'Não') {
                        setVehicleModels([]);
                        setVehicleValue('');
                        setDisplayVehicleValue('');
                        setHasVehicleInsurance('');
                        setVehicleInsurancePremium('');
                        setDisplayVehicleInsurancePremium('');
                      }
                    }}
                    className="hidden"
                  />
                  <span className="text-gray-900">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {hasVehicle === 'Sim' && (
            <>
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Qual(is) modelo(s)?
                </label>
                <div className="space-y-3">
                  {vehicleModelOptions.map((model) => (
                    <label
                      key={model}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        vehicleModels.includes(model)
                          ? 'border-accent bg-blue-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={model}
                        checked={vehicleModels.includes(model)}
                        onChange={() =>
                          setVehicleModels((prev) =>
                            prev.includes(model)
                              ? prev.filter((x) => x !== model)
                              : [...prev, model]
                          )
                        }
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="ml-3 text-gray-900">{model}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-900 mb-3">
                  Qual valor total do(s) veículo(s)?
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={displayVehicleValue}
                  onChange={(e) => {
                    const cents = parseCurrency(e.target.value);
                    setVehicleValue(cents);
                    setDisplayVehicleValue(formatCurrencyInput(cents));
                  }}
                  placeholder="R$ 0,00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              {/* NOVO: Seguro veículo */}
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Tem seguro do(s) veículo(s)?
                </label>
                <div className="flex gap-4">
                  {['Não', 'Sim'].map((opt) => (
                    <label
                      key={opt}
                      className={`flex-1 text-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        hasVehicleInsurance === opt
                          ? 'border-accent bg-blue-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="hasVehicleInsurance"
                        value={opt}
                        checked={hasVehicleInsurance === opt}
                        onChange={(e) => {
                          setHasVehicleInsurance(e.target.value);
                          if (e.target.value === 'Não') {
                            setVehicleInsurancePremium('');
                            setDisplayVehicleInsurancePremium('');
                          }
                        }}
                        className="hidden"
                      />
                      <span className="text-gray-900">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {hasVehicleInsurance === 'Sim' && (
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">
                    Valor do prêmio do seguro (R$)
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={displayVehicleInsurancePremium}
                    onChange={(e) => {
                      const cents = parseCurrency(e.target.value);
                      setVehicleInsurancePremium(cents);
                      setDisplayVehicleInsurancePremium(formatCurrencyInput(cents));
                    }}
                    placeholder="R$ 0,00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
              )}
            </>
          )}

          {/* 26 */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Possui imóveis?
            </label>
            <div className="flex gap-4">
              {['Não', 'Sim'].map((opt) => (
                <label
                  key={opt}
                  className={`flex-1 text-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    hasProperty === opt
                      ? 'border-accent bg-blue-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="hasProperty"
                    value={opt}
                    checked={hasProperty === opt}
                    onChange={(e) => {
                      setHasProperty(e.target.value);
                      if (e.target.value === 'Não') {
                        setPropertyTypes([]);
                        setPropertyValue('');
                        setDisplayPropertyValue('');
                        setHasPropertyInsurance('');
                        setPropertyInsurancePremium('');
                        setDisplayPropertyInsurancePremium('');
                      }
                    }}
                    className="hidden"
                  />
                  <span className="text-gray-900">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {hasProperty === 'Sim' && (
            <>
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Qual(is) tipo(s) de imóvel(is)?
                </label>
                <div className="space-y-3">
                  {propertyTypeOptions.map((type) => (
                    <label
                      key={type}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        propertyTypes.includes(type)
                          ? 'border-accent bg-blue-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={type}
                        checked={propertyTypes.includes(type)}
                        onChange={() =>
                          setPropertyTypes((prev) =>
                            prev.includes(type)
                              ? prev.filter((x) => x !== type)
                              : [...prev, type]
                          )
                        }
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="ml-3 text-gray-900">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-900 mb-3">
                  Qual valor total do(s) imóvel(is)?
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={displayPropertyValue}
                  onChange={(e) => {
                    const cents = parseCurrency(e.target.value);
                    setPropertyValue(cents);
                    setDisplayPropertyValue(formatCurrencyInput(cents));
                  }}
                  placeholder="R$ 0,00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              {/* NOVO: Seguro imóvel */}
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Tem seguro do(s) imóvel(is)?
                </label>
                <div className="flex gap-4">
                  {['Não', 'Sim'].map((opt) => (
                    <label
                      key={opt}
                      className={`flex-1 text-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        hasPropertyInsurance === opt
                          ? 'border-accent bg-blue-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="hasPropertyInsurance"
                        value={opt}
                        checked={hasPropertyInsurance === opt}
                        onChange={(e) => {
                          setHasPropertyInsurance(e.target.value);
                          if (e.target.value === 'Não') {
                            setPropertyInsurancePremium('');
                            setDisplayPropertyInsurancePremium('');
                          }
                        }}
                        className="hidden"
                      />
                      <span className="text-gray-900">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {hasPropertyInsurance === 'Sim' && (
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">
                    Valor do prêmio do seguro (R$)
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={displayPropertyInsurancePremium}
                    onChange={(e) => {
                      const cents = parseCurrency(e.target.value);
                      setPropertyInsurancePremium(cents);
                      setDisplayPropertyInsurancePremium(formatCurrencyInput(cents));
                    }}
                    placeholder="R$ 0,00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
              )}
            </>
          )}

          {/* 27 */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Tem algum outro bem relevante (empresa, joias, terrenos etc.)?
            </label>
            <input
              type="text"
              value={otherAssets}
              onChange={(e) => setOtherAssets(e.target.value)}
              placeholder="Digite se houver, ou deixe em branco"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <p className="mt-2 text-sm text-gray-500">Opcional</p>
          </div>

          <div className="pb-16">
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full max-w-[576px] mx-auto text-white py-3 px-6 rounded-full font-medium transition-colors ${
                isValid
                  ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  : 'bg-black cursor-not-allowed'
              }`}
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
