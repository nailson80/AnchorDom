import React from 'react';
import type { BaseComponentProps } from '../../theme/types';
import { useAnchor } from '../../hooks/useAnchor';

type ImageProps = BaseComponentProps & {
  src: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
};

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(({
  anchor,
  x,
  y,
  className,
  style,
  src,
  width,
  height,
  alt = '',
  targetRef,
}, ref) => {
  const anchorStyle = useAnchor({ anchor, x, y, targetRef });

  const imgStyle: React.CSSProperties = {
    ...anchorStyle,
    width,
    height,
    pointerEvents: 'none', // Usually icons don't need pointer events unless wrapped in a button
    ...style,
  };

  return <img ref={ref} className={className} style={imgStyle} src={src} alt={alt} />;
});
Image.displayName = 'Image';
