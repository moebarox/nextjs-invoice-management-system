export function formatCurrency(num: number) {
  return Number(num).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });
}
