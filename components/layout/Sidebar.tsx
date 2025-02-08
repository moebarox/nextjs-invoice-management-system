import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import Link from 'next/link';

export default function SideMenu() {
  return (
    <Box
      sx={{
        width: 280,
        backgroundColor: '#1C2434',
        px: '38px',
        py: '27px',
        color: '#fff',
      }}
    >
      <Stack gap={2}>
        <Box>
          <Image
            src="/logo.svg"
            alt="InvoiceHub logo"
            width={166}
            height={45}
            priority
          />
        </Box>
        <Typography variant="caption">MENU</Typography>
        <List>
          <ListItem>
            <Link href="/create">Add Invoice</Link>
          </ListItem>
          <ListItem>
            <Link href="/">My Invoices</Link>
          </ListItem>
        </List>
      </Stack>
    </Box>
  );
}
