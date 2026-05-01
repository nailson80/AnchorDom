import { render, screen } from '@testing-library/react';
import { Image } from './Image';
import { UIProvider } from '../../context/UIContext';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<UIProvider>{ui}</UIProvider>);
};

describe('Image component', () => {
  it('renders with correct src and alt text', () => {
    renderWithProvider(<Image src="test.png" alt="Test Image" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'test.png');
    expect(img).toHaveAttribute('alt', 'Test Image');
  });

  it('applies width and height props', () => {
    renderWithProvider(<Image src="test.png" alt="Test Image" width={100} height={200} />);
    const img = screen.getByRole('img');
    expect(img).toHaveStyle('width: 100px');
    expect(img).toHaveStyle('height: 200px');
  });
});