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
      <Alert sx={{ minWidth: 300 }}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
}
