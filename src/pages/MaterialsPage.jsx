import ResponsiveImage from '../components/ResponsiveImage.jsx';
import { imageSources } from '../utils/images.js';
import { useEffect } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { contactInfo } from '../data/contact.js';
import '../styles/materials-page.css';

const mainImage = imageSources['../assets/images/craftsmanship-main.jpg'];
const upholsteryImage = imageSources['../assets/images/craftsmanship-upholstery.jpg'];
const woodImage = imageSources['../assets/images/craftsmanship-wood.jpg'];
const detailImage = imageSources['../assets/images/craftsmanship-detail.jpg'];

const principles = [
  {
    number: '01',
    label: 'Upholstery',
    title: 'Texture changes everything.',
    description: 'Upholstery influences comfort, colour and the overall character of a piece.',
    image: upholsteryImage,
    alt: 'Blue upholstered bed panels with diamond stitching and vertical seam detailing in a workshop',
  },
  {
    number: '02',
    label: 'Wood & Finish',
    title: 'Warmth in the material.',
    description: 'Wood tones and finishes can be considered alongside the room, the furniture and surrounding materials.',
    image: woodImage,
    alt: 'Geometric padded wall panels with contrasting trim during installation',
  },
  {
    number: '03',
    label: 'Details',
    title: 'Small decisions matter.',
    description: 'Seams, piping, edges, profiles and transitions contribute to the final character of the furniture.',
    image: detailImage,
    alt: 'Green sectional sofa showing stitched seat panels, padded arms and a chaise in the workshop',
  },
];

function MaterialsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main className="materials-page" id="main-content" tabIndex={-1}>
        <nav className="container materials-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li><span aria-current="page">Materials &amp; Finishes</span></li>
          </ol>
        </nav>
        <section className="materials-hero" aria-labelledby="materials-title">
          <ResponsiveImage loading="eager" className="materials-hero__image" src={mainImage} alt="Green upholstered sectional sofa beside workbenches in the Baithak workshop" fetchPriority="high" decoding="async" />
          <div className="container materials-hero__copy">
            <p className="materials-page__eyebrow">Materials &amp; Finishes</p>
            <h1 id="materials-title">The details you<br />see and feel.</h1>
            <p>Material, texture and finish shape how furniture feels in a room. Baithak considers these details alongside proportion, comfort and everyday use.</p>
          </div>
        </section>

        {principles.map((principle) => (
          <section className="materials-principle" aria-labelledby={`materials-${principle.number}-title`} key={principle.number}>
            <div className="container materials-principle__layout">
              <div className="materials-principle__copy">
                <p className="materials-page__eyebrow"><span>{principle.number}</span> {principle.label}</p>
                <h2 id={`materials-${principle.number}-title`}>{principle.title}</h2>
                <p>{principle.description}</p>
              </div>
              <ResponsiveImage className={`materials-principle__image materials-principle__image--${principle.number}`} src={principle.image} alt={principle.alt} loading="lazy" decoding="async" />
            </div>
          </section>
        ))}

        <section className="materials-direction" aria-labelledby="materials-direction-title">
          <div className="container materials-direction__layout">
            <div>
              <p className="materials-page__eyebrow"><span>04</span> Custom Direction</p>
              <h2 id="materials-direction-title">Made around your palette.</h2>
            </div>
            <p>Finishes and upholstery can be discussed during consultation to create a direction suited to the space.</p>
          </div>
        </section>

        <section className="materials-enquiry" aria-labelledby="materials-enquiry-title">
          <div className="container materials-enquiry__layout">
            <h2 id="materials-enquiry-title">Have a finish in mind?</h2>
            <div className="materials-enquiry__actions">
              <a className="button button-primary" href="/contact#enquiry">Talk to Baithak <ArrowRight size={18} aria-hidden="true" /></a>
              <a className="materials-enquiry__whatsapp" href={contactInfo.whatsapp.href} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" /> Chat on WhatsApp <ArrowRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default MaterialsPage;
