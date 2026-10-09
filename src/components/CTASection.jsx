import ResponsiveImage from './ResponsiveImage.jsx';
import { imageSources } from '../utils/images.js';
import { useState } from 'react';
import { ArrowRight, ExternalLink, MessageCircle, Phone } from 'lucide-react';
import { contactInfo } from '../data/contact.js';

const consultationImage = imageSources['../assets/images/gallery/studio-014.png'];

function CTASection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section className="cta-section" id="quote" aria-labelledby="consultation-title">
      <div className="cta-section__layout">
        <div className="cta-section__visual">
          {consultationImage && !imageFailed && (
            <ResponsiveImage
              className={`cta-section__image${imageLoaded ? ' is-loaded' : ''}`}
              src={consultationImage}
              alt="Blue Baithak lounge chair and matching ottoman in a furnished interior"
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageFailed(true)}
            />
          )}
          <div className="cta-section__image-fallback" aria-hidden="true">
            <span>Made for your space</span>
          </div>
        </div>

        <div className="cta-section__panel">
          <p className="cta-section__eyebrow">Design with Baithak</p>
          <h2 className="cta-section__title" id="consultation-title">
            Have a space in mind?
            <span>Let&apos;s make what belongs there.</span>
          </h2>
          <p className="cta-section__intro">
            Tell us what you&apos;re planning, the space you&apos;re working with, and how you want it to
            feel. We&apos;ll take the conversation from there.
          </p>

          <div className="cta-section__actions">
            <a
              className="cta-section__primary"
              href={contactInfo.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={19} aria-hidden="true" />
              Chat on WhatsApp
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              className="cta-section__secondary"
              href={contactInfo.phone.href}
            >
              <Phone size={18} aria-hidden="true" />
              Call Baithak
            </a>
            <a
              className="cta-section__visit"
              href={contactInfo.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Our Studio
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>

          <p className="cta-section__trust">Furniture, made around real spaces.</p>

          <div className="cta-section__contact">
            <div className="cta-section__contact-item cta-section__contact-item--email">
              <span>Email Us</span>
              <a href={contactInfo.email.href}>{contactInfo.email.display}</a>
            </div>
            <div className="cta-section__contact-item">
              <span>Phone</span>
              <a href={contactInfo.phone.href}>{contactInfo.phone.display}</a>
            </div>
            <div className="cta-section__contact-item">
              <span>WhatsApp</span>
              <a
                href={contactInfo.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contactInfo.whatsapp.display}
              </a>
            </div>
            <div className="cta-section__contact-item">
              <span>Studio</span>
              <a
                href={contactInfo.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contactInfo.address.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
