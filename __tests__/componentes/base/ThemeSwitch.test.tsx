import { render, screen } from '@testing-library/react';
import ThemeSwitch from '~/components/base/ThemeSwitch';

describe('ThemeSwitch Component', () => {
  it('renders theme switch toggle', () => {
    render(<ThemeSwitch />);
    expect(screen.getByTestId('theme-switch')).toBeInTheDocument();
  });
});
