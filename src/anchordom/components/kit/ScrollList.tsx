import React from 'react';
import type { BaseComponentProps } from '../../theme/types';
import { useAnchor } from '../../hooks/useAnchor';
import { useUIContext } from '../../context/UIContext';

interface ScrollListProps extends BaseComponentProps {
  width: number | string;
  height: number | string;
  horizontal?: boolean;
  children: React.ReactNode;
}

export const ScrollList = React.forwardRef<HTMLDivElement, ScrollListProps>(({
  anchor,
  x,
  y,
  className,
  style,
  width,
  height,
  horizontal = false,
  children,
  targetRef,
}, ref) => {
  const { theme } = useUIContext();
  const anchorStyle = useAnchor({ anchor, x, y, targetRef });
  const listTheme = theme.components.scrollList;

  const containerStyle: React.CSSProperties = {
    ...anchorStyle,
    width,
    height,
    backgroundColor: listTheme.backgroundColor,
    padding: listTheme.padding,
    overflowX: horizontal ? 'auto' : 'hidden',
    overflowY: horizontal ? 'hidden' : 'auto',
    boxSizing: 'border-box',
    // Custom scrollbar styling might be needed depending on browser,
    // but basic overflow works for DOM overlay
    pointerEvents: 'auto',
    ...style,
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: horizontal ? 'row' : 'column',
    gap: '10px',
  };

  return (
    <div ref={ref} className={className} style={containerStyle}>
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
});
ScrollList.displayName = 'ScrollList';
