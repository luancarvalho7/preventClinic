import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';

export default function PatrimonyAssetsForm({ onContinue, formData, questionNumber }: FormStepProps) {
  const [hasVehicle, setHasVehicle] = useState(formData?.hasVehicle || '');
  const [vehicleDetails, setVehicleDetails] = useState(formData?.vehicleDetails || '');
  const [hasProperty, setHasProperty] = useState(formData?.hasProperty || '');
  const [propertyDetails, setPropertyDetails] = useState(formData?.propertyDetails || '');
  const [otherAssets, setOtherAssets] = useState(formData?.otherAssets || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue({
      hasVehicle,
      vehicleDetails: hasVehicle === 'Sim' ? vehicleDetails : '',
      hasProperty,
      propertyDetails: hasProperty === 'Sim' ? propertyDetails : '',
      otherAssets: otherAssets || 'Nenhum',
    });
  };

  const isValid =
    hasVehicle &&
    (hasVehicle === 'Não' || vehicleDetails) &&
    hasProperty &&
    (hasProperty === 'Não' || propertyDetails);

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
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-3">
                Qual modelo e valor estimado atual?
              </label>
              <input
                type="text"
                value={vehicleDetails}
                onChange={(e) => setVehicleDetails(e.target.value)}
                placeholder="Ex: Honda Civic 2018, R$ 80.000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
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
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-3">
                Descreva tipo(s) e valor estimado
              </label>
              <textarea
                value={propertyDetails}
                onChange={(e) => setPropertyDetails(e.target.value)}
                rows={3}
                placeholder="Ex: Apartamento em São Paulo, R$ 500.000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
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
