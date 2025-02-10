import Image from 'next/image';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

export default function CustomSnackbar({
  open,
  onClose,
  title,
  message,
}: {
  open: boolean;
  onClose: VoidFunction;
  title?: string;
  message?: string;
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        sx={{ minWidth: 300 }}
        icon={
          <Image src="/icon-check.svg" alt="Check" width={36} height={32} />
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
}
