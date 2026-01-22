import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

interface DateParts {
  day: string;
  month: string;
  year: string;
}

export default function BirthDateForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const parseFormattedDate = (dateStr: string): DateParts => {
    const parts = dateStr.split(' ');
    if (parts.length === 3) {
      const monthIndex = months.findIndex(m => m.toLowerCase() === parts[1].toLowerCase());
      return {
        day: parts[0],
        month: monthIndex >= 0 ? (monthIndex + 1).toString() : '',
        year: parts[2]
      };
    }
    return { day: '', month: '', year: '' };
  };

  const [date, setDate] = useState<DateParts>(
    formData?.birthDate ? parseFormattedDate(formData.birthDate) : { day: '', month: '', year: '' }
  );
  const [error, setError] = useState('');

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month, 0).getDate();
  };

  const validateDate = (): boolean => {
    const day = parseInt(date.day);
    const month = parseInt(date.month);
    const year = parseInt(date.year);

    if (!date.day || !date.month || !date.year) return false;
    if (isNaN(day) || isNaN(month) || isNaN(year)) return false;

    if (month < 1 || month > 12) return false;
    if (year < 1900 || year > new Date().getFullYear()) return false;

    const daysInMonth = getDaysInMonth(month, year);
    if (day < 1 || day > daysInMonth) return false;

    return true;
  };

  const handleDateChange = (field: keyof DateParts, value: string) => {
    const newDate = { ...date, [field]: value };
    setDate(newDate);

    const day = parseInt(newDate.day);
    const month = parseInt(newDate.month);
    const year = parseInt(newDate.year);

    if (field === 'day' && value) {
      if (day < 1 || day > 31) {
        setError('Dia deve estar entre 1 e 31');
        return;
      }
    }

    if (field === 'year' && value) {
      if (year < 1900 || year > new Date().getFullYear()) {
        setError('Ano deve estar entre 1900 e ' + new Date().getFullYear());
        return;
      }
    }

    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDate()) {
      const monthName = months[parseInt(date.month) - 1];
      const formattedDate = `${date.day} ${monthName} ${date.year}`;
      onContinue({ birthDate: formattedDate });
    } else {
      setError('Por favor, preencha todos os campos corretamente');
    }
  };

  const isValid = validateDate();

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
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Digite sua data de nascimento
            </label>
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dia
                </label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={date.day}
                  onChange={(e) => handleDateChange('day', e.target.value)}
                  placeholder="DD"
                  className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:border-transparent text-center text-lg font-medium ${
                    error
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mês
                </label>
                <select
                  value={date.month}
                  onChange={(e) => handleDateChange('month', e.target.value)}
                  className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:border-transparent text-lg font-medium appearance-none bg-white cursor-pointer ${
                    error
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                >
                  <option value="">Mês</option>
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ano
                </label>
                <input
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={date.year}
                  onChange={(e) => handleDateChange('year', e.target.value)}
                  placeholder="YYYY"
                  className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:border-transparent text-center text-lg font-medium ${
                    error
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
              </div>
            </div>
            {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
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
