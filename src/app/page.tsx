'use client';

import { useEffect, useState, memo } from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { debounce } from 'lodash';
import InvoiceList from '~/components/invoices/InvoiceList';
import { INVOICE_STATUS } from '~/constants/invoice';
import { useInvoices } from '~/hooks/useInvoices';

// Create a memoized icon for the chevron
const ChevronIcon = memo((props: any) => (
  <Image
    {...props}
    src="/icon-chevron-down.svg"
    alt="Filter"
    width={24}
    height={24}
    style={{ top: 7 }}
  />
));

export default function MyInvoice({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const router = useRouter();
  const { invoices, fetchInvoices } = useInvoices();

  const [keywords, setKeywords] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function initFilter() {
      const query = await searchParams;
      setKeywords(query?.keywords || '');
      setStatus(query?.status || '');
    }

    initFilter();
  }, []);

  useEffect(() => {
    const debouncedFilter = debounce(handleFilter, 500);
    debouncedFilter();
    return () => debouncedFilter.cancel();
  }, [keywords, status]);

  const handleFilter = () => {
    const query = new URLSearchParams(window.location.search);
    query.set('keywords', keywords);
    query.set('status', status);
    router.push(`/?${query.toString()}`);
    fetchInvoices({ keywords, status });
  };

  return (
    <Stack gap={4}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" component="h1">
          My Invoices
        </Typography>
        <Stack
          component="form"
          direction="row"
          gap="25px"
          onSubmit={handleFilter}
        >
          <FormControl variant="filled" size="small" sx={{ minWidth: 216 }}>
            <TextField
              variant="filled"
              placeholder="Search"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </FormControl>
          <FormControl variant="filled" size="small" sx={{ minWidth: 135 }}>
            <Select
              displayEmpty
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              IconComponent={ChevronIcon}
            >
              <MenuItem value="">All Status</MenuItem>
              {Object.entries(INVOICE_STATUS).map((status) => (
                <MenuItem key={status[0]} value={status[0]}>
                  {status[1]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      <InvoiceList invoices={invoices} />
    </Stack>
  );
}
