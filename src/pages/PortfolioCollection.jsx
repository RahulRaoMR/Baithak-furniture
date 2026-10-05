import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const galleryImages = import.meta.glob('../assets/images/gallery/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
});

const woodworkIds = [
  98, 100, 101, 102, 103, 84, 97, 99, 10, 12, 39, 40, 42, 47, 48, 49, 50, 51, 52,
  55, 56, 57, 58, 60, 71, 75, 76, 77, 78, 79, 82, 83, 85, 109, 110, 111, 112,
  113, 114, 115, 121, 122, 133,
];

const getImage = (prefix, id, extension) => {
  const fileName = `${prefix}-${String(id).padStart(3, '0')}.${extension}`;
  return galleryImages[`../assets/images/gallery/${fileName}`];
};

const buildImages = (variant) => {
  if (variant === 'woodwork') {
    return woodworkIds
      .map((id) => ({ src: getImage('archive', id, 'jpg'), label: 'Custom woodwork' }))
      .filter((image) => image.src);
  }

  const studio = Array.from({ length: 14 }, (_, index) => ({
    src: getImage('studio', index + 1, 'png'),
    label: 'Studio collection',
  }));
  const archive = Array.from({ length: 137 }, (_, index) => ({
    src: getImage('archive', index + 2, 'jpg'),
    label: 'Project archive',
  }));

  return [...studio, ...archive].filter((image) => image.src);
};

const pageContent = {
  woodwork: {
    eyebrow: 'Custom woodwork & upholstered walls',
    title: 'Built into the way your room works.',
    intro:
      'Explore upholstered beds, headboards, wall treatments and made-to-measure details shaped around the architecture of each room.',
    sectionEyebrow: 'Measured, made and installed',
    sectionTitle: 'Custom woodwork',
    viewerTitle: 'Custom woodwork',
    countLabel: 'completed details',
    ctaPrompt: 'Have a wall, bed or room detail in mind?',
    ctaTitle: 'Let us build it around you.',
    ctaLabel: 'Discuss My Project',
    documentTitle: 'Custom Woodwork & Upholstered Walls | Baithak',
  },
  work: {
    eyebrow: 'The Baithak portfolio',
    title: 'Furniture made for real spaces.',
    intro:
      'A broad view of furniture developed in the studio, built in the workshop and placed in homes, offices and hospitality spaces.',
    sectionEyebrow: 'From workshop to home',
    sectionTitle: 'Our work',
    viewerTitle: 'Baithak projects',
    countLabel: 'project views',
    ctaPrompt: 'Ready to create something for your space?',
    ctaTitle: 'Start with a conversation.',
    ctaLabel: 'Start a Project',
    documentTitle: 'Our Furniture Projects | Baithak',
  },
};

function PortfolioCollection({ variant }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const content = pageContent[variant];
  const images = buildImages(variant);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = content.documentTitle;
  }, [content.documentTitle]);

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
  }, [images.length, selectedIndex]);

  const showPrevious = () => {
    setSelectedIndex((current) => (current - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setSelectedIndex((current) => (current + 1) % images.length);
  };

  return (
    <>
      <Navbar />
      <main className={`sofa-page portfolio-page portfolio-page--${variant}`}>
        <section className="sofa-hero" aria-labelledby={`${variant}-page-title`}>
          <button
            className="sofa-hero__image"
            type="button"
            onClick={() => setSelectedIndex(0)}
            aria-label={`Open featured ${content.viewerTitle.toLowerCase()} image`}
          >
            <img src={images[0].src} alt={`Featured ${content.viewerTitle.toLowerCase()} by Baithak`} />
            <span>View full image</span>
          </button>
          <div className="container sofa-hero__copy">
            <p>{content.eyebrow}</p>
            <h1 id={`${variant}-page-title`}>{content.title}</h1>
            <div className="sofa-hero__intro">
              <span>
                {images.length} {content.countLabel}
              </span>
              <p>{content.intro}</p>
            </div>
          </div>
        </section>

        <section className="sofa-catalogue" aria-labelledby={`${variant}-catalogue-title`}>
          <div className="container">
            <header className="sofa-catalogue__header">
              <div>
                <p>{content.sectionEyebrow}</p>
                <h2 id={`${variant}-catalogue-title`}>{content.sectionTitle}</h2>
              </div>
              <p>Click any image to view it in full.</p>
            </header>

            <div className="sofa-catalogue__grid">
              {images.slice(1).map((image, index) => (
                <button
                  className="sofa-catalogue__item"
                  type="button"
                  key={image.src}
                  onClick={() => setSelectedIndex(index + 1)}
                  aria-label={`Open image ${index + 2} of ${images.length}`}
                >
                  <img
                    src={image.src}
                    alt={`${content.viewerTitle} image ${index + 2}`}
                    loading="lazy"
                  />
                  <span>
                    <span>{String(index + 2).padStart(3, '0')}</span>
                    {image.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="sofa-catalogue__cta">
              <div>
                <p>{content.ctaPrompt}</p>
                <h2>{content.ctaTitle}</h2>
              </div>
              <a className="button button-primary" href="/contact#enquiry">
                {content.ctaLabel} <ArrowRight size={18} strokeWidth={1.7} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

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
              <span>{content.viewerTitle}</span>
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
          <img
            className="archive-viewer__image"
            src={images[selectedIndex].src}
            alt={`${content.viewerTitle} image ${selectedIndex + 1}`}
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
    </>
  );
}

export default PortfolioCollection;
