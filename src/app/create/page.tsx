'use client';

import { useEffect, useRef, useState } from 'react';
import { Stack, Typography, Paper, Box, Divider } from '@mui/material';
import InvoiceForm from '~/components/invoices/InvoiceForm';
import { InvoiceFormData, InvoiceStatus } from '~/lib/types/invoice';
import { useInvoices } from '~/hooks/useInvoices';
import { generateInvoiceNumber } from '~/utils/invoice';

export default function CreateInvoice() {
  const {
    invoices,
    getInvoiceFormData,
    saveInvoiceFormData,
    deleteInvoiceFormData,
    fetchInvoices,
    addInvoice,
  } = useInvoices();

  // Flag to track if invoices have been fetched
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

    // Generate a new invoice number
    const invoiceNumber = generateInvoiceNumber(invoices[0]?.number || '');

    // Get invoice form data from local storage
    const invoiceFormData = getInvoiceFormData();

    // Initialize the invoice form
    setInvoice({
      name: invoiceFormData?.name || '',
      number: invoiceFormData?.number || invoiceNumber,
      dueDate: invoiceFormData?.dueDate || null,
      amount: invoiceFormData?.amount || '',
      status: invoiceFormData?.status || InvoiceStatus.PAID,
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

    setInvoice((prevInvoice) => {
      const updatedInvoice = {
        ...prevInvoice,
        ...invoice,
      };

      // Save invoice form data to local storage
      saveInvoiceFormData({
        name: updatedInvoice.name,
        number: updatedInvoice.number,
        amount: updatedInvoice.amount,
        status: updatedInvoice.status,
        dueDate: updatedInvoice.dueDate || null,
      });

      return updatedInvoice;
    });
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
    addInvoice({
      name: invoice.name,
      number: invoice.number,
      amount: invoice.amount,
      status: invoice.status!,
      dueDate: invoice.dueDate!.format('YYYY-MM-DD'),
    });
    deleteInvoiceFormData();

    clearForm();
  };

  return (
    <Stack gap="38px">
      <Typography variant="h4" component="h1">
        Add Invoice
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
