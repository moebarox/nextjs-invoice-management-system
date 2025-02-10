import { render, screen } from '@testing-library/react';
import Header from '~/components/layout/Header';

describe('Header Component', () => {
  it('renders header', () => {
    render(<Header />);
    expect(screen.getByTestId('sidebar-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('menu-notification')).toBeInTheDocument();
    expect(screen.getByTestId('menu-message')).toBeInTheDocument();
    expect(screen.getByTestId('menu-profile')).toBeInTheDocument();
  });
});
