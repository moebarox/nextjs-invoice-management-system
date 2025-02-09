'use client';

import { useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import InvoiceList from '~/components/invoices/InvoiceList';
import { useInvoices } from '~/hooks/useInvoices';
import InvoiceListFilter from '~/components/invoices/InvoiceListFilter';

export default function MyInvoice({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { invoices, fetchInvoices, deleteInvoice } = useInvoices();

  useEffect(() => {
    async function initData() {
      const query = await searchParams;
      fetchInvoices({
        keywords: query?.keywords || '',
        status: query?.status || '',
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
