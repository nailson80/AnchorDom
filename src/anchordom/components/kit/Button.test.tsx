import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { UIProvider } from '../../context/UIContext';
import { vi } from 'vitest';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<UIProvider>{ui}</UIProvider>);
};

describe('Button component', () => {
  it('renders with correct label', () => {
    renderWithProvider(<Button label="Test Button" />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('fires onClick when clicked', () => {
    const handleClick = vi.fn();
    renderWithProvider(<Button label="Clickable" onClick={handleClick} />);

    fireEvent.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', () => {
    const handleClick = vi.fn();
    renderWithProvider(<Button label="Disabled" onClick={handleClick} disabled={true} />);

    fireEvent.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies disabled styling', () => {
    renderWithProvider(<Button label="Disabled" disabled={true} />);
    const button = screen.getByText('Disabled').parentElement;
    expect(button).toHaveStyle('cursor: not-allowed');
    expect(button).toHaveStyle('opacity: 0.5');
  });
});