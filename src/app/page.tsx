import { Suspense } from 'react';
import MyInvoice from '~/components/invoices/MyInvoice';

export default function MyInvoicePage() {
  return (
    <Suspense>
      <MyInvoice />
    </Suspense>
  );
}
