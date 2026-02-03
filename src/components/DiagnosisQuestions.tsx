import React, { useState } from 'react';
import PageHeader from './PageHeader';
import BackButton from './BackButton';
import { FormStepProps } from '../types/form';

const questions = [
  "Você sabe quanto sobra no fim do mês?",
  "Você tem reserva de emergência para 3 meses?",
  "Você guarda ou investe dinheiro todo mês?"
];

export default function DiagnosisQuestions({ onContinue, onBack, canGoBack }: FormStepProps) {
  const [answers, setAnswers] = useState<(boolean | null)[]>([null, null, null]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => {
        const yesCount = newAnswers.filter(a => a === true).length;
        onContinue({
          diagnosisAnswers: newAnswers,
          diagnosisYesCount: yesCount
        });
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <>
      <PageHeader />
      <BackButton onClick={handleBack} show={canGoBack || currentQuestion > 0} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter px-6 py-8 pt-20">
        <div className="w-full max-w-2xl mx-auto">
          <div className="text-sm font-medium text-slate-500 mb-2">
            Pergunta {currentQuestion + 1} de {questions.length}
          </div>

          <div className="mb-8">
            <div className="flex gap-1 mb-8">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    index <= currentQuestion ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-funnel font-bold text-slate-900 mb-12 leading-tight">
            {questions[currentQuestion]}
          </h1>

          <div className="space-y-4">
            <button
              onClick={() => handleAnswer(true)}
              className={`w-full py-5 px-6 border-2 rounded-2xl transition-all duration-200 font-medium text-lg ${
                answers[currentQuestion] === true
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300'
              }`}
            >
              Sim
            </button>

            <button
              onClick={() => handleAnswer(false)}
              className={`w-full py-5 px-6 border-2 rounded-2xl transition-all duration-200 font-medium text-lg ${
                answers[currentQuestion] === false
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300'
              }`}
            >
              Não
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
