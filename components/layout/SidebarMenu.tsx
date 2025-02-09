'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';

export default function SidebarMenu({
  onMenuClick,
}: {
  onMenuClick?: VoidFunction;
}) {
  const pathName = usePathname();

  const isSelected = (path: string) => {
    return pathName === path;
  };

  return (
    <Stack gap="17px">
      <Typography variant="body2" sx={{ color: '#9D9D9D' }}>
        MENU
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton selected={isSelected('/create')}>
            <ListItemIcon>
              <Image
                src="/icon-paragraph.svg"
                alt="Add Invoice"
                width={18}
                height={18}
              />
            </ListItemIcon>
            <ListItemText>
              <Link href="/create" onClick={onMenuClick}>
                Add Invoice
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton selected={isSelected('/')}>
            <ListItemIcon>
              <Image
                src="/icon-list.svg"
                alt="My Invoices"
                width={18}
                height={18}
              />
            </ListItemIcon>
            <ListItemText>
              <Link href="/" onClick={onMenuClick}>
                My Invoices
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
}
