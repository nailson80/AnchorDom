import React from 'react';
import type { BaseComponentProps } from '../../theme/types';
import { useAnchor } from '../../hooks/useAnchor';
import { useUIContext } from '../../context/UIContext';

type LabelProps = BaseComponentProps & {
  text: string;
};

export const Label = React.forwardRef<HTMLDivElement, LabelProps>(({
  anchor,
  x,
  y,
  className,
  style,
  text,
  targetRef,
}, ref) => {
  const { theme } = useUIContext();
  const anchorStyle = useAnchor({ anchor, x, y, targetRef });
  const labelTheme = theme.components.label;

  const baseStyle: React.CSSProperties = {
    ...anchorStyle,
    fontFamily: labelTheme.fontFamily,
    fontSize: labelTheme.fontSize,
    color: labelTheme.color,
    textShadow: labelTheme.textShadow,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    ...style,
  };

  return (
    <div ref={ref} className={className} style={baseStyle}>
      {text}
    </div>
  );
});
Label.displayName = 'Label';
