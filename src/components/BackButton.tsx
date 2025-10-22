import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  show: boolean;
}

export default function BackButton({ onClick, show }: BackButtonProps) {
  if (!show) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed top-8 left-6 p-3 bg-white border-2 border-slate-200 rounded-lg hover:border-slate-900 hover:bg-slate-50 transition-all duration-200 z-10 shadow-sm"
      aria-label="Voltar"
    >
      <ChevronLeft className="w-6 h-6 text-slate-900" />
    </button>
  );
}
