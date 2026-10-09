import { imageSources } from '../utils/images.js';
import ResponsiveImage from './ResponsiveImage.jsx';
import { ArrowDown, ArrowRight } from 'lucide-react';

const heroImage = imageSources['../assets/images/gallery/studio-006.png'];

function Hero() {
  const scrollToNextSection = () => {
    document.querySelector('#home + section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <ResponsiveImage
        className="hero-media"
        src={heroImage}
        mobileCrop
        sizes="(max-width: 1024px) 1900px, 100vw"
        alt=""
        loading="eager"
        fetchPriority="high"
        aria-hidden="true"
      />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">Custom furniture &amp; woodwork</p>
          <h1 id="hero-title">
            Furniture,
            <br />
            made around you.
          </h1>
          <p className="hero-supporting">Designed for your space. Crafted for your life.</p>
          <div className="hero-actions">
            <a className="button button-primary hero-primary" href="#our-work">
              Explore Our Work <ArrowRight size={18} strokeWidth={1.8} />
            </a>
            <a className="button hero-secondary" href="/contact#enquiry">
              Design With Us
            </a>
          </div>
        </div>

        <div className="hero-footer">
          <button
            className="hero-scroll-button"
            type="button"
            aria-label="Scroll to furniture categories"
            onClick={scrollToNextSection}
          >
            <ArrowDown size={22} strokeWidth={1.7} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
