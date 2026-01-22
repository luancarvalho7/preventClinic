import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function BirthDateForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [birthDate, setBirthDate] = useState(formData?.birthDate || '');
  const [error, setError] = useState('');

  const validateDate = (date: string): boolean => {
    const parts = date.split(' ');
    if (parts.length !== 3) return false;

    const day = parseInt(parts[0]);
    const monthName = parts[1];
    const year = parseInt(parts[2]);

    const monthIndex = months.findIndex(m => m.toLowerCase() === monthName.toLowerCase());
    if (monthIndex === -1) return false;

    if (day < 1 || day > 31) return false;
    if (year < 1900 || year > new Date().getFullYear()) return false;

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBirthDate(value);
    if (value && !validateDate(value)) {
      setError('Use o formato: DD Mês YYYY (ex: 15 Janeiro 1990)');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthDate && validateDate(birthDate)) {
      onContinue({ birthDate });
    }
  };

  const isValid = birthDate && validateDate(birthDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter px-6 py-8">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="w-full max-w-2xl mx-auto">
        <QuestionNumber number={questionNumber} />
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-funnel font-bold text-slate-900 mb-2">
            Data de nascimento
          </h1>
          <p className="text-gray-600">
            Para entender melhor seu contexto de vida
          </p>
        </div>

        <form id="birth-date-form" onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Digite sua data de nascimento
            </label>
            <input
              type="text"
              value={birthDate}
              onChange={handleChange}
              placeholder="DD Mês YYYY (ex: 15 Janeiro 1990)"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent text-lg ${
                error
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>
        </form>
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-16 bg-gradient-to-t from-slate-50 to-transparent">
        <div className="w-full max-w-[576px] mx-auto">
          <button
            form="birth-date-form"
            type="submit"
            disabled={!isValid}
            className={`w-full py-4 text-white rounded-full transition-colors duration-200 font-medium text-lg shadow-md ${
              isValid
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
