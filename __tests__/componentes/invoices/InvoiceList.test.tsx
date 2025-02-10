import { render, screen } from '@testing-library/react';
import InvoiceList from '~/components/invoices/InvoiceList';
import { generateInvoice } from '~/utils/test-helper';

const mockOnDelete = jest.fn();
const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => ''),
    set: jest.fn(),
    toString: jest.fn(() => ''),
  })),
}));

describe('InvoiceList Component', () => {
  it('renders invoice list', () => {
    const invoices = Array(2)
      .fill(null)
      .map((_, index) => generateInvoice({ id: index.toString() }));

    render(<InvoiceList invoices={invoices} onDelete={mockOnDelete} />);

    expect(screen.getAllByTestId(/^invoice-item-\w+$/)).toHaveLength(2);
    expect(screen.getByTestId('invoice-name-0')).toBeInTheDocument();
    expect(screen.getByTestId('invoice-number-0')).toBeInTheDocument();
    expect(screen.getByTestId('invoice-status-0')).toBeInTheDocument();
    expect(screen.getByTestId('invoice-amount-0')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<InvoiceList invoices={[]} onDelete={mockOnDelete} />);

    expect(screen.getByTestId('invoice-empty')).toBeInTheDocument();
  });
});
