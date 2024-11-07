import * as React from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({className, src, alt, ...props}, ref) => {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        ref={ref}
        {...props}
      />
    );
  }
);
Image.displayName = 'Image';

export {Image};
