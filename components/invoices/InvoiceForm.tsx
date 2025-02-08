'use client';

import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { InvoiceStatus } from '~/lib/types/invoice';
import { useInvoices } from '~/hooks/useInvoices';

export default function InvoiceForm() {
  const router = useRouter();
  const { invoices, getInvoiceFormData, saveInvoiceFormData, addInvoice } =
    useInvoices();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState(InvoiceStatus.PAID);

  useEffect(() => {
    // Generate a new invoice number
    const increment = `00${invoices.length + 1}`.slice(-3);
    const invoiceNumber = `INV${new Date().toISOString().split('T')[0].replaceAll('-', '')}${increment}`;

    // Get invoice form data from local storage
    const invoiceFormData = getInvoiceFormData();

    setName(invoiceFormData?.name || '');
    setNumber(invoiceFormData?.number || invoiceNumber);
    setDueDate(dayjs(invoiceFormData?.dueDate || new Date()));
    setAmount(invoiceFormData?.amount || 0);
    setStatus(invoiceFormData.status || InvoiceStatus.PAID);
  }, []);

  useEffect(() => {
    saveInvoiceFormData({
      name,
      number,
      dueDate: dueDate?.format('YYYY-MM-DD'),
      amount,
      status,
    });
  }, [name, number, dueDate, amount, status]);

  const handleSave = () => {
    addInvoice({
      name,
      number,
      amount,
      status,
      dueDate: dueDate!.format('YYYY-MM-DD'),
    });

    router.push('/');
  };

  return (
    <Stack>
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <TextField
            id="invoice-name"
            variant="outlined"
            placeholder="Enter your invoice name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            id="invoice-number"
            variant="outlined"
            placeholder="Enter your invoice number"
            value={number}
            disabled
            onChange={(e) => setNumber(e.target.value)}
          />
        </Grid2>
        <Grid2 size={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dueDate}
              onChange={(value: Dayjs | null) => setDueDate(value)}
            />
          </LocalizationProvider>
        </Grid2>
        <Grid2 size={6}>
          <TextField
            id="invoice-amount"
            variant="outlined"
            placeholder="Enter your invoice amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </Grid2>
        <Grid2 size={6}>
          <Select
            labelId="invoice-status"
            id="invoice-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as InvoiceStatus)}
          >
            {Object.values(InvoiceStatus).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </Grid2>
      </Grid2>

      <Button variant="contained" onClick={handleSave}>
        Add Invoice
      </Button>
    </Stack>
  );
}
