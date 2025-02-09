'use client';

import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { redirect, useParams } from 'next/navigation';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import InvoiceForm from '~/components/invoices/InvoiceForm';
import { InvoiceFormData, InvoiceStatus } from '~/lib/types/invoice';
import { useInvoices } from '~/hooks/useInvoices';

export default function EditInvoice() {
  const params = useParams<{ id: string }>();
  const { invoices, getInvoiceById, fetchInvoices, updateInvoice } =
    useInvoices();

  const fetchedRef = useRef(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [invoice, setInvoice] = useState<InvoiceFormData>({
    name: '',
    number: '',
    dueDate: null,
    amount: 0,
    status: InvoiceStatus.PAID,
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

    setInvoice({
      name: invoice.name,
      number: invoice.number,
      dueDate: dayjs(invoice.dueDate),
      amount: invoice.amount,
      status: invoice.status,
    });
  }, [invoices]);

  useEffect(() => {
    if (!fetchedRef.current) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setIsInitialized(true);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [invoice]);

  const handleUpdate = (invoice: Partial<InvoiceFormData>) => {
    if (!isInitialized) {
      return;
    }

    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      ...invoice,
    }));
  };

  const clearForm = () => {
    setInvoice({
      name: '',
      number: '',
      dueDate: null,
      amount: 0,
      status: InvoiceStatus.PAID,
    });
  };

  const handleSave = (invoice: InvoiceFormData) => {
    updateInvoice(params.id, {
      name: invoice.name,
      number: invoice.number,
      amount: invoice.amount,
      status: invoice.status!,
      dueDate: invoice.dueDate!.format('YYYY-MM-DD'),
    });

    clearForm();
  };

  return (
    <Stack gap={4}>
      <Typography variant="h4" component="h1">
        Edit Invoice
      </Typography>
      {isInitialized && (
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
              invoice={invoice}
              submitText="Save Invoice"
              onUpdate={handleUpdate}
              onSave={handleSave}
            />
          </Box>
        </Paper>
      )}
    </Stack>
  );
}
