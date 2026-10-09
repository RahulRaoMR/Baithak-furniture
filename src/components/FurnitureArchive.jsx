import ResponsiveImage from './ResponsiveImage.jsx';
import { imageSources } from '../utils/galleryImages.js';
import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';

const galleryImages = Object.fromEntries(Object.entries(imageSources).filter(([file]) => file.startsWith('../assets/images/gallery/')));

const images = Object.entries(galleryImages)
  .sort(([pathA], [pathB]) => {
    const aIsStudio = pathA.includes('/studio-');
    const bIsStudio = pathB.includes('/studio-');

    if (aIsStudio !== bIsStudio) return aIsStudio ? -1 : 1;
    return pathA.localeCompare(pathB);
  })
  .map(([path, src], index) => ({
    src,
    alt: path.includes('/studio-')
      ? `Baithak furniture collection, view ${index + 1}`
      : `Baithak workshop and completed furniture, view ${index + 1}`,
    label: path.includes('/studio-') ? 'Studio collection' : 'Workshop to home',
  }));

function FurnitureArchive() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const visibleImages = isExpanded ? images : images.slice(0, 18);

  useEffect(() => {
    if (selectedIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedIndex(null);
      if (event.key === 'ArrowLeft') {
        setSelectedIndex((current) => (current - 1 + images.length) % images.length);
      }
      if (event.key === 'ArrowRight') {
        setSelectedIndex((current) => (current + 1) % images.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex]);

  const showPrevious = () => {
    setSelectedIndex((current) => (current - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setSelectedIndex((current) => (current + 1) % images.length);
  };

  return (
    <section className="furniture-archive" id="archive" aria-labelledby="archive-title">
      <div className="container">
        <header className="furniture-archive__header">
          <div>
            <p className="furniture-archive__eyebrow">Workshop to home</p>
            <h2 id="archive-title">Made here. Living everywhere.</h2>
          </div>
          <div className="furniture-archive__summary">
            <p>
              A living archive of custom sofas, recliners, beds, chairs and upholstered details,
              from first build to finished room.
            </p>
            <span>{images.length} views from the Baithak studio</span>
          </div>
        </header>

        <div className="furniture-archive__grid">
          {visibleImages.map((image, index) => (
            <button
              className="furniture-archive__item"
              type="button"
              key={image.src}
              onClick={() => setSelectedIndex(index)}
              aria-label={`Open image ${index + 1} of ${images.length}`}
            >
              <ResponsiveImage src={image.src} alt={image.alt} loading="lazy" />
              <span className="furniture-archive__caption">
                <span>{String(index + 1).padStart(3, '0')}</span>
                <span>{image.label}</span>
              </span>
            </button>
          ))}
        </div>

        {!isExpanded && (
          <div className="furniture-archive__more">
            <button type="button" onClick={() => setIsExpanded(true)}>
              View the full archive
              <span>{images.length} images</span>
              <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {selectedIndex !== null && (
        <div
          className="archive-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${selectedIndex + 1} of ${images.length}`}
          onClick={() => setSelectedIndex(null)}
        >
          <div className="archive-viewer__topbar">
            <p>
              <span>{images[selectedIndex].label}</span>
              {String(selectedIndex + 1).padStart(3, '0')} / {String(images.length).padStart(3, '0')}
            </p>
            <button type="button" aria-label="Close image viewer" onClick={() => setSelectedIndex(null)}>
              <X size={22} strokeWidth={1.7} />
            </button>
          </div>

          <button
            className="archive-viewer__nav archive-viewer__nav--previous"
            type="button"
            aria-label="View previous image"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
          >
            <ChevronLeft size={25} strokeWidth={1.6} />
          </button>

          <ResponsiveImage
            className="archive-viewer__image" loading="eager"
            src={images[selectedIndex].src}
            alt={images[selectedIndex].alt}
            onClick={(event) => event.stopPropagation()}
          />

          <button
            className="archive-viewer__nav archive-viewer__nav--next"
            type="button"
            aria-label="View next image"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
          >
            <ChevronRight size={25} strokeWidth={1.6} />
          </button>
        </div>
      )}
    </section>
  );
}

export default FurnitureArchive;
