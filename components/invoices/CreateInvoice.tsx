'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography, Paper, Box, Divider } from '@mui/material';
import InvoiceForm from '~/components/invoices/InvoiceForm';
import { InvoiceFormData, InvoiceStatus } from '~/lib/types/invoice';
import { useInvoices } from '~/hooks/useInvoices';
import { generateInvoiceNumber } from '~/utils/invoice';
import { invoiceSchema } from '~/lib/schemas/invoice';
import { debounce } from 'lodash';
import Toast from '~/components/base/Toast';

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

  const [openToast, setOpenToast] = useState(false);

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

  const formValues = useWatch({ control });

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

    reset({
      name: invoiceFormData?.name || '',
      number: invoiceFormData?.number || invoiceNumber,
      dueDate: invoiceFormData?.dueDate || null,
      amount: invoiceFormData?.amount || 0,
      status: invoiceFormData?.status || InvoiceStatus.PAID,
    });
  }, [invoices]);

  useEffect(() => {
    const debouncedUpdate = debounce(() => {
      handleUpdate(formValues as Partial<InvoiceFormData>);
    }, 300);

    debouncedUpdate();

    return () => {
      debouncedUpdate.cancel();
    };
  }, [formValues]);

  const handleUpdate = (invoice: Partial<InvoiceFormData>) => {
    if (!fetchedRef.current) {
      return;
    }

    // Save invoice form data to local storage
    saveInvoiceFormData({
      name: invoice.name,
      number: invoice.number,
      amount: invoice.amount,
      status: invoice.status,
      dueDate: invoice.dueDate || null,
    });
  };

  const clearForm = () => {
    reset({
      name: '',
      number: generateInvoiceNumber(invoices[0]?.number || ''),
      dueDate: null,
      amount: 0,
      status: InvoiceStatus.PAID,
    });
  };

  const handleSave = (invoice: InvoiceFormData) => {
    // Add new invoice to local storage
    addInvoice({
      name: invoice.name,
      number: invoice.number,
      amount: invoice.amount,
      status: invoice.status!,
      dueDate: invoice.dueDate!.format('YYYY-MM-DD'),
    });

    // Delete invoice form data from local storage
    deleteInvoiceFormData();

    // Show success toast
    setOpenToast(true);
    clearForm();
  };

  return (
    <Stack gap="38px">
      <Typography variant="h4" component="h1">
        Add Invoice
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
            submitText="+ Add Invoice"
          />
        </Box>
      </Paper>

      <Toast
        open={openToast}
        onClose={() => setOpenToast(false)}
        title="Invoice added successfully!"
        message="You can view and manage your invoice in the 'My Invoices' section."
      />
    </Stack>
  );
}
