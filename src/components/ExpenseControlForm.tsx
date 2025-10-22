import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

export default function ExpenseControlForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [hasExpenseControl, setHasExpenseControl] = useState(formData?.hasExpenseControl || '');
  const [updateFrequency, setUpdateFrequency] = useState(formData?.updateFrequency || '');

  const controlOptions = ['Planilha', 'Aplicativo', 'Caderno', 'Mental', 'Nenhum'];

  const frequencyOptions = [
    'Diariamente',
    'Semanalmente',
    'Mensalmente',
    'Apenas quando estou apertado(a)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (hasExpenseControl === 'Nenhum') {
      onContinue({ hasExpenseControl, updateFrequency: '' });
      return;
    }

    if (hasExpenseControl && updateFrequency) {
      onContinue({ hasExpenseControl, updateFrequency });
    }
  };

  const isValid =
    hasExpenseControl === 'Nenhum' ||
    (hasExpenseControl && updateFrequency);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Seção 3 – Gastos
          </h2>
          <p className="text-gray-600">
            Aqui o foco é entender o seu fluxo de gastos e como você lida com sobras ou apertos no fim do mês.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pergunta principal */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Você possui algum tipo de controle de gastos?
            </label>
            <div className="space-y-3">
              {controlOptions.map((option) => (
                <label
                  key={option}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    hasExpenseControl === option
                      ? 'border-accent bg-slate-900/10'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="hasExpenseControl"
                    value={option}
                    checked={hasExpenseControl === option}
                    onChange={(e) => {
                      setHasExpenseControl(e.target.value);
                      if (e.target.value === 'Nenhum') {
                        setUpdateFrequency('');
                      }
                    }}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="ml-3 text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Pergunta condicional */}
          {hasExpenseControl && hasExpenseControl !== 'Nenhum' && (
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                Com que frequência você atualiza esse controle?
              </label>
              <div className="space-y-3">
                {frequencyOptions.map((option) => (
                  <label
                    key={option}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      updateFrequency === option
                        ? 'border-accent bg-slate-900/10'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="updateFrequency"
                      value={option}
                      checked={updateFrequency === option}
                      onChange={(e) => setUpdateFrequency(e.target.value)}
                      className="w-4 h-4 text-accent focus:ring-accent"
                    />
                    <span className="ml-3 text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-slate-900 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
