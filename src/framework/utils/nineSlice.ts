import React from 'react';

/**
 * Generates a React.CSSProperties object for a nine-slice scalable background.
 *
 * @param imageUrl - Local path to the image
 * @param slice - CSS border-image-slice string (e.g., '10 10 10 10 fill' or '25%')
 * @param width - CSS border-image-width string (optional, defaults to matching slice or auto)
 * @returns React.CSSProperties
 */
export function getNineSliceStyle(
  imageUrl?: string,
  slice?: string,
  width?: string | number
): React.CSSProperties {
  if (!imageUrl || !slice) return {};

  return {
    borderStyle: 'solid',
    borderWidth: width !== undefined ? width : 'auto',
    borderImageSource: `url(${imageUrl})`,
    borderImageSlice: slice,
    borderImageWidth: width !== undefined ? width : 'auto',
    // borderImageRepeat: 'stretch' is usually default, but we can specify if needed
    // Transparent background so the border image "fill" handles it if provided
    backgroundColor: 'transparent',
  };
}
