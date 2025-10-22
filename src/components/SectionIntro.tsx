import React from 'react';
import { FormStepProps } from '../types/form';

interface SectionIntroProps extends FormStepProps {
  sectionNumber: number;
  title: string;
  description: string;
}

export default function SectionIntro({ sectionNumber, title, description, onContinue }: SectionIntroProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex flex-col items-center justify-center font-sans px-6 py-12">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6 text-center">
            Seção {sectionNumber} – {title}
          </h2>

          <p className="text-lg text-slate-700 mb-8 leading-relaxed text-center">
            {description}
          </p>

          <button
            onClick={() => onContinue({})}
            className="w-full py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200 font-medium text-lg shadow-md hover:shadow-lg"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
