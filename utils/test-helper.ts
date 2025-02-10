import { Invoice, InvoiceStatus } from '~/lib/types/invoice';
import { generateInvoiceNumber } from './invoice';

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateInvoice(override?: Partial<Invoice>): Invoice {
  return {
    id: Math.random().toString(36).slice(2, 9),
    name: 'John Doe',
    number: generateInvoiceNumber(String(randomBetween(0, 999))),
    dueDate: new Date(
      new Date().getTime() + Math.random() * (30 * 24 * 60 * 60 * 1000)
    )
      .toISOString()
      .split('T')[0],
    amount: randomBetween(10_000, 900_000),
    status: [InvoiceStatus.PAID, InvoiceStatus.UNPAID, InvoiceStatus.PENDING][
      Math.floor(Math.random() * 3)
    ],
    ...override,
  };
}
