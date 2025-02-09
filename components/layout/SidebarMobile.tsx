'use client';

import Image from 'next/image';
import { Box, Stack, Drawer } from '@mui/material';
import SidebarMenu from '~/components/layout/SidebarMenu';

export default function SideMenu({
  open,
  toggleDrawer,
}: {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
}) {
  return (
    <Drawer open={open} onClose={() => toggleDrawer(false)}>
      <Box
        sx={{
          width: '100%',
          px: '38px',
          py: '27px',
        }}
      >
        <Stack gap="50px">
          <Image
            src="/logo.svg"
            alt="InvoiceHub logo"
            width={166}
            height={44}
            priority
          />

          <SidebarMenu onMenuClick={() => toggleDrawer(false)} />
        </Stack>
      </Box>
    </Drawer>
  );
}
