'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { useInvoices } from '~/hooks/useInvoices';
import { formatCurrency } from '~/utils/number';
import { formatDate } from '~/utils/date';
import { InvoiceStatus } from '~/lib/types/invoice';
import { INVOICE_STATUS } from '~/constants/invoice';

const INVOICE_STATUS_COLORS = {
  [InvoiceStatus.PAID]: 'success',
  [InvoiceStatus.UNPAID]: 'error',
  [InvoiceStatus.PENDING]: 'warning',
};

export default function InvoiceList() {
  const router = useRouter();
  const { invoices, fetchInvoices } = useInvoices();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    handleClose();
  };

  return (
    <Paper>
      <Box
        sx={{
          pt: '30px',
          px: '30px',
          pb: '41px',
        }}
      >
        <TableContainer sx={{ maxWidth: '100%' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#F7F9FC', fontWeight: 600 }}>
                  Invoice
                </TableCell>
                <TableCell sx={{ backgroundColor: '#F7F9FC', fontWeight: 600 }}>
                  Due Date
                </TableCell>
                <TableCell sx={{ backgroundColor: '#F7F9FC', fontWeight: 600 }}>
                  Status
                </TableCell>
                <TableCell sx={{ backgroundColor: '#F7F9FC', fontWeight: 600 }}>
                  Amount
                </TableCell>
                <TableCell sx={{ backgroundColor: '#F7F9FC', fontWeight: 600 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow
                  key={invoice.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Stack>
                      <Typography variant="body1">{invoice.name}</Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#64748B',
                          fontWeight: 600,
                        }}
                      >
                        {invoice.number}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {formatDate(invoice.dueDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={INVOICE_STATUS[invoice.status]}
                      color={INVOICE_STATUS_COLORS[invoice.status]}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {formatCurrency(invoice.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="Actions" onClick={handleClick}>
                      <Image
                        src="/icon-menu.svg"
                        alt="Actions"
                        width={18}
                        height={18}
                      />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                      <MenuItem onClick={() => handleEdit(invoice.id)}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(invoice.id)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
}
