import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from './PageHeader';
import { FormStepProps } from '../types/form';
import BackButton from './BackButton';
import { AlertCircle, Loader } from 'lucide-react';

export default function ContactInfoForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [name, setName] = useState(formData?.name || '');
  const [email, setEmail] = useState(formData.email || '');
  const [phone, setPhone] = useState(formData.phone || '');
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const validatePhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.length === 11;
  };

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

  const isNameValid = name.trim().length >= 2;
  const isEmailValid = email.trim() && validateEmail(email.trim());
  const isPhoneValid = phone.trim() && validatePhone(phone.trim());
  const isFormValid = isNameValid && isEmailValid && isPhoneValid;

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

    const newErrors: { name?: string; email?: string; phone?: string } = {};

    const nameVal = name.trim();
    if (!nameVal) {
      newErrors.name = 'Por favor, digite seu nome';
    } else if (nameVal.length < 2) {
      newErrors.name = 'Nome muito curto';
    }

    const emailVal = email.trim();
    if (!emailVal) {
      newErrors.email = 'Por favor, digite seu e-mail';
    } else if (!validateEmail(emailVal)) {
      newErrors.email = 'Por favor, digite um e-mail válido';
    }

    const phoneVal = phone.trim();
    if (!phoneVal) {
      newErrors.phone = 'Por favor, digite seu número de contato';
    } else if (!validatePhone(phoneVal)) {
      newErrors.phone = 'Por favor, digite um número válido com DDD (11 dígitos)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    const emailExists = await checkEmailExists(emailVal);
    setLoading(false);

    if (emailExists) {
      setShowWarning(true);
    } else {
      onContinue({ name: nameVal, email: emailVal, phone: phoneVal });
    }
  };

  const handleContinueWithExistingEmail = () => {
    setShowWarning(false);
    onContinue({ name: name.trim(), email: email.trim(), phone: phone.trim() });
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
            Vamos começar com suas informações de contato
          </h1>

          <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-slate-900 mb-3">
                Nome completo:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                }}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-slate-900 focus:outline-none transition-colors text-lg"
                placeholder="João Silva"
                autoComplete="name"
                disabled={loading}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium text-slate-900 mb-3">
                E-mail:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                }}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-slate-900 focus:outline-none transition-colors text-lg"
                placeholder="seu@email.com"
                autoComplete="email"
                inputMode="email"
                disabled={loading}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-slate-900 mb-3">
                Telefone com DDD:
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  setPhone(formatted);
                  if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                }}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-slate-900 focus:outline-none transition-colors text-lg"
                placeholder="(11) 99999-9999"
                autoComplete="tel"
                inputMode="tel"
                maxLength={15}
                disabled={loading}
              />
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
            </div>
          </form>
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-16 bg-gradient-to-t from-slate-50 to-transparent">
          <div className="w-full max-w-[576px] mx-auto">
            <button
              type="submit"
              form="contact-form"
              disabled={!isFormValid || loading}
              className={`w-full py-4 text-white rounded-full transition-colors duration-200 font-medium text-lg shadow-md flex items-center justify-center gap-2 ${
                isFormValid && !loading
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
