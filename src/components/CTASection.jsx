import { useState } from 'react';
import { ArrowRight, ExternalLink, MessageCircle, Phone } from 'lucide-react';
import { contactInfo } from '../data/contact.js';

const consultationImages = import.meta.glob('../assets/images/consultation-cta.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
});
const consultationImage = consultationImages['../assets/images/consultation-cta.jpg'];

function CTASection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section className="cta-section" id="quote" aria-labelledby="consultation-title">
      <div className="cta-section__layout">
        <div className="cta-section__visual">
          {consultationImage && !imageFailed && (
            <img
              className={`cta-section__image${imageLoaded ? ' is-loaded' : ''}`}
              src={consultationImage}
              alt="A custom Baithak interior created around the client's space"
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
              aria-label="Chat with Baithak on WhatsApp"
            >
              <MessageCircle size={19} aria-hidden="true" />
              Chat on WhatsApp
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              className="cta-section__secondary"
              href={contactInfo.phone.href}
              aria-label="Call Baithak"
            >
              <Phone size={18} aria-hidden="true" />
              Call Baithak
            </a>
            <a
              className="cta-section__visit"
              href={contactInfo.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Baithak studio location in Google Maps"
            >
              Visit Our Studio
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>

          <p className="cta-section__trust">Furniture, made around real spaces.</p>

          <div className="cta-section__contact">
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
