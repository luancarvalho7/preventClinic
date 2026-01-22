import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

export default function ProfessionForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [currentProfession, setCurrentProfession] = useState(formData?.currentProfession || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProfession) {
      onContinue({ currentProfession });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pt-20">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Profissão atual
            </label>
            <input
              type="text"
              value={currentProfession}
              onChange={(e) => setCurrentProfession(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Ex: Contador, Professor, Autônomo..."
              required
            />
          </div>

          <div className="pb-16">
            <button
              type="submit"
              disabled={!currentProfession}
              className={`w-full max-w-[576px] mx-auto text-white py-3 px-6 rounded-full font-medium transition-colors ${
                currentProfession
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
