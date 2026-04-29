import React from 'react';
import type { BaseComponentProps } from '../../theme/types';
import { useAnchor } from '../../hooks/useAnchor';
import { useUIContext } from '../../context/UIContext';
import { getNineSliceStyle } from '../../utils/nineSlice';

interface ProgressBarProps extends BaseComponentProps {
  progress: number; // 0 to 1
  width: number | string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  anchor,
  x,
  y,
  className,
  style,
  progress,
  width,
}) => {
  const { theme } = useUIContext();
  const anchorStyle = useAnchor({ anchor, x, y });
  const pbTheme = theme.components.progressBar;

  const clampedProgress = Math.max(0, Math.min(1, progress));

  const trackStyle: React.CSSProperties = {
    ...anchorStyle,
    ...getNineSliceStyle(pbTheme.trackImage, pbTheme.trackSlice),
    width,
    height: pbTheme.height,
    boxSizing: 'border-box',
    position: 'absolute', // because anchorStyle provides position
    ...style,
  };

  const fillStyle: React.CSSProperties = {
    ...getNineSliceStyle(pbTheme.fillImage, pbTheme.fillSlice),
    width: `${clampedProgress * 100}%`,
    height: '100%',
    boxSizing: 'border-box',
    transition: 'width 0.2s ease-out',
  };

  return (
    <div className={className} style={trackStyle}>
      <div style={fillStyle} />
    </div>
  );
};
