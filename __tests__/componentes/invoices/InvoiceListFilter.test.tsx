import { render, screen } from '@testing-library/react';
import InvoiceListFilter from '~/components/invoices/InvoiceListFilter';

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

describe('InvoiceListFilter Component', () => {
  it('renders invoice list filter', () => {
    render(<InvoiceListFilter />);

    expect(screen.getByTestId('filter-keywords')).toBeInTheDocument();
    expect(screen.getByTestId('filter-status')).toBeInTheDocument();
  });
});
