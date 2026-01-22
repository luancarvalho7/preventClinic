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
      className="fixed top-6 left-6 p-2 hover:opacity-60 transition-opacity duration-200 z-50"
      aria-label="Voltar"
    >
      <ChevronLeft className="w-7 h-7 text-slate-900" />
    </button>
  );
}
