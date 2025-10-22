import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import { formatCurrencyInput, parseCurrency } from '../utils/currency';

export default function PatrimonyAssetsForm({ onContinue, formData, questionNumber }: FormStepProps) {
  const [hasVehicle, setHasVehicle] = useState(formData?.hasVehicle || '');
  const [vehicleModels, setVehicleModels] = useState<string[]>(formData?.vehicleModels || []);
  const [vehicleValue, setVehicleValue] = useState(formData?.vehicleValue || '');
  const [displayVehicleValue, setDisplayVehicleValue] = useState(
    formData?.vehicleValue ? formatCurrencyInput(formData.vehicleValue) : ''
  );
  const [hasProperty, setHasProperty] = useState(formData?.hasProperty || '');
  const [propertyTypes, setPropertyTypes] = useState<string[]>(formData?.propertyTypes || []);
  const [propertyValue, setPropertyValue] = useState(formData?.propertyValue || '');
  const [displayPropertyValue, setDisplayPropertyValue] = useState(
    formData?.propertyValue ? formatCurrencyInput(formData.propertyValue) : ''
  );
  const [otherAssets, setOtherAssets] = useState(formData?.otherAssets || '');

  const vehicleModelOptions = ['Carro', 'Moto', 'Caminhão', 'Outro'];
  const propertyTypeOptions = ['Casa', 'Apartamento', 'Terreno', 'Sítio/Chácara', 'Outro'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue({
      hasVehicle,
      vehicleModels: hasVehicle === 'Sim' ? vehicleModels : [],
      vehicleValue: hasVehicle === 'Sim' ? vehicleValue : '',
      hasProperty,
      propertyTypes: hasProperty === 'Sim' ? propertyTypes : [],
      propertyValue: hasProperty === 'Sim' ? propertyValue : '',
      otherAssets: otherAssets || 'Nenhum',
    });
  };

  const isValid =
    hasVehicle &&
    (hasVehicle === 'Não' || (vehicleModels.length > 0 && vehicleValue.trim() !== '')) &&
    hasProperty &&
    (hasProperty === 'Não' || (propertyTypes.length > 0 && propertyValue.trim() !== ''));

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Seção 5 – Patrimônio e Investimentos
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
                      ? 'border-accent bg-accent/10'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="hasVehicle"
                    value={opt}
                    checked={hasVehicle === opt}
                    onChange={(e) => setHasVehicle(e.target.value)}
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
                          ? 'border-accent bg-accent/10'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={model}
                        checked={vehicleModels.includes(model)}
                        onChange={(e) =>
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
                    const formatted = formatCurrencyInput(e.target.value);
                    setDisplayVehicleValue(formatted);
                    setVehicleValue(String(parseCurrency(e.target.value)));
                  }}
                  placeholder="R$ 0,00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
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
                      ? 'border-accent bg-accent/10'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="hasProperty"
                    value={opt}
                    checked={hasProperty === opt}
                    onChange={(e) => setHasProperty(e.target.value)}
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
                          ? 'border-accent bg-accent/10'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={type}
                        checked={propertyTypes.includes(type)}
                        onChange={(e) =>
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
                    const formatted = formatCurrencyInput(e.target.value);
                    setDisplayPropertyValue(formatted);
                    setPropertyValue(String(parseCurrency(e.target.value)));
                  }}
                  placeholder="R$ 0,00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
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

          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
