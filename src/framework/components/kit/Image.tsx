import React from 'react';
import type { BaseComponentProps } from '../../theme/types';
import { useAnchor } from '../../hooks/useAnchor';

interface ImageProps extends BaseComponentProps {
  src: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
}

export const Image: React.FC<ImageProps> = ({
  anchor,
  x,
  y,
  className,
  style,
  src,
  width,
  height,
  alt = '',
}) => {
  const anchorStyle = useAnchor({ anchor, x, y });

  const imgStyle: React.CSSProperties = {
    ...anchorStyle,
    width,
    height,
    pointerEvents: 'none', // Usually icons don't need pointer events unless wrapped in a button
    ...style,
  };

  return <img className={className} style={imgStyle} src={src} alt={alt} />;
};
