import { render, screen } from '@testing-library/react';
import Sidebar from '~/components/layout/Sidebar';

describe('Sidebar Component', () => {
  it('renders sidebar', () => {
    render(<Sidebar />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-menu')).toBeInTheDocument();
  });
});
