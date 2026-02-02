export function formatCurrency(value: number, currency: string = 'USD', locale: string = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercentage(value: number, fractionDigits: number = 0) {
  return `${value.toFixed(fractionDigits)}%`;
}
