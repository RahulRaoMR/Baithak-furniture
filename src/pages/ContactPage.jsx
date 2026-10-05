import { useEffect } from 'react';
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
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Logo from '../components/Logo.jsx';
import { contactInfo } from '../data/contact.js';
import contactHeroImage from '../assets/images/gallery/studio-003.png';

const socialLinks = [
  ['Instagram', contactInfo.socials.instagram, Instagram],
  ['Facebook', contactInfo.socials.facebook, Facebook],
  ['YouTube', contactInfo.socials.youtube, Youtube],
  ['X', contactInfo.socials.x, AtSign],
];

function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact Baithak | Custom Furniture Bengaluru';
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      'Hello Baithak, I would like to discuss a furniture project.',
      '',
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Project: ${data.get('project')}`,
      `Message: ${data.get('message')}`,
    ].join('\n');
    const separator = contactInfo.whatsapp.href.includes('?') ? '&' : '?';
    window.open(`${contactInfo.whatsapp.href}${separator}text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Navbar />
      <main className="contact-page">
        <section className="contact-hero" aria-labelledby="contact-title">
          <img className="contact-hero__image" src={contactHeroImage} alt="Baithak furniture collection" />
          <div className="contact-hero__overlay" aria-hidden="true" />
          <div className="container contact-hero__content">
            <Logo className="contact-hero__logo" />
            <p>Custom furniture studio, Bengaluru</p>
            <h1 id="contact-title">Let&apos;s make something that belongs in your space.</h1>
            <a href="#enquiry">
              Start your enquiry <ArrowRight size={18} strokeWidth={1.7} />
            </a>
          </div>
        </section>

        <section className="contact-details" aria-labelledby="contact-details-title">
          <div className="container contact-details__layout">
            <header className="contact-details__intro">
              <p>Talk to Baithak</p>
              <h2 id="contact-details-title">Begin with your room, your idea, or just a reference.</h2>
              <p>
                Share your measurements, inspiration and how you want the furniture to feel. We
                will help shape the next steps.
              </p>
            </header>

            <div className="contact-details__methods">
              <a href={contactInfo.phone.href}>
                <Phone size={22} strokeWidth={1.6} aria-hidden="true" />
                <span>
                  <small>Call us</small>
                  {contactInfo.phone.display}
                </span>
                <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />
              </a>
              <a href={contactInfo.whatsapp.href} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={22} strokeWidth={1.6} aria-hidden="true" />
                <span>
                  <small>WhatsApp</small>
                  {contactInfo.whatsapp.display}
                </span>
                <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />
              </a>
              <a href={contactInfo.address.mapsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin size={22} strokeWidth={1.6} aria-hidden="true" />
                <span>
                  <small>Visit the studio</small>
                  {contactInfo.address.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
                <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="contact-enquiry" id="enquiry" aria-labelledby="enquiry-title">
          <div className="container contact-enquiry__layout">
            <div className="contact-enquiry__heading">
              <p>Project enquiry</p>
              <h2 id="enquiry-title">Tell us what you are imagining.</h2>
              <span>The form opens a prepared message in WhatsApp.</span>
              <div className="contact-enquiry__brand" aria-label="Baithak custom furniture studio, Bengaluru">
                <Logo className="contact-enquiry__logo" />
                <p>Custom furniture studio, Bengaluru</p>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                <span>Your name</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label>
                <span>Phone number</span>
                <input type="tel" name="phone" autoComplete="tel" required />
              </label>
              <label>
                <span>What are you looking for?</span>
                <select name="project" defaultValue="Custom sofa" required>
                  <option>Custom sofa</option>
                  <option>Chairs or recliners</option>
                  <option>Bed or headboard</option>
                  <option>Custom woodwork</option>
                  <option>Complete furniture project</option>
                  <option>Something else</option>
                </select>
              </label>
              <label>
                <span>Tell us about your space</span>
                <textarea name="message" rows="5" required />
              </label>
              <button className="button button-primary" type="submit">
                Continue on WhatsApp <ArrowRight size={18} strokeWidth={1.7} />
              </button>
            </form>
          </div>
        </section>

        <section className="contact-social" aria-labelledby="contact-social-title">
          <div className="container contact-social__layout">
            <div>
              <p>Follow the workshop</p>
              <h2 id="contact-social-title">See what we are making.</h2>
            </div>
            <div className="contact-social__links">
              {socialLinks.map(([label, href, Icon]) => (
                <a href={href} target="_blank" rel="noopener noreferrer" key={label}>
                  <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  <span>{label}</span>
                  <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ContactPage;
