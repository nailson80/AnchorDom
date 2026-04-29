import React, { useState } from 'react';
import type { BaseComponentProps } from '../../theme/types';
import { useAnchor } from '../../hooks/useAnchor';
import { useUIContext } from '../../context/UIContext';
import { getNineSliceStyle } from '../../utils/nineSlice';

interface ButtonProps extends BaseComponentProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  anchor,
  x,
  y,
  className,
  style,
  label,
  onClick,
  disabled = false,
}) => {
  const { theme } = useUIContext();
  const anchorStyle = useAnchor({ anchor, x, y });
  const [isActive, setIsActive] = useState(false);

  const buttonTheme = theme.components.button;
  const bgImage = isActive ? (buttonTheme.activeBackgroundImage || buttonTheme.backgroundImage) : buttonTheme.backgroundImage;
  const nineSliceStyle = getNineSliceStyle(bgImage, buttonTheme.backgroundSlice);

  const baseStyle: React.CSSProperties = {
    ...anchorStyle,
    ...nineSliceStyle,
    fontFamily: buttonTheme.fontFamily,
    fontSize: buttonTheme.fontSize,
    color: buttonTheme.color,
    padding: buttonTheme.padding,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    boxSizing: 'border-box',
    ...style,
  };

  return (
    <div
      className={className}
      style={baseStyle}
      onMouseDown={() => !disabled && setIsActive(true)}
      onMouseUp={() => !disabled && setIsActive(false)}
      onMouseLeave={() => !disabled && setIsActive(false)}
      onTouchStart={() => !disabled && setIsActive(true)}
      onTouchEnd={() => !disabled && setIsActive(false)}
      onClick={() => !disabled && onClick && onClick()}
    >
      {label && <span>{label}</span>}
    </div>
  );
};
