import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

export default function MaritalStatusForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [maritalStatus, setMaritalStatus] = useState(formData?.maritalStatus || '');

  const options = [
    'Solteiro(a)',
    'Casado(a)',
    'União estável',
    'Divorciado(a)',
    'Viúvo(a)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (maritalStatus) {
      onContinue({ maritalStatus });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter px-6 py-8 pt-20">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="w-full max-w-2xl mx-auto">
        <QuestionNumber number={questionNumber} />
        <form id="marital-status-form" onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Estado civil
            </label>
            <div className="space-y-3">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="maritalStatus"
                    value={option}
                    checked={maritalStatus === option}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="ml-3 text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </form>
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-16 bg-gradient-to-t from-slate-50 to-transparent">
        <div className="w-full max-w-[576px] mx-auto">
          <button
            form="marital-status-form"
            type="submit"
            disabled={!maritalStatus}
            className={`w-full py-4 text-white rounded-full transition-colors duration-200 font-medium text-lg shadow-md ${
              maritalStatus
                ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg cursor-pointer'
                : 'bg-black cursor-not-allowed'
            }`}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
