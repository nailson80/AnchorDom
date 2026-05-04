import { renderHook } from '@testing-library/react';
import { useAnchor } from './useAnchor';
import { UIProvider } from '../context/UIContext';
import React from 'react';

// Mock UIContext Provider for testing
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <UIProvider>{children}</UIProvider>
);

describe('useAnchor hook', () => {
  it('should default to TOP_LEFT anchor and 0 offsets', () => {
    const { result } = renderHook(() => useAnchor({}), { wrapper });
    expect(result.current.left).toBe('0%');
    expect(result.current.top).toBe('0%');
    expect(result.current.transform).toBe('translate(calc(0% + 0px), calc(0% + 0px))');
  });

  it('should handle different anchor points', () => {
    const { result } = renderHook(() => useAnchor({ anchor: 'BOTTOM_RIGHT' }), { wrapper });
    expect(result.current.left).toBe('100%');
    expect(result.current.top).toBe('100%');
    expect(result.current.transform).toBe('translate(calc(-100% + 0px), calc(-100% + 0px))');
  });

  it('should handle offsets', () => {
    const { result } = renderHook(() => useAnchor({ anchor: 'MIDDLE_CENTER', x: 50, y: -20 }), { wrapper });
    expect(result.current.left).toBe('50%');
    expect(result.current.top).toBe('50%');
    expect(result.current.transform).toBe('translate(calc(-50% + 50px), calc(-50% + -20px))');
  });

  it('should include safe areas when useSafeArea is true', () => {
    const { result } = renderHook(() => useAnchor({ anchor: 'TOP_LEFT', useSafeArea: true }), { wrapper });
    expect(result.current.transform).toBe('translate(calc(0% + 0px + var(--safe-left, 0px)), calc(0% + 0px + var(--safe-top, 0px)))');
  });

  it('should not include safe areas when targetRef is present', () => {
    const targetRef = { current: document.createElement('div') } as React.RefObject<HTMLElement | null>;
    const { result } = renderHook(() => useAnchor({ anchor: 'TOP_LEFT', targetRef }), { wrapper });

    // Initially hidden while measuring
    expect(result.current.visibility).toBe('hidden');
    expect(result.current.transform).toBe('translate(calc(0% + 0px), calc(0% + 0px))');
  });
});