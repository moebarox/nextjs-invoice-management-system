export function generateInvoiceNumber(lastInvoiceNumber: string) {
  const lastIncrement = Number(lastInvoiceNumber.slice(-3) || 0);
  const increment = `00${lastIncrement + 1}`.slice(-3);
  return `INV${new Date().toISOString().split('T')[0].replaceAll('-', '')}${increment}`;
}
