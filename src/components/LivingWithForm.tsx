import React, { useState } from 'react';
import { FormStepProps } from '../types/form';

export default function LivingWithForm({ onContinue, formData }: FormStepProps) {
  const [livingWith, setLivingWith] = useState(formData?.livingWith || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (livingWith) {
      onContinue({ livingWith });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Com quem você vive atualmente?
            </label>
            <input
              type="text"
              value={livingWith}
              onChange={(e) => setLivingWith(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Ex: Sozinho(a), com família, com cônjuge..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={!livingWith}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
