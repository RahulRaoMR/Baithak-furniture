import {
  ArrowRight,
  ArrowUpRight,
  AtSign,
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from 'lucide-react';
import { contactInfo } from '../data/contact.js';
import Logo from './Logo.jsx';

const exploreLinks = [
  ['Furniture', '/furniture'],
  ['Collections', '/collections'],
  ['Customise', '/custom'],
  ['Our Work', '/our-work'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

const socialLinks = [
  ['Instagram', contactInfo.socials.instagram, Instagram],
  ['Facebook', contactInfo.socials.facebook, Facebook],
  ['YouTube', contactInfo.socials.youtube, Youtube],
  ['X', contactInfo.socials.x, AtSign],
];

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="footer-layout">
          <div className="footer-branding">
            <a className="footer-brand" href="/" aria-label="Baithak home">
              <Logo className="footer-logo" />
            </a>
            <p>Furniture shaped around your space, comfort and way of living.</p>
          </div>

          <nav className="footer-column footer-explore" aria-label="Footer navigation">
            <h2>Explore</h2>
            {exploreLinks.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </nav>

          <section className="footer-column footer-contact" aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title">Contact</h2>

            <div className="footer-contact-item">
              <Phone size={18} strokeWidth={1.7} aria-hidden="true" />
              <div>
                <span>Call Us</span>
                <a href={contactInfo.phone.href}>{contactInfo.phone.display}</a>
              </div>
            </div>

            <div className="footer-contact-item">
              <MessageCircle size={18} strokeWidth={1.7} aria-hidden="true" />
              <div>
                <span>WhatsApp</span>
                <a
                  href={contactInfo.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contactInfo.whatsapp.display}
                </a>
              </div>
            </div>

            <div className="footer-contact-item footer-contact-item--address">
              <MapPin size={18} strokeWidth={1.7} aria-hidden="true" />
              <div>
                <span>Visit Us</span>
                <a
                  className="footer-address"
                  href={contactInfo.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contactInfo.address.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </a>
                <a
                  className="footer-directions"
                  href={contactInfo.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
                </a>
              </div>
            </div>

            <a
              className="footer-whatsapp-cta"
              href={contactInfo.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />
            </a>
          </section>

          <section className="footer-column footer-follow" aria-labelledby="footer-follow-title">
            <h2 id="footer-follow-title">Follow</h2>
            <div className="footer-socials">
              {socialLinks.map(([label, href, Icon]) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Baithak on ${label}`}
                  key={label}
                >
                  <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </section>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Baithak. All rights reserved.</p>
          <div>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
