'use client';

import { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { formatCurrency } from '~/utils/number';
import { formatDate } from '~/utils/date';
import { Invoice, InvoiceStatus } from '~/lib/types/invoice';
import { INVOICE_STATUS } from '~/constants/invoice';

const INVOICE_STATUS_COLORS: Record<
  InvoiceStatus,
  'success' | 'error' | 'warning'
> = {
  [InvoiceStatus.PAID]: 'success',
  [InvoiceStatus.UNPAID]: 'error',
  [InvoiceStatus.PENDING]: 'warning',
};

export default function InvoiceList({
  invoices,
  onDelete,
}: {
  invoices: Invoice[];
  onDelete: (id: string) => void;
}) {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<{
    [key: string]: HTMLElement | null;
  }>({});
  const [deletedInvoice, setDeletedInvoice] = useState<Invoice | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setAnchorEl((prev) => ({ ...prev, [id]: event.currentTarget }));
  };

  const handleClose = (id: string) => {
    setAnchorEl((prev) => ({ ...prev, [id]: null }));
  };

  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

  const handleOpenDeleteDialog = (invoice: Invoice) => {
    handleClose(invoice.id);
    setOpenDialog(true);
    setDeletedInvoice(invoice);
  };

  const handleCloseDeleteDialog = () => {
    handleClose(deletedInvoice!.id);
    setDeletedInvoice(null);
    setOpenDialog(false);
  };

  const handleProcessDelete = () => {
    onDelete(deletedInvoice!.id);
    handleCloseDeleteDialog();
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
        {invoices.length === 0 ? (
          <Typography variant="body1" component="p" align="center">
            No invoice found
          </Typography>
        ) : (
          <>
            <TableContainer sx={{ maxWidth: '100%' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ backgroundColor: '#F7F9FC', fontWeight: 600 }}
                    >
                      Invoice
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: '#F7F9FC', fontWeight: 600 }}
                    >
                      Due Date
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ backgroundColor: '#F7F9FC', fontWeight: 600 }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: '#F7F9FC', fontWeight: 600 }}
                    >
                      Amount
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ backgroundColor: '#F7F9FC', fontWeight: 600 }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow
                      key={invoice.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Stack>
                          <Typography variant="body1">
                            {invoice.name}
                          </Typography>
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
                      <TableCell align="center">
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
                        <IconButton
                          aria-label="Actions"
                          onClick={(e) => handleClick(e, invoice.id)}
                        >
                          <Image
                            src="/icon-menu.svg"
                            alt="Actions"
                            width={18}
                            height={18}
                          />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl[invoice.id] || null}
                          open={Boolean(anchorEl[invoice.id])}
                          onClose={() => handleClose(invoice.id)}
                        >
                          <MenuItem onClick={() => handleEdit(invoice.id)}>
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleOpenDeleteDialog(invoice)}
                          >
                            Delete
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
              <DialogTitle>Are you sure you want to delete?</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete invoice{' '}
                  <strong>{deletedInvoice?.number}</strong>? This action cannot
                  be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ px: '24px', pb: '16px' }}>
                <Button size="small" onClick={handleCloseDeleteDialog}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={handleProcessDelete}
                  autoFocus
                >
                  Delete Anyway
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Box>
    </Paper>
  );
}
