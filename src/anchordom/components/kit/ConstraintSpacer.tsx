import React, { useLayoutEffect, useState, forwardRef } from 'react';
import { useUIContext } from '../../context/UIContext';
import { useAnchor } from '../../hooks/useAnchor';
import type { AnchorPoint } from '../../theme/types';

export interface ConstraintSpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  topTargetRef: React.RefObject<HTMLElement | null>;
  bottomTargetRef: React.RefObject<HTMLElement | null>;
  topOffset?: number;
  bottomOffset?: number;
  minHeight?: number;
  width?: number | string;
  anchor?: AnchorPoint;
  x?: number;
}

export const ConstraintSpacer = forwardRef<HTMLDivElement, ConstraintSpacerProps>(
  (
    {
      topTargetRef,
      bottomTargetRef,
      topOffset = 0,
      bottomOffset = 0,
      minHeight = 0,
      width = '100%',
      anchor = 'TOP_CENTER',
      x = 0,
      ...rest
    },
    ref
  ) => {
    const { scale } = useUIContext();
    const [style, setStyle] = useState<{ top: string; height: string; visibility?: 'hidden' | 'visible' }>({
      top: '0px',
      height: '0px',
      visibility: 'hidden',
    });

    const anchorStyle = useAnchor({ anchor, x, y: 0, useSafeArea: false });

    useLayoutEffect(() => {
      const updateMetrics = () => {
        if (!topTargetRef?.current || !bottomTargetRef?.current) {
          setStyle({ top: '0px', height: '0px', visibility: 'hidden' });
          return;
        }

        const topEl = topTargetRef.current;
        const bottomEl = bottomTargetRef.current;
        const canvasEl = document.getElementById('anchordom-virtual-canvas');

        if (topEl && bottomEl && canvasEl) {
          const topRect = topEl.getBoundingClientRect();
          const bottomRect = bottomEl.getBoundingClientRect();
          const canvasRect = canvasEl.getBoundingClientRect();

          // Physical distance from canvas top to the bottom of the top target
          const physicalTop = topRect.bottom - canvasRect.top;
          // Physical distance between bottom of top target and top of bottom target
          const physicalGap = bottomRect.top - topRect.bottom;

          // Convert to virtual pixels
          const virtualTop = physicalTop / scale;
          const virtualGap = physicalGap / scale;

          // Apply offsets
          const finalTop = virtualTop + topOffset;
          let finalHeight = virtualGap - topOffset - bottomOffset;

          if (finalHeight < minHeight) {
            finalHeight = minHeight;
          }

          setStyle({
            top: `${finalTop}px`,
            height: `${finalHeight}px`,
            visibility: 'visible',
          });
        }
      };

      // Delay to ensure refs are populated after initial render and elements are laid out
      const timeout = setTimeout(updateMetrics, 50);

      updateMetrics();

      window.addEventListener('resize', updateMetrics);
      window.addEventListener('scroll', updateMetrics, true);

      return () => {
        clearTimeout(timeout);
        window.removeEventListener('resize', updateMetrics);
        window.removeEventListener('scroll', updateMetrics, true);
      };
    }, [topTargetRef, bottomTargetRef, topOffset, bottomOffset, minHeight, scale]);

    const { style: restStyle, ...otherProps } = rest;

    return (
      <div
        ref={ref}
        style={{
          ...anchorStyle,
          top: style.top,
          height: style.height,
          width,
          visibility: style.visibility === 'hidden' ? 'hidden' : anchorStyle.visibility,
          pointerEvents: 'none',
          ...restStyle,
        }}
        {...otherProps}
      />
    );
  }
);

ConstraintSpacer.displayName = 'ConstraintSpacer';
