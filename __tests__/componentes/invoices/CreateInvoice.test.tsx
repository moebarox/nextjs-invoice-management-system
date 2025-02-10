import { render, screen } from '@testing-library/react';
import CreateInvoice from '~/components/invoices/CreateInvoice';

describe('CreateInvoice Component', () => {
  it('renders create invoice page', () => {
    render(<CreateInvoice />);

    expect(screen.getByTestId('invoice-form')).toBeInTheDocument();
  });
});
