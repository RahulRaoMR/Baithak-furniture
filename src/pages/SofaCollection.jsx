import ResponsiveImage from '../components/ResponsiveImage.jsx';
import { imageSources } from '../utils/galleryImages.js';
import { galleryImageSizes } from '../utils/images.js';
import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import useDialogFocus from '../hooks/useDialogFocus.js';

const galleryImages = Object.fromEntries(Object.entries(imageSources).filter(([file]) => file.startsWith('../assets/images/gallery/')));

const studioSofaIds = [4, 6, 10, 11, 12, 13];
const archiveSofaIds = [
  2, 3, 4, 5, 6, 7, 8, 9, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
  26, 27, 28, 29, 30, 31, 34, 35, 36, 37, 38, 46, 54, 59, 61, 62,
  63, 64, 74, 80, 81, 86, 87, 88, 89, 90, 91, 92, 93, 94,
  104, 105, 106, 108, 116, 117, 123, 124, 128, 129, 130, 132, 134,
  135, 136, 137, 138,
];

const getImage = (prefix, id, extension) => {
  const fileName = `${prefix}-${String(id).padStart(3, '0')}.${extension}`;
  return galleryImages[`../assets/images/gallery/${fileName}`];
};

const sofas = [
  ...studioSofaIds.map((id) => ({
    src: getImage('studio', id, 'png'),
    label: 'Studio collection',
  })),
  ...archiveSofaIds.map((id) => ({
    src: getImage('archive', id, 'jpg'),
    label: 'Custom sofa archive',
  })),
].filter((image) => image.src);

function SofaCollection() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const isViewerOpen = selectedIndex !== null;
  const dialogRef = useDialogFocus(isViewerOpen);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isViewerOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setSelectedIndex(null);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setSelectedIndex((current) => (current - 1 + sofas.length) % sofas.length);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setSelectedIndex((current) => (current + 1) % sofas.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isViewerOpen]);

  const showPrevious = () => {
    setSelectedIndex((current) => (current - 1 + sofas.length) % sofas.length);
  };

  const showNext = () => {
    setSelectedIndex((current) => (current + 1) % sofas.length);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main className="sofa-page" id="main-content" tabIndex={-1}>
        <section className="sofa-hero" aria-labelledby="sofa-page-title">
          <button
            className="sofa-hero__image"
            type="button"
            onClick={() => setSelectedIndex(0)}
            aria-label="Open featured sofa image"
          >
            <ResponsiveImage loading="eager" src={sofas[0].src} sizes="(max-width: 1024px) 1900px, 100vw" alt="Baithak custom sofa in a finished interior" fetchPriority="high" />
          </button>
          <div className="container sofa-hero__copy">
            <p>Custom sofas &amp; sectionals</p>
            <h1 id="sofa-page-title">Made for the way you settle in.</h1>
            <div className="sofa-hero__intro">
              <span>{sofas.length} photographs</span>
              <p>
                Explore sofa forms, sizes and finishes, then discuss your room, comfort and
                upholstery preferences with Baithak.
              </p>
            </div>
          </div>
        </section>

        <section className="sofa-catalogue" aria-labelledby="sofa-catalogue-title">
          <div className="container">
            <header className="sofa-catalogue__header">
              <div>
                <p>Selected and bespoke</p>
                <h2 id="sofa-catalogue-title">All sofas</h2>
              </div>
              <p>Click any image to view it in full.</p>
            </header>

            <div className="sofa-catalogue__grid">
              {sofas.slice(1).map((sofa, index) => (
                <button
                  className="sofa-catalogue__item"
                  type="button"
                  key={sofa.src}
                  onClick={() => setSelectedIndex(index + 1)}
                  title="Open full photograph"
                >
                  <ResponsiveImage
                    src={sofa.src}
                    sizes={galleryImageSizes(sofa.src)}
                    alt={`Baithak custom sofa design ${index + 2}`}
                    loading="lazy"
                  />
                  <span>
                    <span>{String(index + 2).padStart(2, '0')}</span>
                    {sofa.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="sofa-catalogue__cta">
              <div>
                <p>Have a size, colour or reference in mind?</p>
                <h2>Let&apos;s make it yours.</h2>
              </div>
              <a className="button button-primary" href="/contact#enquiry">
                Design My Sofa <ArrowRight size={18} strokeWidth={1.7} />
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
          aria-label={`Sofa ${selectedIndex + 1} of ${sofas.length}`}
          ref={dialogRef}
          tabIndex={-1}
          onClick={() => setSelectedIndex(null)}
        >
          <div className="archive-viewer__topbar">
            <p>
              <span>Sofas &amp; sectionals</span>
              {String(selectedIndex + 1).padStart(2, '0')} / {String(sofas.length).padStart(2, '0')}
            </p>
            <button type="button" aria-label="Close image viewer" onClick={() => setSelectedIndex(null)}>
              <X size={22} strokeWidth={1.7} />
            </button>
          </div>
          <button
            className="archive-viewer__nav archive-viewer__nav--previous"
            type="button"
            aria-label="View previous sofa"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
          >
            <ChevronLeft size={25} strokeWidth={1.6} />
          </button>
          <ResponsiveImage
            className="archive-viewer__image" loading="eager"
            src={sofas[selectedIndex].src}
            alt={`Baithak custom sofa design ${selectedIndex + 1}`}
            onClick={(event) => event.stopPropagation()}
          />
          <button
            className="archive-viewer__nav archive-viewer__nav--next"
            type="button"
            aria-label="View next sofa"
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

export default SofaCollection;
