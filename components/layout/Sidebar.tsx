import Image from 'next/image';
import Link from 'next/link';
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';

export default function SideMenu() {
  return (
    <Box
      sx={{
        flexShrink: 0,
        width: 280,
        backgroundColor: '#1C2434',
        px: '38px',
        py: '27px',
        color: '#fff',
      }}
    >
      <Stack gap="50px">
        <Box>
          <Image
            src="/logo.svg"
            alt="InvoiceHub logo"
            width={166}
            height={44}
            priority
          />
        </Box>
        <Stack gap="17px">
          <Typography variant="body2" sx={{ color: '#9D9D9D' }}>
            MENU
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Image
                    src="/icon-paragraph.svg"
                    alt="Add Invoice"
                    width={18}
                    height={18}
                  />
                </ListItemIcon>
                <ListItemText>
                  <Link href="/create">Add Invoice</Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Image
                    src="/icon-list.svg"
                    alt="My Invoices"
                    width={18}
                    height={18}
                  />
                </ListItemIcon>
                <ListItemText>
                  <Link href="/">My Invoices</Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </Box>
  );
}
