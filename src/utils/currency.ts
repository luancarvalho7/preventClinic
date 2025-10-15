export const formatCurrency = (value: string): string => {
  const numbers = value.replace(/\D/g, '');

  if (!numbers) return '';

  const cents = numbers.slice(-2).padStart(2, '0');
  const reais = numbers.slice(0, -2) || '0';

  const formattedReais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `R$ ${formattedReais},${cents}`;
};

export const parseCurrency = (value: string): string => {
  return value.replace(/\D/g, '');
};

export const formatCurrencyInput = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  return numbers;
};
