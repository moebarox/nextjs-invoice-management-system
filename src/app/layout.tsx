import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import type { Metadata } from 'next';
import SideMenu from '~/components/layout/SideMenu';
import Header from '~/components/layout/Header';
import './globals.css';

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
      <body>
        <Box sx={{ display: 'flex' }}>
          <SideMenu />
          {/* Main content */}
          <Box>
            <Stack
              spacing={2}
              sx={{
                alignItems: 'center',
                mx: 3,
                pb: 5,
                mt: { xs: 8, md: 0 },
              }}
            >
              <Header />
              {children}
            </Stack>
          </Box>
        </Box>
      </body>
    </html>
  );
}
