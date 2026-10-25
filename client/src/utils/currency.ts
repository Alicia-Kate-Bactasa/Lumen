export const CURRENCY_SYMBOL = '₱'

export function formatPrice(amount: number): string {
  return `${CURRENCY_SYMBOL}${amount.toFixed(2)}`
}
