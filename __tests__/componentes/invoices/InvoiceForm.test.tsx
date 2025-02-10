import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import InvoiceForm from '~/components/invoices/InvoiceForm';
import { invoiceSchema } from '~/lib/schemas/invoice';
import { InvoiceFormData, InvoiceStatus } from '~/lib/types/invoice';

const mockOnSubmit = jest.fn();

function Wrapper() {
  const {
    control,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      name: '',
      number: 'INV001',
      status: InvoiceStatus.PAID,
      dueDate: null,
      amount: 0,
    },
  });

  return (
    <InvoiceForm control={control} errors={errors} onSubmit={mockOnSubmit} />
  );
}

describe('InvoiceForm Component', () => {
  it('renders invoice form', () => {
    render(<Wrapper />);

    expect(screen.getByTestId('form-name')).toBeInTheDocument();
    expect(screen.getByTestId('form-number')).toBeInTheDocument();
    expect(screen.getByTestId('form-amount')).toBeInTheDocument();
    expect(screen.getByTestId('form-status')).toBeInTheDocument();
  });
});
