'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Badge,
} from '@mui/material';
import ThemeSwitch from '~/components/base/ThemeSwitch';
import SidebarMobile from '~/components/layout/SidebarMobile';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSidebar, setOpenSidebar] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        boxShadow: '0px 1px 0px 0px #E2E8F0',
        backgroundColor: '#fff',
        width: '100%',
        px: '30px',
        py: '17px',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <IconButton
          aria-label="Menu"
          sx={{ display: { xs: 'flex', md: 'none' } }}
          data-testid="sidebar-toggle"
        >
          <Image
            src="/icon-menu.svg"
            alt="Menu"
            width={20}
            height={20}
            onClick={() => setOpenSidebar(true)}
          />
        </IconButton>

        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          gap="30px"
          sx={{ width: '100%' }}
        >
          <ThemeSwitch />
          <Stack direction="row" gap="15px">
            <IconButton
              aria-label="Notification"
              data-testid="menu-notification"
              sx={{
                backgroundColor: '#EFF4FB',
                border: '0.5px solid #E2E8F0',
              }}
            >
              <Image
                src="/icon-alarm.svg"
                alt="Notification"
                width={18}
                height={18}
                priority
              />
            </IconButton>
            <Badge
              variant="dot"
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  top: 4,
                  right: 4,
                },
              }}
            >
              <IconButton
                aria-label="Message"
                data-testid="menu-message"
                sx={{
                  backgroundColor: '#EFF4FB',
                  border: '0.5px solid #E2E8F0',
                }}
              >
                <Image
                  src="/icon-chat.svg"
                  alt="Message"
                  width={18}
                  height={18}
                  priority
                />
              </IconButton>
            </Badge>
          </Stack>

          <Button
            data-testid="menu-profile"
            onClick={handleClick}
            sx={{ p: 0 }}
          >
            <Stack
              direction="row"
              alignItems="center"
              gap="15px"
              sx={{ cursor: 'pointer' }}
            >
              <Stack>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    textAlign: 'right',
                    color: '#212B36',
                  }}
                >
                  John Doe
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#637381',
                    textAlign: 'right',
                  }}
                >
                  Verified Member
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap="10px">
                <Image
                  src="/avatar.png"
                  alt="Avatar"
                  width={46}
                  height={46}
                  priority
                />
                <Image
                  src="/icon-chevron-down.svg"
                  alt="Chevron"
                  width={20}
                  height={20}
                />
              </Stack>
            </Stack>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Stack>
      </Stack>

      <SidebarMobile open={openSidebar} toggleDrawer={setOpenSidebar} />
    </Box>
  );
}
