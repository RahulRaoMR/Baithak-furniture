import ResponsiveImage from './ResponsiveImage.jsx';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import useDialogFocus from '../hooks/useDialogFocus.js';

function ProductGallery({ product }) {
  const images = [{ src: product.heroImage, alt: product.alt }, ...product.gallery]
    .filter((image, index, entries) => image.src && entries.findIndex((entry) => entry.src === image.src) === index);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useDialogFocus(isOpen);
  const selectedImage = images[selectedIndex];

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
      } else if (images.length > 1 && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        const direction = event.key === 'ArrowLeft' ? -1 : 1;
        setSelectedIndex((index) => (index + direction + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, isOpen]);

  return (
    <div className="product-gallery">
      <button
        className="product-gallery__main"
        type="button"
        aria-label={`Open full image of ${product.name}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        title="Open full image"
        onClick={() => setIsOpen(true)}
      >
        <ResponsiveImage loading="eager" src={selectedImage.src} sizes="(max-width: 767px) 100vw, 55vw" alt={selectedImage.alt} fetchPriority="high" decoding="async" />
        <span className="product-gallery__zoom" aria-hidden="true"><ZoomIn size={20} /></span>
      </button>

      {images.length > 1 && (
        <div className="product-gallery__thumbnails" role="group" aria-label={`${product.name} photographs`}>
          {images.map((image, index) => (
            <button
              type="button"
              key={image.src}
              aria-label={`Show ${product.name} photograph ${index + 1}`}
              aria-pressed={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            >
              <ResponsiveImage src={image.src} alt={image.alt} loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          className="archive-viewer product-gallery__viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name}: photograph ${selectedIndex + 1} of ${images.length}`}
          ref={dialogRef}
          tabIndex={-1}
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <div className="archive-viewer__topbar">
            <p><span>{product.name}</span>{selectedIndex + 1} / {images.length}</p>
            <button type="button" aria-label="Close image viewer" title="Close image viewer" onClick={() => setIsOpen(false)}>
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          {images.length > 1 && (
            <button
              className="archive-viewer__nav archive-viewer__nav--previous"
              type="button"
              aria-label="View previous photograph"
              title="Previous photograph"
              onClick={() => setSelectedIndex((index) => (index - 1 + images.length) % images.length)}
            >
              <ChevronLeft size={25} aria-hidden="true" />
            </button>
          )}
          <ResponsiveImage className="archive-viewer__image" loading="eager" src={selectedImage.src} alt={selectedImage.alt} decoding="async" />
          {images.length > 1 && (
            <button
              className="archive-viewer__nav archive-viewer__nav--next"
              type="button"
              aria-label="View next photograph"
              title="Next photograph"
              onClick={() => setSelectedIndex((index) => (index + 1) % images.length)}
            >
              <ChevronRight size={25} aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
