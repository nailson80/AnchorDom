import React from 'react';
import type { BaseComponentProps } from '../../theme/types';
import { useAnchor } from '../../hooks/useAnchor';
import { useUIContext } from '../../context/UIContext';

type ToggleProps = BaseComponentProps & {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  disabled?: boolean;
};

export const Toggle = React.forwardRef<HTMLDivElement, ToggleProps>(({
  anchor,
  x,
  y,
  className,
  style,
  toggled,
  onToggle,
  disabled = false,
  targetRef,
}, ref) => {
  const { theme } = useUIContext();
  const anchorStyle = useAnchor({ anchor, x, y, targetRef });
  const toggleTheme = theme.components.toggle;

  const containerStyle: React.CSSProperties = {
    ...anchorStyle,
    width: toggleTheme.width,
    height: toggleTheme.height,
    backgroundImage: `url(${toggleTheme.backgroundImage})`,
    backgroundSize: '100% 100%',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    position: 'absolute',
    pointerEvents: 'auto',
    ...style,
  };

  // Basic animation logic: move handle from left to right
  // Assuming square handle that is the height of the toggle
  const handleSize = toggleTheme.height;
  const handleWidth = typeof handleSize === 'number' ? handleSize : parseInt(String(handleSize), 10);
  const containerWidth = typeof toggleTheme.width === 'number' ? toggleTheme.width : parseInt(String(toggleTheme.width), 10);

  const handleX = toggled ? containerWidth - handleWidth : 0;

  const handleStyle: React.CSSProperties = {
    width: handleSize,
    height: handleSize,
    backgroundImage: `url(${toggleTheme.handleImage})`,
    backgroundSize: '100% 100%',
    position: 'absolute',
    top: 0,
    left: 0,
    transform: `translateX(${handleX}px)`,
    transition: 'transform 0.2s ease-in-out',
  };

  return (
    <div ref={ref} className={className} style={containerStyle} onClick={() => !disabled && onToggle(!toggled)}>
      <div style={handleStyle} />
    </div>
  );
});
Toggle.displayName = 'Toggle';
