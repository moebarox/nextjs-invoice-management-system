import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';

export default function Header() {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        width: '100%',
        px: '30px',
        py: '17px',
      }}
    >
      <Stack direction="row" justifyContent="end" sx={{ width: '100%' }}>
        <Switch />
        <IconButton aria-label="Example">Notif</IconButton>
        <IconButton aria-label="Example">Message</IconButton>
        <Stack direction="row" alignItems="center" gap={1}>
          <Stack>
            <Typography>John Doe</Typography>
            <Typography variant="caption">Verified Member</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
