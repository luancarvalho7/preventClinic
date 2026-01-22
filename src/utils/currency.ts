// utils/currency.ts

/** Extrai apenas dígitos e retorna o valor em CENTAVOS */
export const toCents = (input: unknown): number => {
  if (typeof input === 'number' && Number.isFinite(input)) {
    return Math.round(input);
  }
  const digits = String(input ?? '').replace(/\D/g, '');
  return digits ? Number(digits) : 0;
};

/** Formata BRL a partir de centavos; exibe "R$ x.xxx,yy" */
export const formatCurrency = (value: number | string): string => {
  const cents = typeof value === 'number' ? value : toCents(value);
  return (cents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

/** Converte uma string "R$ 1.234,56" ou "123456" para CENTAVOS (number) */
export const parseCurrency = (value: string | number): number => {
  return typeof value === 'number' ? Math.round(value) : toCents(value);
};

/**
 * Handler especializado para input de moeda que evita bugs de acumulação de dígitos.
 * Mantém o estado interno de centavos separado da string formatada exibida.
 *
 * @param inputValue - Valor do input (pode conter formatação)
 * @param previousCents - Valor anterior em centavos
 * @returns Novo valor em centavos
 */
export const handleCurrencyInput = (inputValue: string, previousCents: number): number => {
  const cleanedDigits = inputValue.replace(/\D/g, '');

  if (cleanedDigits === '') {
    return 0;
  }

  return Number(cleanedDigits) * 100;
};

/**
 * Formata valor em centavos para exibição no input.
 */
export const formatCurrencyInput = (cents: number): string => {
  return (cents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
