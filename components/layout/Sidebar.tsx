import Image from 'next/image';
import { Box, Stack, Drawer } from '@mui/material';
import SidebarMenu from '~/components/layout/SidebarMenu';

export default function SideMenu() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
      }}
    >
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
            data-testid="logo"
          />

          <SidebarMenu />
        </Stack>
      </Box>
    </Drawer>
  );
}
