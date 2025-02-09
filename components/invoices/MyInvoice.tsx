'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Stack, Typography } from '@mui/material';
import InvoiceList from '~/components/invoices/InvoiceList';
import { useInvoices } from '~/hooks/useInvoices';
import InvoiceListFilter from '~/components/invoices/InvoiceListFilter';

export default function MyInvoice() {
  const searchParams = useSearchParams();
  const { invoices, fetchInvoices, deleteInvoice } = useInvoices();

  useEffect(() => {
    async function initData() {
      fetchInvoices({
        keywords: searchParams.get('keywords') || '',
        status: searchParams.get('status') || '',
      });
    }

    initData();
  }, [searchParams]);

  return (
    <Stack gap={4}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" component="h1">
          My Invoices
        </Typography>
        <InvoiceListFilter />
      </Stack>

      <InvoiceList invoices={invoices} onDelete={deleteInvoice} />
    </Stack>
  );
}
