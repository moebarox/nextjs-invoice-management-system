import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InvoiceList from '~/components/invoices/InvoiceList';

export default function MyInvoice() {
  return (
    <Stack>
      <Typography variant="h1">My Invoices</Typography>
      <InvoiceList />
    </Stack>
  );
}
