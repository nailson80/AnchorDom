import { render, waitFor } from '@testing-library/react';
import { Panel } from './Panel';
import { vi } from 'vitest';

vi.mock('../hooks/useAssetLoader', () => ({
  useAssetLoader: () => true
}));

describe('Panel component', () => {
  it('renders children', async () => {
    const { getByText } = render(
      <Panel>
        <div>Test Child</div>
      </Panel>
    );
    await waitFor(() => {
      expect(getByText('Test Child')).toBeInTheDocument();
    });
  });

  it('sets up safe areas when useSafeArea is true', async () => {
    const { container } = render(
      <Panel useSafeArea={true}>
        <div>Test</div>
      </Panel>
    );
    await waitFor(() => {
      const panelDiv = container.firstChild as HTMLElement;
      expect(panelDiv).toHaveStyle('--safe-top: env(safe-area-inset-top, 0px)');
      expect(panelDiv).toHaveStyle('--safe-bottom: env(safe-area-inset-bottom, 0px)');
    });
  });

  it('does not set up safe areas when useSafeArea is false', async () => {
    const { container } = render(
      <Panel useSafeArea={false}>
        <div>Test</div>
      </Panel>
    );
    await waitFor(() => {
      const panelDiv = container.firstChild as HTMLElement;
      expect(panelDiv.style.getPropertyValue('--safe-top')).toBe('');
    });
  });
});