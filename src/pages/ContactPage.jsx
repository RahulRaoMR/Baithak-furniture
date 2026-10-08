import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  AtSign,
  Facebook,
  Instagram,
  Mail,
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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const submittingRef = useRef(false);
  const submissionTimerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact Baithak | Custom Furniture Bengaluru';
    return () => clearTimeout(submissionTimerRef.current);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submittingRef.current) return;

    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const project = String(data.get('project') || '').trim();
    const details = String(data.get('message') || '').trim();
    const digits = phone.replace(/\D/g, '');
    const nationalNumber = digits.length === 12 && digits.startsWith('91')
      ? digits.slice(2)
      : digits.length === 11 && digits.startsWith('0') ? digits.slice(1) : digits;
    const phoneIsValid = /^\+?[\d\s().-]+$/.test(phone)
      && (!phone.startsWith('+') || (digits.length === 12 && digits.startsWith('91')))
      && /^[2-9]\d{9}$/.test(nationalNumber)
      && !/^(\d)\1{9}$/.test(nationalNumber);
    const nextErrors = {};

    if (name.length < 2) nextErrors.name = 'Please enter your name (at least 2 characters).';
    if (!phoneIsValid) nextErrors.phone = 'Please enter a valid 10-digit Indian phone number, with or without +91.';
    if (!project) nextErrors.project = 'Please choose a furniture type.';
    if (details.length < 2) nextErrors.message = 'Please add a short description of your project.';

    setErrors(nextErrors);
    setFeedback('');
    setWhatsappUrl('');
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidName = ['name', 'phone', 'project', 'message'].find((field) => nextErrors[field]);
      event.currentTarget.elements.namedItem(firstInvalidName)?.focus();
      return;
    }

    event.currentTarget.elements.namedItem('name').value = name;
    event.currentTarget.elements.namedItem('phone').value = `+91${nationalNumber}`;
    event.currentTarget.elements.namedItem('message').value = details;
    const message = [
      'Hello Baithak, I would like to discuss a furniture project.',
      '',
      `Name: ${name}`,
      `Phone: +91${nationalNumber}`,
      `Project: ${project}`,
      `Message: ${details}`,
    ].join('\n');
    const separator = contactInfo.whatsapp.href.includes('?') ? '&' : '?';
    const url = `${contactInfo.whatsapp.href}${separator}text=${encodeURIComponent(message)}`;
    submittingRef.current = true;
    setIsSubmitting(true);
    setWhatsappUrl(url);
    setFeedback('Opening WhatsApp... Send the prepared message there to complete your enquiry.');

    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      setFeedback('WhatsApp could not be opened automatically. Please use the link below.');
    }
    submissionTimerRef.current = setTimeout(() => {
      submittingRef.current = false;
      setIsSubmitting(false);
    }, 1500);
  };

  const handleFieldChange = (event) => {
    const field = event.target.name;
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFeedback('');
    setWhatsappUrl('');
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main className="contact-page" id="main-content" tabIndex={-1}>
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
              <a href={contactInfo.email.href}>
                <Mail size={22} strokeWidth={1.6} aria-hidden="true" />
                <span>
                  <small>Email us</small>
                  {contactInfo.email.display}
                </span>
                <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />
              </a>
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

            <form className="contact-form" onSubmit={handleSubmit} onChange={handleFieldChange} noValidate aria-busy={isSubmitting}>
              <label>
                <span>Your name</span>
                <input type="text" name="name" autoComplete="name" required minLength={2}
                  aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
                {errors.name && <small className="contact-form__error" id="contact-name-error">{errors.name}</small>}
              </label>
              <label>
                <span>Phone number</span>
                <input type="tel" name="phone" autoComplete="tel" inputMode="tel" required
                  aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'contact-phone-error' : undefined} />
                {errors.phone && <small className="contact-form__error" id="contact-phone-error">{errors.phone}</small>}
              </label>
              <label>
                <span>What are you looking for?</span>
                <select name="project" defaultValue="Custom sofa" required
                  aria-invalid={Boolean(errors.project)} aria-describedby={errors.project ? 'contact-project-error' : undefined}>
                  <option>Custom sofa</option>
                  <option>Chairs or recliners</option>
                  <option>Bed or headboard</option>
                  <option>Custom woodwork</option>
                  <option>Complete furniture project</option>
                  <option>Something else</option>
                </select>
                {errors.project && <small className="contact-form__error" id="contact-project-error">{errors.project}</small>}
              </label>
              <label>
                <span>Tell us about your space</span>
                <textarea name="message" rows="5" required minLength={2}
                  aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} />
                {errors.message && <small className="contact-form__error" id="contact-message-error">{errors.message}</small>}
              </label>
              <button className="button button-primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Opening WhatsApp...' : 'Continue on WhatsApp'} <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
              </button>
              <p className="contact-form__status" role="status" aria-live="polite" aria-atomic="true">{feedback}</p>
              {whatsappUrl && (
                <a className="contact-form__fallback" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Open WhatsApp <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
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
