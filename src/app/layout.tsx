import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Sidebar from '~/components/layout/Sidebar';
import Header from '~/components/layout/Header';
import './globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
});

const title = 'InvoiceHub - Invoice Management System';
const description =
  'InvoiceHub is an invoice management system app that streamlines the process of creating and managing invoices.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'invoice',
    'invoice management',
    'invoice management system',
    'invoice management app',
    'invoice management software',
    'invoice management tool',
    'invoice management platform',
    'invoice management service',
    'invoice management solution',
  ],
  openGraph: {
    title,
    description,
    type: 'website',
  },
  twitter: {
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <Stack direction="row" alignItems="stretch">
          <Sidebar />
          <Box
            sx={{
              flexGrow: 1,
              minHeight: '100svh',
              backgroundColor: '#F1F5F9',
            }}
          >
            <Stack spacing={2}>
              <Header />
              <Box
                sx={{
                  py: '52px',
                  px: '136px',
                }}
              >
                {children}
              </Box>
            </Stack>
          </Box>
        </Stack>
      </body>
    </html>
  );
}
