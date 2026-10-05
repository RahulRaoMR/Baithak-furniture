import { useEffect, useRef, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { contactInfo } from '../data/contact.js';

function WhatsAppLogo({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 4.25a11.5 11.5 0 0 0-9.88 17.4L4.5 27.5l5.98-1.57A11.5 11.5 0 1 0 16 4.25Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M11.35 10.45c.35-.36.74-.4 1.05-.4h.36c.2 0 .42.06.54.4l1.04 2.5c.1.3.07.54-.1.8l-.78 1c-.14.18-.18.36-.05.58.45.78 1.08 1.5 1.8 2.1.83.68 1.55 1.08 2.38 1.4.25.1.44.04.6-.14l1.13-1.38c.2-.25.45-.3.74-.2l2.38 1.13c.3.14.46.25.5.45.05.2.05 1.12-.27 1.98-.32.86-1.85 1.66-2.56 1.76-.66.1-1.5.14-2.42-.15-.56-.18-1.28-.42-2.2-.82-3.86-1.67-6.38-5.57-6.58-5.83-.2-.27-1.57-2.1-1.57-4 0-1.9.98-2.84 1.33-3.23Z"
        fill="currentColor"
        transform="translate(1.7 1.2) scale(.82)"
      />
    </svg>
  );
}

function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const triggerRef = useRef(null);
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const submittingRef = useRef(false);

  const closeDialog = () => {
    setIsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const openDialog = () => {
    setErrors({});
    setIsSubmitting(false);
    submittingRef.current = false;
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeDialog();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    requestAnimationFrame(() => firstFieldRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submittingRef.current) return;

    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const project = String(data.get('project') || '').trim();
    const details = String(data.get('message') || '').trim();
    const phoneDigits = phone.replace(/\D/g, '');
    const phoneIsValid =
      phoneDigits.length === 10 ||
      (phoneDigits.length === 11 && phoneDigits.startsWith('0')) ||
      (phoneDigits.length === 12 && phoneDigits.startsWith('91'));
    const nextErrors = {};

    if (name.length < 2) nextErrors.name = 'Please enter your name.';
    if (!phoneIsValid) nextErrors.phone = 'Please enter a valid phone number.';
    if (!project) nextErrors.project = 'Please choose a furniture type.';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalidName = ['name', 'phone', 'project'].find((field) => nextErrors[field]);
      event.currentTarget.elements[firstInvalidName]?.focus();
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    const message = [
      'Hello Baithak,',
      '',
      'I would like to enquire about furniture.',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Furniture: ${project}`,
      ...(details ? ['', 'Project details:', details] : []),
      '',
      'Please get in touch with me.',
    ].join('\n');
    const separator = contactInfo.whatsapp.href.includes('?') ? '&' : '?';

    window.open(
      `${contactInfo.whatsapp.href}${separator}text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    );
    closeDialog();
  };

  return (
    <>
      <button
        className="whatsapp-button"
        type="button"
        aria-label="Start a WhatsApp enquiry with Baithak"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={openDialog}
        ref={triggerRef}
      >
        <WhatsAppLogo />
      </button>

      {isOpen && (
        <div className="whatsapp-enquiry" role="presentation" onMouseDown={closeDialog}>
          <section
            className="whatsapp-enquiry__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-enquiry-title"
            onMouseDown={(event) => event.stopPropagation()}
            ref={dialogRef}
          >
            <header className="whatsapp-enquiry__header">
              <span className="whatsapp-enquiry__logo">
                <WhatsAppLogo size={25} />
              </span>
              <div>
                <p>WhatsApp enquiry</p>
                <h2 id="whatsapp-enquiry-title">Tell us what you need.</h2>
              </div>
              <button
                className="whatsapp-enquiry__close"
                type="button"
                aria-label="Close WhatsApp enquiry"
                onClick={closeDialog}
              >
                <X size={21} aria-hidden="true" />
              </button>
            </header>

            <p className="whatsapp-enquiry__intro">
              Share a few details and we will prepare your message for WhatsApp.
            </p>

            <form className="whatsapp-enquiry__form" onSubmit={handleSubmit} noValidate>
              <label>
                <span>Your name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  minLength="2"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'whatsapp-name-error' : undefined}
                  ref={firstFieldRef}
                />
                {errors.name && <small id="whatsapp-name-error">{errors.name}</small>}
              </label>
              <label>
                <span>Phone number</span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="10-digit mobile number"
                  required
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'whatsapp-phone-error' : undefined}
                />
                {errors.phone && <small id="whatsapp-phone-error">{errors.phone}</small>}
              </label>
              <label>
                <span>What are you looking for?</span>
                <select
                  name="project"
                  defaultValue=""
                  required
                  aria-invalid={Boolean(errors.project)}
                  aria-describedby={errors.project ? 'whatsapp-project-error' : undefined}
                >
                  <option value="" disabled>Select furniture type</option>
                  <option>Sofa</option>
                  <option>Sectional</option>
                  <option>Chair</option>
                  <option>Recliner</option>
                  <option>Bed</option>
                  <option>Dining Furniture</option>
                  <option>Table</option>
                  <option>Custom Furniture</option>
                  <option>Custom Woodwork</option>
                  <option>Other</option>
                </select>
                {errors.project && <small id="whatsapp-project-error">{errors.project}</small>}
              </label>
              <label>
                <span>Project details <em>Optional</em></span>
                <textarea name="message" rows="4" />
              </label>
              <button className="whatsapp-enquiry__submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Opening WhatsApp...' : 'Continue on WhatsApp'}
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default WhatsAppButton;
