import React, { useState, useEffect } from 'react';
import PageHeader from './PageHeader';
import { FormStepProps } from '../types/form';
import BackButton from './BackButton';
import { ChevronDown, User, Loader } from 'lucide-react';

interface Consultor {
  id: string;
  name: string;
}

export default function ConsultorForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [consultores, setConsultores] = useState<Consultor[]>([]);
  const [selectedConsultor, setSelectedConsultor] = useState(formData?.consultorId || '');
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

        // Parse the response structure: { response: [...] }
        if (data.response && Array.isArray(data.response)) {
          const consultoresList = data.response;
          if (consultoresList.length > 0) {
            setConsultores(consultoresList);
            setLoading(false);
          } else {
            onContinue({ consultorId: DEFAULT_CONSULTOR_ID });
          }
        } else {
          onContinue({ consultorId: DEFAULT_CONSULTOR_ID });
        }
      } catch (err) {
        onContinue({ consultorId: DEFAULT_CONSULTOR_ID });
      }
    };

    fetchConsultores();
  }, [onContinue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedConsultor) {
      setError('Por favor, selecione um consultor');
      return;
    }

    onContinue({ consultorId: selectedConsultor });
  };

  const selectedConsultorName = consultores.find(c => c.id === selectedConsultor)?.name || 'Selecione um consultor';
  const isValid = !!selectedConsultor;

  if (loading) {
    return (
      <>
        <PageHeader />
        <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
          <div className="flex flex-col items-center gap-4">
            <Loader className="w-12 h-12 text-blue-600 animate-spin" />
            <p className="text-slate-600 text-lg">Carregando consultores...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader />
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter px-6 py-8 pt-20">
        <div className="w-full max-w-2xl mx-auto">
          {questionNumber && (
            <div className="text-sm font-medium text-slate-500 mb-2">
              Pergunta {questionNumber}
            </div>
          )}
          <h1 className="text-2xl md:text-3xl font-funnel font-bold text-slate-900 mb-6">
            Selecione o seu consultor
          </h1>

          <form id="consultor-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="consultor" className="block text-lg font-medium text-slate-900 mb-3">
                Escolha o consultor que irá acompanhá-lo:
              </label>
              <div className="relative">
                <button
                  type="button"
                  id="consultor"
                  onClick={() => setIsOpen(!isOpen)}
                  className={`w-full px-4 py-3 text-lg border-2 rounded-lg transition-colors focus:outline-none flex items-center justify-between ${
                    !selectedConsultor ? 'text-slate-400' : 'text-slate-900'
                  } border-slate-200 focus:border-slate-900`}
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
                  <div className="absolute z-10 w-full mt-2 bg-white border-2 border-slate-200 rounded-lg shadow-2xl overflow-hidden">
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
                          className={`w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors duration-150 flex items-center gap-3 ${
                            selectedConsultor === consultor.id
                              ? 'bg-slate-100 font-medium'
                              : ''
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                            selectedConsultor === consultor.id
                              ? 'bg-slate-900'
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
              </div>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

          </form>
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-16 bg-gradient-to-t from-slate-50 to-transparent">
          <div className="w-full max-w-[576px] mx-auto">
            <button
              type="submit"
              form="consultor-form"
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
    </>
  );
}
