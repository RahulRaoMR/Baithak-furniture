import { ArrowDown, ArrowRight } from 'lucide-react';
import heroImage from '../assets/images/hero-main.png';

function Hero() {
  const scrollToNextSection = () => {
    document.querySelector('#home + section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div
        className="hero-media"
        style={{ backgroundImage: `url(${heroImage})` }}
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
          <p className="hero-description">
            From bespoke sofas and statement chairs to custom woodwork, Baithak transforms ideas
            into furniture made specifically for your space.
          </p>
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
          <div className="hero-progress" aria-label="Slide 1 of 3">
            <span>01</span>
            <span className="hero-progress-line" aria-hidden="true" />
            <span>03</span>
          </div>

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
