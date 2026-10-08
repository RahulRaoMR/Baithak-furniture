import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, MapPin, X, ZoomIn } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import useDialogFocus from '../hooks/useDialogFocus.js';
import { contactInfo } from '../data/contact.js';
import { projects } from '../data/projects.js';
import '../styles/project-detail.css';

function ProjectDetailPage({ project }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const isViewerOpen = selectedIndex !== null;
  const dialogRef = useDialogFocus(isViewerOpen);
  const images = [{ src: project.heroImage, alt: project.heroAlt }, ...project.gallery]
    .filter((image, index, entries) => image.src && entries.findIndex((entry) => entry.src === image.src) === index);
  const galleryImages = images.slice(1);
  const relatedProjects = projects.filter((item) => item.slug !== project.slug);
  const facts = [
    ['Category', project.category],
    ['Location', project.location],
    ['Completion', project.completion],
    ['Materials', project.materials],
    ['Client', project.client],
  ].filter(([, value]) => value != null && value !== '' && (!Array.isArray(value) || value.length > 0));

  useEffect(() => {
    document.title = `${project.title} | Baithak`;
    window.scrollTo(0, 0);
  }, [project.title]);

  useEffect(() => {
    if (!isViewerOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setSelectedIndex(null);
      } else if (images.length > 1 && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        const direction = event.key === 'ArrowLeft' ? -1 : 1;
        setSelectedIndex((index) => (index + direction + images.length) % images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, isViewerOpen]);

  const message = [
    'Hello Baithak,',
    '',
    `I saw the ${project.title} project on your website.`,
    '',
    'I would like to discuss something similar for my space.',
    '',
    'Please get in touch with me.',
  ].join('\n');
  const separator = contactInfo.whatsapp.href.includes('?') ? '&' : '?';
  const enquiryUrl = `${contactInfo.whatsapp.href}${separator}text=${encodeURIComponent(message)}`;

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main className="project-detail" id="main-content" tabIndex={-1}>
        <nav className="container project-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/our-work">Our Work</a></li>
            <li><span aria-current="page">{project.title}</span></li>
          </ol>
        </nav>

        <section className="project-hero" aria-labelledby="project-title">
          <button
            className="project-hero__image"
            type="button"
            aria-label={`Open full photograph of ${project.title}`}
            aria-haspopup="dialog"
            aria-expanded={isViewerOpen}
            title="Open full photograph"
            onClick={() => setSelectedIndex(0)}
          >
            <img src={project.heroImage} alt={project.heroAlt} fetchPriority="high" decoding="async" />
            <span className="project-hero__zoom" aria-hidden="true"><ZoomIn size={21} /></span>
          </button>
          <div className="project-hero__copy">
            <div className="container">
              {project.category && <p className="project-detail__eyebrow">{project.category}</p>}
              <h1 id="project-title">{project.title}</h1>
              {project.location && <p className="project-hero__location"><MapPin size={17} aria-hidden="true" />{project.location}</p>}
            </div>
          </div>
        </section>

        <section className="project-introduction project-detail__band" aria-labelledby="project-introduction-title">
          <div className="container project-introduction__layout">
            <h2 id="project-introduction-title">{project.introductionTitle}</h2>
            <p>{project.shortDescription}</p>
          </div>
        </section>

        {(facts.length > 0 || project.scope.length > 0) && (
          <section className="project-scope project-detail__band" aria-labelledby="project-scope-title">
            <div className="container project-scope__layout">
              <div>
                <p className="project-detail__eyebrow">Project details</p>
                <h2 id="project-scope-title">The pieces in the room.</h2>
                <dl className="project-facts">
                  {facts.map(([label, value]) => (
                    <div key={label}><dt>{label}</dt><dd>{Array.isArray(value) ? value.join(', ') : value}</dd></div>
                  ))}
                </dl>
              </div>
              {project.scope.length > 0 && (
                <div className="project-scope__pieces">
                  <h3>Project scope</h3>
                  <ul>{project.scope.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              )}
            </div>
          </section>
        )}

        {galleryImages.length > 0 && (
          <section className="project-gallery project-detail__band" aria-labelledby="project-gallery-title">
            <div className="container">
              <p className="project-detail__eyebrow">Project photographs</p>
              <h2 id="project-gallery-title">A closer look.</h2>
              <div className="project-gallery__grid">
                {galleryImages.map((image, index) => (
                  <button
                    className="project-gallery__image"
                    type="button"
                    key={image.src}
                    aria-label={`Open ${project.title} photograph ${index + 2} of ${images.length}`}
                    aria-haspopup="dialog"
                    title="Open full photograph"
                    onClick={() => setSelectedIndex(index + 1)}
                  >
                    <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                    <span className="project-hero__zoom" aria-hidden="true"><ZoomIn size={21} /></span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="project-approach project-detail__band" aria-labelledby="project-approach-title">
          <div className="container">
            <p className="project-detail__eyebrow">The approach</p>
            <h2 id="project-approach-title">{project.approachTitle}</h2>
            <p>{project.approachDescription}</p>
          </div>
        </section>

        <section className="project-enquiry project-detail__band" aria-labelledby="project-enquiry-title">
          <div className="container project-enquiry__layout">
            <div>
              <p className="project-detail__eyebrow">Your space, next</p>
              <h2 id="project-enquiry-title">Planning something similar?</h2>
            </div>
            <div className="project-enquiry__actions">
              <a className="button button-primary" href={enquiryUrl} target="_blank" rel="noopener noreferrer">
                Discuss Your Project <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="project-detail__text-link" href="/contact#enquiry">Contact Baithak <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className="project-related project-detail__band" aria-labelledby="project-related-title">
          <div className="container">
            <p className="project-detail__eyebrow">More Baithak projects</p>
            <h2 id="project-related-title">Other spaces to explore.</h2>
            <div className="project-related__grid">
              {relatedProjects.map((item) => (
                <a className="project-related__item" href={item.href} key={item.slug} aria-label={`View ${item.title} project`}>
                  <img src={item.heroImage} alt={item.heroAlt} loading="lazy" decoding="async" />
                  {item.category && <p className="project-detail__eyebrow">{item.category}</p>}
                  <h3>{item.title}</h3>
                  {item.location && <p className="project-related__location"><MapPin size={16} aria-hidden="true" />{item.location}</p>}
                  <span>View Project <ArrowUpRight size={17} aria-hidden="true" /></span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {isViewerOpen && (
        <div
          className="archive-viewer project-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title}: photograph ${selectedIndex + 1} of ${images.length}`}
          ref={dialogRef}
          tabIndex={-1}
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedIndex(null);
          }}
        >
          <div className="archive-viewer__topbar">
            <p><span>{project.title}</span>{selectedIndex + 1} / {images.length}</p>
            <button type="button" aria-label="Close image viewer" title="Close image viewer" onClick={() => setSelectedIndex(null)}>
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          {images.length > 1 && (
            <button className="archive-viewer__nav archive-viewer__nav--previous" type="button" aria-label="View previous photograph" title="Previous photograph"
              onClick={() => setSelectedIndex((index) => (index - 1 + images.length) % images.length)}>
              <ChevronLeft size={25} aria-hidden="true" />
            </button>
          )}
          <img className="archive-viewer__image" src={images[selectedIndex].src} alt={images[selectedIndex].alt} decoding="async" />
          {images.length > 1 && (
            <button className="archive-viewer__nav archive-viewer__nav--next" type="button" aria-label="View next photograph" title="Next photograph"
              onClick={() => setSelectedIndex((index) => (index + 1) % images.length)}>
              <ChevronRight size={25} aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default ProjectDetailPage;
