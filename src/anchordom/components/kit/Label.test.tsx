import { render, screen } from '@testing-library/react';
import { Label } from './Label';
import { UIProvider } from '../../context/UIContext';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<UIProvider>{ui}</UIProvider>);
};

describe('Label component', () => {
  it('renders correct text', () => {
    renderWithProvider(<Label text="Hello World" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies custom styling', () => {
    renderWithProvider(<Label text="Styled" style={{ color: 'red' }} />);
    expect(screen.getByText('Styled')).toHaveStyle('color: rgb(255, 0, 0)');
  });
});