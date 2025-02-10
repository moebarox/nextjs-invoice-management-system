import { render, screen } from '@testing-library/react';
import SidebarMenu from '~/components/layout/SidebarMenu';

describe('SidebarMenu Component', () => {
  it('renders sidebar menu', () => {
    render(<SidebarMenu />);
    expect(screen.getByTestId('menu-add-invoice')).toBeInTheDocument();
    expect(screen.getByTestId('menu-my-invoices')).toBeInTheDocument();
  });
});
