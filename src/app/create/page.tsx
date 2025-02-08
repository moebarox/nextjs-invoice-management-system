import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InvoiceForm from '~/components/invoices/InvoiceForm';

export default function CreateInvoice() {
  return (
    <Stack>
      <Typography variant="h1">My Invoices</Typography>
      <InvoiceForm />
    </Stack>
  );
}
