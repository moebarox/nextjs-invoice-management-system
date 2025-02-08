'use client';

import { useEffect, useRef, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InvoiceForm from '~/components/invoices/InvoiceForm';
import { InvoiceFormData, InvoiceStatus } from '~/lib/types/invoice';
import { useInvoices } from '~/hooks/useInvoices';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { redirect } from 'next/navigation';
import dayjs from 'dayjs';

export default function EditInvoice({
  params,
}: Readonly<{ params: { id: string } }>) {
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
    console.log(invoice);

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

    // TODO: fix clear form
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
          <Box
            sx={{
              p: '26px',
            }}
          >
            <InvoiceForm
              invoice={invoice}
              onUpdate={handleUpdate}
              onSave={handleSave}
            />
          </Box>
        </Paper>
      )}
    </Stack>
  );
}
