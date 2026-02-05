import React, { useState, useEffect } from 'react';
import { FormData } from '../types/form';
import QuestionNumber from './QuestionNumber';
import { ChevronDown, User, Loader } from 'lucide-react';

interface ConsultorFormProps {
  formData: FormData;
  onNext: (data: Partial<FormData>) => void;
  questionNumber: number;
  totalQuestions: number;
}

interface Consultor {
  id: string;
  name: string;
}

const ConsultorForm: React.FC<ConsultorFormProps> = ({ formData, onNext, questionNumber, totalQuestions }) => {
  const [consultores, setConsultores] = useState<Consultor[]>([]);
  const [selectedConsultor, setSelectedConsultor] = useState(formData.consultorId || '');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const DEFAULT_CONSULTOR_ID = '4341233c-ac93-476c-9842-a1855691c00b';

  useEffect(() => {
    const fetchConsultores = async () => {
      try {
        const response = await fetch('https://n8nsemfila.iatom.site/webhook/getConsultores');

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setConsultores(data);
          setLoading(false);
        } else {
          onNext({ consultorId: DEFAULT_CONSULTOR_ID });
        }
      } catch (err) {
        onNext({ consultorId: DEFAULT_CONSULTOR_ID });
      }
    };

    fetchConsultores();
  }, [onNext]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedConsultor) {
      setError('Por favor, selecione um consultor');
      return;
    }

    onNext({ consultorId: selectedConsultor });
  };

  const selectedConsultorName = consultores.find(c => c.id === selectedConsultor)?.name || 'Selecione um consultor';

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-slate-600 text-lg">Carregando consultores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <QuestionNumber current={questionNumber} total={totalQuestions} />

          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            Selecione o seu consultor
          </h2>

          <p className="text-slate-600 mb-8">
            Escolha o consultor que irá acompanhá-lo nesta jornada financeira.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6 relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-6 py-4 text-lg border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-between ${
                  error && !selectedConsultor
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500'
                } ${!selectedConsultor ? 'text-slate-400' : 'text-slate-800'}`}
              >
                <span className="flex items-center gap-3">
                  <User className="w-5 h-5" />
                  {selectedConsultorName}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isOpen ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="max-h-64 overflow-y-auto">
                    {consultores.map((consultor) => (
                      <button
                        key={consultor.id}
                        type="button"
                        onClick={() => {
                          setSelectedConsultor(consultor.id);
                          setIsOpen(false);
                          setError('');
                        }}
                        className={`w-full px-6 py-4 text-left hover:bg-blue-50 transition-colors duration-150 flex items-center gap-3 ${
                          selectedConsultor === consultor.id
                            ? 'bg-blue-100 text-blue-900 font-medium'
                            : 'text-slate-700'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                          selectedConsultor === consultor.id
                            ? 'bg-blue-600'
                            : 'bg-slate-400'
                        }`}>
                          {consultor.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-lg">{consultor.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {error && !selectedConsultor && (
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

export default ConsultorForm;
