import { useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import { debounce } from 'lodash';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { InvoiceFormData, InvoiceStatus } from '~/lib/types/invoice';
import { invoiceSchema } from '~/lib/schemas/invoice';
import { INVOICE_STATUS } from '~/constants/invoice';

export default function InvoiceForm({
  invoice,
  onUpdate,
  onSave,
}: {
  invoice: InvoiceFormData;
  onUpdate: (invoice: Partial<InvoiceFormData>) => void;
  onSave: (invoice: InvoiceFormData) => void;
}) {
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

  return (
    <Stack component="form" gap="58px" onSubmit={handleSubmit(onSave)}>
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <TextField
            id="invoice-name"
            variant="outlined"
            placeholder="Enter your invoice name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
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
        </Grid2>
        <Grid2 size={6}>
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
        </Grid2>
        <Grid2 size={6}>
          <TextField
            id="invoice-amount"
            variant="outlined"
            placeholder="Enter your invoice amount"
            {...register('amount')}
            error={!!errors.amount}
            helperText={errors.amount?.message}
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
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
        </Grid2>
      </Grid2>

      <Button variant="contained" type="submit">
        Add Invoice
      </Button>
    </Stack>
  );
}
