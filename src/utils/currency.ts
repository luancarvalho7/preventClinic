// utils/currency.ts

/** Extrai apenas dígitos e retorna o valor em CENTAVOS */
export const toCents = (input: unknown): number => {
  if (typeof input === 'number' && Number.isFinite(input)) {
    // Assuma que já está em centavos
    return Math.round(input);
  }
  const digits = String(input ?? '').replace(/\D/g, '');
  return digits ? Number(digits) : 0;
};

/** Formata BRL a partir de centavos (ou string qualquer); exibe "R$ x.xxx,yy" */
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
 * Máscara para input de moeda.
 * Entrada livre -> saída já formatada "R$ x.xxx,yy".
 * Use no onChange: setDisplay(formatCurrencyInput(e.target.value)); setCents(parseCurrency(e.target.value));
 */
export const formatCurrencyInput = (raw: string): string => {
  const cents = toCents(raw);
  return (cents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
