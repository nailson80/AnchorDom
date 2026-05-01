import { render, fireEvent } from '@testing-library/react';
import { Toggle } from './Toggle';
import { UIProvider } from '../../context/UIContext';
import { vi } from 'vitest';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<UIProvider>{ui}</UIProvider>);
};

describe('Toggle component', () => {
  it('renders correctly', () => {
    const { container } = renderWithProvider(<Toggle toggled={false} onToggle={() => {}} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('calls onToggle when clicked', () => {
    const handleToggle = vi.fn();
    const { container } = renderWithProvider(<Toggle toggled={false} onToggle={handleToggle} />);

    fireEvent.click(container.firstChild as HTMLElement);
    expect(handleToggle).toHaveBeenCalledWith(true);
  });

  it('does not call onToggle when disabled', () => {
    const handleToggle = vi.fn();
    const { container } = renderWithProvider(<Toggle toggled={false} onToggle={handleToggle} disabled={true} />);

    fireEvent.click(container.firstChild as HTMLElement);
    expect(handleToggle).not.toHaveBeenCalled();
  });
});