import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';
import { InvoiceStatus } from '~/lib/types/invoice';

export const invoiceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  number: z.string(),
  amount: z.coerce.number().positive('Amount must be greater than 0'),
  dueDate: z.custom<Dayjs>((val) => dayjs.isDayjs(val) && val.isValid(), {
    message: 'Invalid or missing date',
  }),
  status: z.enum([
    InvoiceStatus.PAID,
    InvoiceStatus.UNPAID,
    InvoiceStatus.PENDING,
  ]),
});
