import React from 'react';
import type { AnchorPoint } from '../theme/types';

interface UseAnchorOptions {
  anchor?: AnchorPoint;
  x?: number;
  y?: number;
  useSafeArea?: boolean;
}

export function useAnchor({
  anchor = 'TOP_LEFT',
  x = 0,
  y = 0,
  useSafeArea = false,
}: UseAnchorOptions): React.CSSProperties {
  let left = '0%';
  let top = '0%';
  let translateX = '-0%';
  let translateY = '-0%';

  let safeAreaX = '';
  let safeAreaY = '';

  switch (anchor) {
    case 'TOP_LEFT':
      left = '0%'; top = '0%';
      translateX = '0%'; translateY = '0%';
      if (useSafeArea) { safeAreaX = 'var(--safe-left, 0px)'; safeAreaY = 'var(--safe-top, 0px)'; }
      break;
    case 'TOP_CENTER':
      left = '50%'; top = '0%';
      translateX = '-50%'; translateY = '0%';
      if (useSafeArea) { safeAreaY = 'var(--safe-top, 0px)'; }
      break;
    case 'TOP_RIGHT':
      left = '100%'; top = '0%';
      translateX = '-100%'; translateY = '0%';
      if (useSafeArea) { safeAreaX = 'calc(-1 * var(--safe-right, 0px))'; safeAreaY = 'var(--safe-top, 0px)'; }
      break;
    case 'MIDDLE_LEFT':
      left = '0%'; top = '50%';
      translateX = '0%'; translateY = '-50%';
      if (useSafeArea) { safeAreaX = 'var(--safe-left, 0px)'; }
      break;
    case 'MIDDLE_CENTER':
      left = '50%'; top = '50%';
      translateX = '-50%'; translateY = '-50%';
      break;
    case 'MIDDLE_RIGHT':
      left = '100%'; top = '50%';
      translateX = '-100%'; translateY = '-50%';
      if (useSafeArea) { safeAreaX = 'calc(-1 * var(--safe-right, 0px))'; }
      break;
    case 'BOTTOM_LEFT':
      left = '0%'; top = '100%';
      translateX = '0%'; translateY = '-100%';
      if (useSafeArea) { safeAreaX = 'var(--safe-left, 0px)'; safeAreaY = 'calc(-1 * var(--safe-bottom, 0px))'; }
      break;
    case 'BOTTOM_CENTER':
      left = '50%'; top = '100%';
      translateX = '-50%'; translateY = '-100%';
      if (useSafeArea) { safeAreaY = 'calc(-1 * var(--safe-bottom, 0px))'; }
      break;
    case 'BOTTOM_RIGHT':
      left = '100%'; top = '100%';
      translateX = '-100%'; translateY = '-100%';
      if (useSafeArea) { safeAreaX = 'calc(-1 * var(--safe-right, 0px))'; safeAreaY = 'calc(-1 * var(--safe-bottom, 0px))'; }
      break;
  }

  // Combine translations, offsets, and safe areas
  const tx = safeAreaX ? `calc(${translateX} + ${x}px + ${safeAreaX})` : `calc(${translateX} + ${x}px)`;
  const ty = safeAreaY ? `calc(${translateY} + ${y}px + ${safeAreaY})` : `calc(${translateY} + ${y}px)`;

  return {
    position: 'absolute',
    left,
    top,
    transform: `translate(${tx}, ${ty})`,
  };
}
