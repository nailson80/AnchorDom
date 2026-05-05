import React, { useState, useMemo } from 'react';
import type { BaseComponentProps } from '../../theme/types';
import { useAnchor } from '../../hooks/useAnchor';
import { useUIContext } from '../../context/UIContext';
import { getNineSliceStyle } from '../../utils/nineSlice';

type ButtonProps = BaseComponentProps & {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const Button = React.forwardRef<HTMLDivElement, ButtonProps>(({
  anchor,
  x,
  y,
  className,
  style,
  label,
  onClick,
  disabled = false,
  targetRef,
}, ref) => {
  const { theme } = useUIContext();
  const anchorStyle = useAnchor({ anchor, x, y, targetRef });
  const [isActive, setIsActive] = useState(false);

  const buttonTheme = theme.components.button;
  const bgImage = isActive ? (buttonTheme.activeBackgroundImage || buttonTheme.backgroundImage) : buttonTheme.backgroundImage;

  const nineSliceStyle = useMemo(
    () => getNineSliceStyle(bgImage, buttonTheme.backgroundSlice),
    [bgImage, buttonTheme.backgroundSlice]
  );

  const baseStyle: React.CSSProperties = useMemo(() => ({
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
    pointerEvents: 'auto',
    ...style,
  }), [
    anchorStyle,
    nineSliceStyle,
    buttonTheme.fontFamily,
    buttonTheme.fontSize,
    buttonTheme.color,
    buttonTheme.padding,
    disabled,
    style,
  ]);

  return (
    <div
      ref={ref}
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
});
Button.displayName = 'Button';
