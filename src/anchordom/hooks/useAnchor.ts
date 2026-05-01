import React, { useState, useLayoutEffect } from 'react';
import type { AnchorPoint } from '../theme/types';
import { useUIContext } from '../context/UIContext';

interface UseAnchorOptions {
  anchor?: AnchorPoint;
  x?: number;
  y?: number;
  useSafeArea?: boolean;
  targetRef?: React.RefObject<HTMLElement | null>;
}

export function useAnchor({
  anchor = 'TOP_LEFT',
  x = 0,
  y = 0,
  useSafeArea = false,
  targetRef,
}: UseAnchorOptions): React.CSSProperties {
  const { scale } = useUIContext();
  const [targetPos, setTargetPos] = useState<{ left: string; top: string } | null>(null);

  useLayoutEffect(() => {
    if (!targetRef?.current) {
      setTargetPos(null);
      return;
    }

    const updatePosition = () => {
      const targetElement = targetRef.current;
      const canvasElement = document.getElementById('anchordom-virtual-canvas');

      if (targetElement && canvasElement) {
        const targetRect = targetElement.getBoundingClientRect();
        const canvasRect = canvasElement.getBoundingClientRect();

        // Calculate position relative to the virtual canvas, unscaled
        const relativeX = (targetRect.left - canvasRect.left) / scale;
        const relativeY = (targetRect.top - canvasRect.top) / scale;
        const width = targetRect.width / scale;
        const height = targetRect.height / scale;

        let leftPx = relativeX;
        let topPx = relativeY;

        switch (anchor) {
          case 'TOP_LEFT':
            leftPx = relativeX; topPx = relativeY;
            break;
          case 'TOP_CENTER':
            leftPx = relativeX + width / 2; topPx = relativeY;
            break;
          case 'TOP_RIGHT':
            leftPx = relativeX + width; topPx = relativeY;
            break;
          case 'MIDDLE_LEFT':
            leftPx = relativeX; topPx = relativeY + height / 2;
            break;
          case 'MIDDLE_CENTER':
            leftPx = relativeX + width / 2; topPx = relativeY + height / 2;
            break;
          case 'MIDDLE_RIGHT':
            leftPx = relativeX + width; topPx = relativeY + height / 2;
            break;
          case 'BOTTOM_LEFT':
            leftPx = relativeX; topPx = relativeY + height;
            break;
          case 'BOTTOM_CENTER':
            leftPx = relativeX + width / 2; topPx = relativeY + height;
            break;
          case 'BOTTOM_RIGHT':
            leftPx = relativeX + width; topPx = relativeY + height;
            break;
        }

        setTargetPos({ left: `${leftPx}px`, top: `${topPx}px` });
      }
    };

    updatePosition();

    // Re-calculate on resize and scroll, as target positions could change
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true); // true to catch scroll events from any scrollable child

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [targetRef, anchor, scale]);

  let left = '0%';
  let top = '0%';
  let translateX = '-0%';
  let translateY = '-0%';

  let safeAreaX = '';
  let safeAreaY = '';

  switch (anchor) {
    case 'TOP_LEFT':
      translateX = '0%'; translateY = '0%';
      if (useSafeArea && !targetRef) { safeAreaX = 'var(--safe-left, 0px)'; safeAreaY = 'var(--safe-top, 0px)'; }
      break;
    case 'TOP_CENTER':
      left = '50%';
      translateX = '-50%'; translateY = '0%';
      if (useSafeArea && !targetRef) { safeAreaY = 'var(--safe-top, 0px)'; }
      break;
    case 'TOP_RIGHT':
      left = '100%';
      translateX = '-100%'; translateY = '0%';
      if (useSafeArea && !targetRef) { safeAreaX = 'calc(-1 * var(--safe-right, 0px))'; safeAreaY = 'var(--safe-top, 0px)'; }
      break;
    case 'MIDDLE_LEFT':
      top = '50%';
      translateX = '0%'; translateY = '-50%';
      if (useSafeArea && !targetRef) { safeAreaX = 'var(--safe-left, 0px)'; }
      break;
    case 'MIDDLE_CENTER':
      left = '50%'; top = '50%';
      translateX = '-50%'; translateY = '-50%';
      break;
    case 'MIDDLE_RIGHT':
      left = '100%'; top = '50%';
      translateX = '-100%'; translateY = '-50%';
      if (useSafeArea && !targetRef) { safeAreaX = 'calc(-1 * var(--safe-right, 0px))'; }
      break;
    case 'BOTTOM_LEFT':
      top = '100%';
      translateX = '0%'; translateY = '-100%';
      if (useSafeArea && !targetRef) { safeAreaX = 'var(--safe-left, 0px)'; safeAreaY = 'calc(-1 * var(--safe-bottom, 0px))'; }
      break;
    case 'BOTTOM_CENTER':
      left = '50%'; top = '100%';
      translateX = '-50%'; translateY = '-100%';
      if (useSafeArea && !targetRef) { safeAreaY = 'calc(-1 * var(--safe-bottom, 0px))'; }
      break;
    case 'BOTTOM_RIGHT':
      left = '100%'; top = '100%';
      translateX = '-100%'; translateY = '-100%';
      if (useSafeArea && !targetRef) { safeAreaX = 'calc(-1 * var(--safe-right, 0px))'; safeAreaY = 'calc(-1 * var(--safe-bottom, 0px))'; }
      break;
  }

  // Combine translations, offsets, and safe areas
  const tx = safeAreaX ? `calc(${translateX} + ${x}px + ${safeAreaX})` : `calc(${translateX} + ${x}px)`;
  const ty = safeAreaY ? `calc(${translateY} + ${y}px + ${safeAreaY})` : `calc(${translateY} + ${y}px)`;

  const style: React.CSSProperties = {
    position: 'absolute',
    transform: `translate(${tx}, ${ty})`,
  };

  if (targetRef) {
    if (targetPos) {
      style.left = targetPos.left;
      style.top = targetPos.top;
    } else {
      // Hide while initially calculating to prevent layout jump
      style.visibility = 'hidden';
    }
  } else {
    style.left = left;
    style.top = top;
  }

  return style;
}
