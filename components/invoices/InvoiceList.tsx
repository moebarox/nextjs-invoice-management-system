'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useInvoices } from '~/hooks/useInvoices';
import { formatCurrency } from '~/utils/number';
import { formatDate } from '~/utils/date';
import { InvoiceStatus } from '~/lib/types/invoice';

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
        <TableContainer>
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
                      <Typography>{invoice.name}</Typography>
                      <Typography variant="caption">
                        {invoice.number}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                  <TableCell>
                    <Chip
                      label={invoice.status}
                      color={INVOICE_STATUS_COLORS[invoice.status]}
                    />
                  </TableCell>
                  <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>
                    <IconButton onClick={handleClick}>Menu</IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
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
