import { memo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image';
import { Controller, Control, FieldErrors } from 'react-hook-form';
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
import { INVOICE_STATUS } from '~/constants/invoice';

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
  control,
  errors,
  onSubmit,
  submitText,
}: {
  control: Control<InvoiceFormData>;
  errors: FieldErrors<InvoiceFormData>;
  onSubmit: VoidFunction;
  submitText?: string;
}) {
  return (
    <Stack component="form" gap="58px" onSubmit={onSubmit}>
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
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  id="invoice-name"
                  placeholder="Enter your invoice name"
                  {...field}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                />
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl variant="outlined" fullWidth sx={{ gap: '12px' }}>
            <InputLabel htmlFor="invoice-number">
              Number
              <Typography
                component="span"
                sx={{ color: '#f23030', fontWeight: 600 }}
              >
                *
              </Typography>
            </InputLabel>
            <Controller
              name="number"
              control={control}
              render={({ field }) => (
                <TextField
                  id="invoice-number"
                  placeholder="Enter your invoice number"
                  {...field}
                  error={!!errors.number}
                  helperText={errors.number?.message}
                  disabled
                  fullWidth
                />
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl variant="outlined" fullWidth sx={{ gap: '12px' }}>
            <InputLabel htmlFor="invoice-due-date">
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
                        id: 'invoice-due-date',
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
            <InputLabel htmlFor="invoice-amount">
              Amount
              <Typography
                component="span"
                sx={{ color: '#f23030', fontWeight: 600 }}
              >
                *
              </Typography>
            </InputLabel>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <TextField
                  id="invoice-amount"
                  placeholder="Enter your invoice amount"
                  {...field}
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
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl variant="outlined" fullWidth sx={{ gap: '12px' }}>
            <InputLabel htmlFor="invoice-status">
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
                  labelId="invoice-status"
                  {...field}
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
    </Stack>
  );
}
