import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';

export default function MaritalStatusForm({ onContinue, formData, questionNumber }: FormStepProps) {
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
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <button
            type="submit"
            disabled={!maritalStatus}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
