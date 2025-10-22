import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';

export default function ProfessionForm({ onContinue, formData, questionNumber }: FormStepProps) {
  const [currentProfession, setCurrentProfession] = useState(formData?.currentProfession || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProfession) {
      onContinue({ currentProfession });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
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

          <button
            type="submit"
            disabled={!currentProfession}
            className="w-full bg-slate-900 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
