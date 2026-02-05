import React, { useState } from 'react';
import { FormData } from '../types/form';
import QuestionNumber from './QuestionNumber';

interface NameFormProps {
  formData: FormData;
  onNext: (data: Partial<FormData>) => void;
  questionNumber: number;
  totalQuestions: number;
}

const NameForm: React.FC<NameFormProps> = ({ formData, onNext, questionNumber, totalQuestions }) => {
  const [name, setName] = useState(formData.name || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Por favor, digite seu nome');
      return;
    }

    if (name.trim().length < 2) {
      setError('Nome muito curto');
      return;
    }

    onNext({ name: name.trim() });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <QuestionNumber current={questionNumber} total={totalQuestions} />

          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            Qual é o seu nome?
          </h2>

          <p className="text-slate-600 mb-8">
            Queremos conhecê-lo melhor para personalizar sua experiência.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="Digite seu nome completo"
                className={`w-full px-6 py-4 text-lg border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  error
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500'
                }`}
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span>⚠</span> {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Continuar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NameForm;
