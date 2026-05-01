import { render } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';
import { UIProvider } from '../../context/UIContext';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<UIProvider>{ui}</UIProvider>);
};

describe('ProgressBar component', () => {
  it('renders correctly', () => {
    const { container } = renderWithProvider(<ProgressBar progress={0.5} width={100} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('constrains progress between 0 and 1', () => {
    const { container, rerender } = render(<UIProvider><ProgressBar progress={1.5} width={100} /></UIProvider>);
    // The fill element is the last div inside the container
    const fills = container.querySelectorAll('div > div');
    const fill = fills[fills.length - 1];
    expect(fill).toHaveStyle('width: 100%');

    rerender(<UIProvider><ProgressBar progress={-0.5} width={100} /></UIProvider>);
    expect(fill).toHaveStyle('width: 0%');
  });

  it('updates width based on progress', () => {
    const { container } = renderWithProvider(<ProgressBar progress={0.5} width={100} />);
    const fills = container.querySelectorAll('div > div');
    const fill = fills[fills.length - 1];
    expect(fill).toHaveStyle('width: 50%');
  });
});