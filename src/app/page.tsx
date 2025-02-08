import { Stack, Typography } from '@mui/material';
import InvoiceList from '~/components/invoices/InvoiceList';

export default function MyInvoice() {
  return (
    <Stack gap={4}>
      <Typography variant="h4" component="h1">
        My Invoices
      </Typography>
      <InvoiceList />
    </Stack>
  );
}
