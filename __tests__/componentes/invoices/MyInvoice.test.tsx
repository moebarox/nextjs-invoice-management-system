import { act, render, screen } from '@testing-library/react';
import MyInvoice from '~/components/invoices/MyInvoice';

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

describe('MyInvoice Component', () => {
  it('renders my invoice page', async () => {
    const mockLocalStorage = jest.spyOn(Storage.prototype, 'getItem');
    mockLocalStorage.mockReturnValueOnce(JSON.stringify([]));

    await act(async () => render(<MyInvoice />));

    expect(screen.getByTestId('invoice-filter')).toBeInTheDocument();
    expect(screen.getByTestId('invoice-list')).toBeInTheDocument();
  });
});
