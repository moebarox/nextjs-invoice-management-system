import Image from 'next/image';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import ThemeSwitch from '~/components/base/ThemeSwitch';

export default function Header() {
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
          <IconButton
            aria-label="Message"
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
        </Stack>
        <Stack direction="row" alignItems="center" gap="15px">
          <Stack>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                textAlign: 'right',
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
          <Image
            src="/avatar.png"
            alt="Avatar"
            width={46}
            height={46}
            priority
          />
        </Stack>
      </Stack>
    </Box>
  );
}
