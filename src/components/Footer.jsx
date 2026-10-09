import { ArrowRight, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { contactInfo } from '../data/contact.js';
import footerBackground from '../assets/footer-background.webp';
import Logo from './Logo.jsx';
import { WhatsAppLogo } from './WhatsAppButton.jsx';
import '../styles/footer.css';

const exploreLinks = [
  ['Furniture', '/furniture'],
  ['Collections', '/collections'],
  ['Customisation', '/customise'],
  ['Our Work', '/our-work'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

const socialLinks = [
  ['Instagram', contactInfo.socials.instagram, Instagram],
  ['Facebook', contactInfo.socials.facebook, Facebook],
  ['YouTube', contactInfo.socials.youtube, Youtube],
  ['X', contactInfo.socials.x, null],
];

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <img className="footer-backdrop" src={footerBackground} alt="" width="1920" height="640" loading="lazy" decoding="async" />
      <div className="footer-inner">
        <div className="footer-layout">
          <div className="footer-branding">
            <a className="footer-brand" href="/" aria-label="Baithak home">
              <Logo className="footer-logo" />
            </a>
            <p>Furniture shaped around your space, comfort and way of living.</p>
            <div className="footer-actions">
              <a className="footer-action footer-action--showroom" href={contactInfo.address.mapsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin size={24} aria-hidden="true" />
                <span>Visit Showroom</span>
                <ArrowRight size={22} aria-hidden="true" />
              </a>
              <a className="footer-action footer-action--whatsapp" href={contactInfo.whatsapp.href} target="_blank" rel="noopener noreferrer">
                <WhatsAppLogo size={28} />
                <span>Chat on WhatsApp</span>
                <ArrowRight size={22} aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav className="footer-column footer-explore" aria-label="Footer navigation">
            <h2>Explore</h2>
            {exploreLinks.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
          </nav>

          <div className="footer-column footer-contact">
            <section aria-labelledby="footer-contact-title">
              <h2 id="footer-contact-title">Contact</h2>
              <div className="footer-contact-list">
                <a className="footer-contact-item" href={contactInfo.email.href}>
                  <Mail size={23} strokeWidth={1.7} aria-hidden="true" />
                  <span>{contactInfo.email.display}</span>
                </a>
                <a className="footer-contact-item" href={contactInfo.phone.href} aria-label={`Call ${contactInfo.phone.display}`}>
                  <Phone size={23} strokeWidth={1.7} aria-hidden="true" />
                  <span>{contactInfo.phone.display}</span>
                </a>
                <a className="footer-contact-item" href={contactInfo.whatsapp.href} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${contactInfo.whatsapp.display}`}>
                  <WhatsAppLogo size={25} />
                  <span>{contactInfo.whatsapp.display}</span>
                </a>
              </div>
            </section>
            <section className="footer-follow" aria-labelledby="footer-follow-title">
              <h2 id="footer-follow-title">Follow Us</h2>
              <div className="footer-socials">
                {socialLinks.map(([label, href, Icon]) => (
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Baithak on ${label}`} title={label} key={label}>
                    {Icon ? <Icon size={23} strokeWidth={1.9} aria-hidden="true" /> : <span className="footer-x-mark" aria-hidden="true">X</span>}
                  </a>
                ))}
              </div>
            </section>
          </div>

          <section className="footer-column footer-visit" aria-labelledby="footer-visit-title">
            <h2 id="footer-visit-title">Visit Us</h2>
            <div className="footer-visit-location">
              <MapPin size={26} strokeWidth={1.7} aria-hidden="true" />
              <div>
                <a className="footer-address" href={contactInfo.address.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {contactInfo.address.lines.map((line) => <span key={line}>{line}</span>)}
                </a>
                <a className="footer-directions" href={contactInfo.address.mapsUrl} target="_blank" rel="noopener noreferrer">
                  Get Directions <ArrowRight size={20} aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Baithak Furniture. All rights reserved.</p>
          <nav aria-label="Legal">
            <a href="/privacy">Privacy</a>
            <span aria-hidden="true">|</span>
            <a href="/terms">Terms</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
