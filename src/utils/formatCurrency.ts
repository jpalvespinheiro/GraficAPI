export const formatCurrency = (value: number, options?: { decimalPlaces?: number }): string => {
  // Validação do valor
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error('O valor deve ser um número válido');
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: options?.decimalPlaces ?? 2,
    maximumFractionDigits: options?.decimalPlaces ?? 2,
  }).format(value);
};
