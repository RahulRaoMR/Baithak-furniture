import { imageDetails } from '../utils/images.js';

function ResponsiveImage({ src, sizes = '100vw', mobileCrop = false, loading = 'lazy', decoding = 'async', ...props }) {
  const image = imageDetails[src];
  const img = <img src={src} width={image?.width} height={image?.height} loading={loading} decoding={decoding} {...props} />;
  if (!image?.variants) return img;
  return (
    <picture className="responsive-picture">
      {mobileCrop && image.mobile && (
        <>
          <source media="(max-width: 767px)" type="image/webp" srcSet={image.mobile.webp} />
          <source media="(max-width: 767px)" type="image/jpeg" srcSet={image.mobile.src} />
        </>
      )}
      <source type="image/webp" srcSet={image.variants.map(variant => `${variant.src} ${variant.width}w`).join(', ')} sizes={sizes} />
      {img}
    </picture>
  );
}

export default ResponsiveImage;
