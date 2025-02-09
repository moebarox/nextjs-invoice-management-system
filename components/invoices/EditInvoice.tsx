'use client';

import { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { redirect, useRouter, useParams } from 'next/navigation';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import InvoiceForm from '~/components/invoices/InvoiceForm';
import { InvoiceFormData, InvoiceStatus } from '~/lib/types/invoice';
import { useInvoices } from '~/hooks/useInvoices';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { invoiceSchema } from '~/lib/schemas/invoice';

export default function EditInvoice() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { invoices, getInvoiceById, fetchInvoices, updateInvoice } =
    useInvoices();

  const fetchedRef = useRef(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      name: '',
      number: '',
      dueDate: null,
      amount: 0,
      status: InvoiceStatus.PAID,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchInvoices().then(() => (fetchedRef.current = true));
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!fetchedRef.current) {
      return;
    }

    const invoice = getInvoiceById(params.id);

    if (!invoice) {
      redirect('/');
    }

    reset({
      name: invoice.name,
      number: invoice.number,
      dueDate: dayjs(invoice.dueDate),
      amount: invoice.amount,
      status: invoice.status,
    });
  }, [invoices]);

  const handleSave = (invoice: InvoiceFormData) => {
    updateInvoice(params.id, {
      name: invoice.name,
      number: invoice.number,
      amount: invoice.amount,
      status: invoice.status!,
      dueDate: invoice.dueDate!.format('YYYY-MM-DD'),
    });

    router.push('/');
  };

  return (
    <Stack gap={4}>
      <Typography variant="h4" component="h1">
        Edit Invoice
      </Typography>
      <Paper>
        <Box
          sx={{
            py: '15px',
            px: '26px',
          }}
        >
          <Typography variant="h5" component="h2">
            Invoice Form
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: '26px' }}>
          <InvoiceForm
            control={control}
            errors={errors}
            onSubmit={handleSubmit(handleSave)}
            submitText="Save Invoice"
          />
        </Box>
      </Paper>
    </Stack>
  );
}
