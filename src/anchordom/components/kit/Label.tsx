import React from 'react';
import type { BaseComponentProps } from '../../theme/types';
import { useAnchor } from '../../hooks/useAnchor';
import { useUIContext } from '../../context/UIContext';

interface LabelProps extends BaseComponentProps {
  text: string;
}

export const Label: React.FC<LabelProps> = ({
  anchor,
  x,
  y,
  className,
  style,
  text,
}) => {
  const { theme } = useUIContext();
  const anchorStyle = useAnchor({ anchor, x, y });
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
    <div className={className} style={baseStyle}>
      {text}
    </div>
  );
};
