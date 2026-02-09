import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from './PageHeader';
import { FormStepProps } from '../types/form';
import BackButton from './BackButton';
import { AlertCircle, Loader } from 'lucide-react';

export default function EmailForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [email, setEmail] = useState(formData.email || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // Lê ?email= da URL (client-side) e pré-preenche se for válido
  const emailFromUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const qs = new URLSearchParams(window.location.search);
    return (qs.get('email') || '').trim();
  }, []);

  useEffect(() => {
    if (!formData.email && emailFromUrl && validateEmail(emailFromUrl)) {
      setEmail(emailFromUrl);
    }
  }, [emailFromUrl, formData.email]);

  const isValid = email.trim() && validateEmail(email.trim());

  const checkEmailExists = async (emailToCheck: string): Promise<boolean> => {
    try {
      const response = await fetch('https://n8nsemfila.iatom.site/webhook/formCheckEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailToCheck })
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      return data.existentEmail === true;
    } catch (err) {
      console.error('Error checking email:', err);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const val = email.trim();
    if (!val) {
      setError('Por favor, digite seu e-mail');
      return;
    }
    if (!validateEmail(val)) {
      setError('Por favor, digite um e-mail válido');
      return;
    }

    setLoading(true);
    setError('');

    const emailExists = await checkEmailExists(val);
    setLoading(false);

    if (emailExists) {
      setShowWarning(true);
    } else {
      onContinue({ email: val });
    }
  };

  const handleContinueWithExistingEmail = () => {
    setShowWarning(false);
    onContinue({ email: email.trim() });
  };

  const handleChangeEmail = () => {
    setShowWarning(false);
  };

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
            Qual é o seu e-mail?
          </h1>

          <form id="email-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-slate-900 mb-3">
                Digite seu e-mail:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-slate-900 focus:outline-none transition-colors text-lg"
                placeholder="seu@email.com"
                autoComplete="email"
                inputMode="email"
                disabled={loading}
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

          </form>
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-16 bg-gradient-to-t from-slate-50 to-transparent">
          <div className="w-full max-w-[576px] mx-auto">
            <button
              type="submit"
              form="email-form"
              disabled={!isValid || loading}
              className={`w-full py-4 text-white rounded-full transition-colors duration-200 font-medium text-lg shadow-md flex items-center justify-center gap-2 ${
                isValid && !loading
                  ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg cursor-pointer'
                  : 'bg-black cursor-not-allowed'
              }`}
            >
              {loading && <Loader className="w-5 h-5 animate-spin" />}
              Continuar
            </button>
          </div>
        </div>
      </div>

      {showWarning && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  E-mail já cadastrado
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  Esse e-mail já está cadastrado em nossa base, deseja seguir e fazer novo raio X?
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleContinueWithExistingEmail}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium text-base hover:bg-blue-700 transition-colors"
              >
                Sim
              </button>
              <button
                onClick={handleChangeEmail}
                className="w-full py-3 bg-slate-100 text-slate-900 rounded-lg font-medium text-base hover:bg-slate-200 transition-colors"
              >
                Não, quero alterar meu e-mail
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
