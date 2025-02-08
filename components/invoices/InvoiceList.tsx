'use client';

import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useInvoices } from '~/hooks/useInvoices';
import { formatCurrency } from '~/utils/number';
import { formatDate } from '~/utils/date';

export default function InvoiceList() {
  const { invoices, fetchInvoices } = useInvoices();

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Invoice</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Action</TableCell>
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
                  <Typography variant="caption">{invoice.number}</Typography>
                </Stack>
              </TableCell>
              <TableCell>{formatDate(invoice.dueDate)}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>{formatCurrency(invoice.amount)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
