import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

export default function WorkRegimeForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [workRegime, setWorkRegime] = useState(formData?.workRegime || '');

  const options = [
    'CLT',
    'PJ',
    'Autônomo',
    'Empresário',
    'Outros'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (workRegime) {
      onContinue({ workRegime });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pt-20">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Regime de trabalho
            </label>
            <div className="space-y-3">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="workRegime"
                    value={option}
                    checked={workRegime === option}
                    onChange={(e) => setWorkRegime(e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-600"
                  />
                  <span className="ml-3 text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pb-16">
            <button
              type="submit"
              disabled={!workRegime}
              className={`w-full max-w-[576px] mx-auto text-white py-3 px-6 rounded-full font-medium transition-colors ${
                workRegime
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
