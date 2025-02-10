import { render, screen } from '@testing-library/react';
import EditInvoice from '~/components/invoices/EditInvoice';
import { generateInvoice } from '~/utils/test-helper';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useParams: jest.fn(),
}));

describe('EditInvoice Component', () => {
  it('renders create invoice page', () => {
    const mockLocalStorage = jest.spyOn(Storage.prototype, 'getItem');
    const invoice = generateInvoice({ id: '1' });
    mockLocalStorage.mockReturnValueOnce(JSON.stringify([invoice]));

    render(<EditInvoice />);

    expect(screen.getByTestId('invoice-form')).toBeInTheDocument();
  });
});
