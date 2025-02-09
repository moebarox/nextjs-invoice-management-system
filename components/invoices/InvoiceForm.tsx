import { memo, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { debounce } from 'lodash';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Grid2,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  Stack,
  Typography,
  InputAdornment,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { InvoiceFormData } from '~/lib/types/invoice';
import { invoiceSchema } from '~/lib/schemas/invoice';
import { INVOICE_STATUS } from '~/constants/invoice';
import Toast from '~/components/base/Toast';

// Create a memoized icon to avoid glitching
const ChevronIcon = memo((props) => (
  <Image
    {...props}
    src="/icon-chevron-down.svg"
    alt="Filter"
    width={24}
    height={24}
    style={{ top: 14, right: 16 }}
  />
));
ChevronIcon.displayName = 'ChevronIcon';

export default function InvoiceForm({
  invoice,
  submitText,
  onUpdate,
  onSave,
}: {
  invoice: InvoiceFormData;
  submitText?: string;
  onUpdate: (invoice: Partial<InvoiceFormData>) => void;
  onSave: (invoice: InvoiceFormData) => void;
}) {
  const [openToast, setOpenToast] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: invoice,
    mode: 'onChange',
  });

  useEffect(() => {
    const debouncedUpdate = debounce((value) => {
      onUpdate(value);
    }, 300);

    const subscription = watch(debouncedUpdate);
    return () => {
      subscription.unsubscribe();
      debouncedUpdate.cancel();
    };
  }, [watch]);

  const handleSave = (data: InvoiceFormData) => {
    onSave(data);
    setOpenToast(true);
  };

  return (
    <Stack component="form" gap="58px" onSubmit={handleSubmit(handleSave)}>
      <Grid2 container columnSpacing="35px" rowSpacing="18px">
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl variant="outlined" fullWidth sx={{ gap: '12px' }}>
            <InputLabel htmlFor="invoice-name">
              Name
              <Typography
                component="span"
                sx={{ color: '#f23030', fontWeight: 600 }}
              >
                *
              </Typography>
            </InputLabel>
            <TextField
              id="invoice-name"
              placeholder="Enter your invoice name"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl variant="outlined" fullWidth sx={{ gap: '12px' }}>
            <InputLabel htmlFor="invoice-name">
              Number
              <Typography
                component="span"
                sx={{ color: '#f23030', fontWeight: 600 }}
              >
                *
              </Typography>
            </InputLabel>
            <TextField
              id="invoice-number"
              placeholder="Enter your invoice number"
              {...register('number')}
              error={!!errors.number}
              helperText={errors.number?.message}
              disabled
              fullWidth
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl variant="outlined" fullWidth sx={{ gap: '12px' }}>
            <InputLabel htmlFor="invoice-name">
              Due Date
              <Typography
                component="span"
                sx={{ color: '#f23030', fontWeight: 600 }}
              >
                *
              </Typography>
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(value: Dayjs | null) => field.onChange(value)}
                    slotProps={{
                      textField: {
                        error: !!errors.dueDate,
                        helperText: errors.dueDate?.message,
                        fullWidth: true,
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl variant="outlined" fullWidth sx={{ gap: '12px' }}>
            <InputLabel htmlFor="invoice-name">
              Amount
              <Typography
                component="span"
                sx={{ color: '#f23030', fontWeight: 600 }}
              >
                *
              </Typography>
            </InputLabel>
            <TextField
              id="invoice-amount"
              placeholder="Enter your invoice amount"
              {...register('amount')}
              error={!!errors.amount}
              helperText={errors.amount?.message}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">Rp</InputAdornment>
                  ),
                },
              }}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl variant="outlined" fullWidth sx={{ gap: '12px' }}>
            <InputLabel htmlFor="invoice-name">
              Status
              <Typography
                component="span"
                sx={{ color: '#f23030', fontWeight: 600 }}
              >
                *
              </Typography>
            </InputLabel>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.status}
                  fullWidth
                  IconComponent={ChevronIcon}
                >
                  {Object.entries(INVOICE_STATUS).map((status) => (
                    <MenuItem key={status[0]} value={status[0]}>
                      {status[1]}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid2>
      </Grid2>

      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button variant="contained" type="submit">
          {submitText}
        </Button>
      </Box>

      <Toast
        open={openToast}
        onClose={() => setOpenToast(false)}
        title="Invoice added successfully!"
        message="You can view and manage your invoice in the 'My Invoices' section."
      />
    </Stack>
  );
}
