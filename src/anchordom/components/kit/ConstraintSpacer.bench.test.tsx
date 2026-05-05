import { render, act } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConstraintSpacer } from './ConstraintSpacer';
import { UIProvider } from '../../context/UIContext';

describe('ConstraintSpacer Performance', () => {
  beforeEach(() => {
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = vi.fn().mockImplementation(function (this: Element) {
      if (this.id === 'anchordom-root') {
        return { top: 0, left: 0, width: 1920, height: 1080, bottom: 1080, right: 1920 };
      }
      if (this.id === 'top-el') {
        return { top: 100, left: 100, width: 100, height: 100, bottom: 200, right: 200 };
      }
      if (this.id === 'bottom-el') {
        return { top: 600, left: 100, width: 100, height: 100, bottom: 700, right: 200 };
      }
      return { top: 0, left: 0, width: 0, height: 0, bottom: 0, right: 0 };
    });
  });

  it('measures getBoundingClientRect calls during rapid scroll events', async () => {
    const topRef = React.createRef<HTMLDivElement>();
    const bottomRef = React.createRef<HTMLDivElement>();

    const getBoundingClientRectMock = vi.spyOn(Element.prototype, 'getBoundingClientRect');

    await act(async () => {
      render(
        <UIProvider scale={1}>
          <div id="anchordom-root">
            <div ref={topRef} id="top-el" />
            <div ref={bottomRef} id="bottom-el" />
            <ConstraintSpacer
              topTargetRef={topRef}
              bottomTargetRef={bottomRef}
              data-testid="spacer"
            />
          </div>
        </UIProvider>
      );
    });

    // Initial render and the timeout trigger calls. Reset the counter.
    // wait for initial timeout to finish
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 60));
    });

    getBoundingClientRectMock.mockClear();

    const start = performance.now();
    // Simulate 100 rapid scroll events over roughly 100ms
    await act(async () => {
      for (let i = 0; i < 100; i++) {
          window.dispatchEvent(new Event('scroll'));
          // small delay to avoid vitest batching everything perfectly, though dispatchEvent is sync.
          await new Promise((resolve) => setTimeout(resolve, 1));
      }
    });
    const end = performance.now();

    // wait for trailing throttle if any
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 30));
    });

    const totalCalls = getBoundingClientRectMock.mock.calls.length;
    console.log(`[Benchmark] Rapid scroll events. Time taken: ${(end-start).toFixed(2)}ms. getBoundingClientRect calls: ${totalCalls}`);

    // Test the efficiency
    expect(totalCalls).toBeLessThan(100);
  });
});
