import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConstraintSpacer } from './ConstraintSpacer';
import { UIProvider } from '../../context/UIContext';

describe('ConstraintSpacer', () => {
  beforeEach(() => {
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = vi.fn().mockImplementation(function (this: Element) {
      if (this.id === 'anchordom-virtual-canvas') {
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

  it('renders and forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const topRef = React.createRef<HTMLElement>();
    const bottomRef = React.createRef<HTMLElement>();

    render(
      <UIProvider scale={1}>
        <div id="anchordom-virtual-canvas">
          <ConstraintSpacer
            ref={ref}
            topTargetRef={topRef}
            bottomTargetRef={bottomRef}
            data-testid="spacer"
          />
        </div>
      </UIProvider>
    );

    const spacer = screen.getByTestId('spacer');
    expect(spacer).toBeInTheDocument();
    expect(ref.current).toBe(spacer);
  });

  it('calculates correct dimensions without offsets', () => {
    const topRef = React.createRef<HTMLDivElement>();
    const bottomRef = React.createRef<HTMLDivElement>();

    const { getByTestId } = render(
      <UIProvider scale={1}>
        <div id="anchordom-virtual-canvas">
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

    const spacer = getByTestId('spacer');
    // Top target bottom is 200. Canvas top is 0. Distance is 200. Virtual pixels = 200.
    expect(spacer.style.top).toBe('200px');
    // Gap = bottom top (600) - top bottom (200) = 400.
    expect(spacer.style.height).toBe('400px');
    // visibility might be set via useAnchor, so it depends on the framework implementation.
    // However, it should not be "hidden" (our component explicitly checks `style.visibility === 'hidden' ? 'hidden' : anchorStyle.visibility`)
    expect(spacer.style.visibility).not.toBe('hidden');
  });

  it('calculates correct dimensions with offsets', () => {
    const topRef = React.createRef<HTMLDivElement>();
    const bottomRef = React.createRef<HTMLDivElement>();

    const { getByTestId } = render(
      <UIProvider scale={1}>
        <div id="anchordom-virtual-canvas">
          <div ref={topRef} id="top-el" />
          <div ref={bottomRef} id="bottom-el" />
          <ConstraintSpacer
            topTargetRef={topRef}
            bottomTargetRef={bottomRef}
            topOffset={10}
            bottomOffset={20}
            data-testid="spacer"
          />
        </div>
      </UIProvider>
    );

    const spacer = getByTestId('spacer');
    // top = 200 + 10 = 210
    expect(spacer.style.top).toBe('210px');
    // height = 400 - 10 - 20 = 370
    expect(spacer.style.height).toBe('370px');
  });

  it('respects minHeight', () => {
    const topRef = React.createRef<HTMLDivElement>();
    const bottomRef = React.createRef<HTMLDivElement>();

    const { getByTestId } = render(
      <UIProvider scale={1}>
        <div id="anchordom-virtual-canvas">
          <div ref={topRef} id="top-el" />
          <div ref={bottomRef} id="bottom-el" />
          <ConstraintSpacer
            topTargetRef={topRef}
            bottomTargetRef={bottomRef}
            topOffset={100}
            bottomOffset={400} // Total offset 500 > gap 400
            minHeight={50}
            data-testid="spacer"
          />
        </div>
      </UIProvider>
    );

    const spacer = getByTestId('spacer');
    // Calculated height is 400 - 100 - 400 = -100. minHeight is 50.
    expect(spacer.style.height).toBe('50px');
  });

  it('factors in scale properly', () => {
    const topRef = React.createRef<HTMLDivElement>();
    const bottomRef = React.createRef<HTMLDivElement>();

    const { getByTestId } = render(
      <UIProvider scale={2}>
        <div id="anchordom-virtual-canvas">
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

    const spacer = getByTestId('spacer');
    // top = 200 / 2 = 100
    expect(spacer.style.top).toBe('100px');
    // height = 400 / 2 = 200
    expect(spacer.style.height).toBe('200px');
  });
});
