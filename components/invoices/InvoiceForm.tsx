import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
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
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { InvoiceFormData, InvoiceStatus } from '~/lib/types/invoice';
import { invoiceSchema } from '~/lib/schemas/invoice';
import { INVOICE_STATUS } from '~/constants/invoice';
import Toast from '~/components/base/Toast';

export default function InvoiceForm({
  invoice,
  onUpdate,
  onSave,
}: {
  invoice: InvoiceFormData;
  onUpdate: (invoice: Partial<InvoiceFormData>) => void;
  onSave: (invoice: InvoiceFormData) => void;
}) {
  const [openToast, setOpenToast] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
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
    resetForm();
    setOpenToast(true);
  };

  const resetForm = () => {
    reset({ ...invoice });
  };

  return (
    <Stack component="form" gap="58px" onSubmit={handleSubmit(handleSave)}>
      <Grid2 container columnSpacing="35px" rowSpacing="18px">
        <Grid2 size={6}>
          <FormControl variant="outlined" fullWidth sx={{ gap: '12px' }}>
            <InputLabel variant="outlined" htmlFor="invoice-name">
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
              variant="outlined"
              placeholder="Enter your invoice name"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
            />
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <FormControl variant="outlined" fullWidth sx={{ gap: '12px' }}>
            <InputLabel variant="outlined" htmlFor="invoice-name">
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
              variant="outlined"
              placeholder="Enter your invoice number"
              {...register('number')}
              error={!!errors.number}
              helperText={errors.number?.message}
              disabled
              fullWidth
            />
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <FormControl variant="outlined" fullWidth sx={{ gap: '12px' }}>
            <InputLabel variant="outlined" htmlFor="invoice-name">
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
                    value={dayjs(field.value)}
                    onChange={(value: Dayjs | null) => field.onChange(value)}
                    sx={{ width: '100%' }}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <FormControl variant="outlined" fullWidth sx={{ gap: '12px' }}>
            <InputLabel variant="outlined" htmlFor="invoice-name">
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
              variant="outlined"
              placeholder="Enter your invoice amount"
              {...register('amount')}
              error={!!errors.amount}
              helperText={errors.amount?.message}
              fullWidth
            />
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <FormControl variant="outlined" fullWidth sx={{ gap: '12px' }}>
            <InputLabel variant="outlined" htmlFor="invoice-name">
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
                >
                  {Object.values(InvoiceStatus).map((status) => (
                    <MenuItem key={status} value={status}>
                      {INVOICE_STATUS[status]}
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
          + Add Invoice
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
