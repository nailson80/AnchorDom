import { render, screen } from '@testing-library/react';
import { ScrollList } from './ScrollList';
import { UIProvider } from '../../context/UIContext';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<UIProvider>{ui}</UIProvider>);
};

describe('ScrollList component', () => {
  it('renders children correctly', () => {
    renderWithProvider(
      <ScrollList width={100} height={100}>
        <div>Item 1</div>
        <div>Item 2</div>
      </ScrollList>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('applies width and height', () => {
    const { container } = renderWithProvider(
      <ScrollList width={300} height={400}>
        <div>Item</div>
      </ScrollList>
    );
    const scrollContainer = container.firstChild as HTMLElement;
    expect(scrollContainer).toHaveStyle('width: 300px');
    expect(scrollContainer).toHaveStyle('height: 400px');
  });
});