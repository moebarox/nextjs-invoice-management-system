import { z } from 'zod';
import { invoiceSchema } from '~/lib/schemas/invoice';

export enum InvoiceStatus {
  PAID = 'paid',
  UNPAID = 'unpaid',
  PENDING = 'pending',
}

export interface Invoice {
  id: string;
  name: string;
  number: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
}

export type InvoiceFormData = z.infer<typeof invoiceSchema>;
