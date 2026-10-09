import { useEffect, useRef, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { contactInfo } from '../data/contact.js';
import { normalizeIndianPhone } from '../utils/enquiry.js';
import useDialogFocus from '../hooks/useDialogFocus.js';

export function WhatsAppLogo({ size = 28, fullSize = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={fullSize ? '3 3 26 26' : '0 0 32 32'}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M16 4.25a11.5 11.5 0 0 0-9.88 17.4L4.5 27.5l5.98-1.57A11.5 11.5 0 1 0 16 4.25Z"
        fill={fullSize ? '#fff' : 'none'}
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M11.4 9.4c-.4-.8-.8-.8-1.2-.8h-.9c-.3 0-.8.1-1.2.6-.4.5-1.6 1.5-1.6 3.7s1.6 4.3 1.8 4.6c.2.3 3.2 4.9 7.8 6.8 3.9 1.7 4.7 1.4 5.6 1.3.9-.1 2.7-1.1 3.1-2.2.4-1.1.4-2 .3-2.2-.1-.2-.4-.3-.8-.5l-3.2-1.5c-.4-.2-.8-.3-1 .2-.3.4-1.2 1.5-1.5 1.8-.3.3-.5.3-.9.1-.4-.2-1.9-.7-3.6-2.2-1.3-1.2-2.2-2.6-2.5-3-.3-.4 0-.6.2-.8l.7-.8c.2-.3.3-.4.5-.7.2-.3.1-.6 0-.8L11.4 9.4Z"
        fill="currentColor"
        transform="translate(2.2 1.8) scale(.82)"
      />
    </svg>
  );
}

function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const triggerRef = useRef(null);
  const dialogRef = useDialogFocus(isOpen);
  const firstFieldRef = useRef(null);
  const submittingRef = useRef(false);

  const closeDialog = () => {
    setIsOpen(false);
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
      if (event.key === 'Escape') closeDialog();
    };
    document.addEventListener('keydown', handleKeyDown);
    firstFieldRef.current?.focus({ preventScroll: true });
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submittingRef.current) return;

    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const project = String(data.get('project') || '').trim();
    const details = String(data.get('message') || '').trim();
    const normalizedPhone = normalizeIndianPhone(phone);
    const nextErrors = {};

    if (name.length < 2) nextErrors.name = 'Please enter your name.';
    if (!normalizedPhone) nextErrors.phone = 'Please enter a valid phone number.';
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
      `Phone: ${normalizedPhone}`,
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
      <div className="whatsapp-launcher">
        <button
          className="whatsapp-button"
          type="button"
          aria-label="Chat with Baithak on WhatsApp"
          title="WhatsApp enquiry"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={isOpen ? 'whatsapp-enquiry-dialog' : undefined}
          onClick={openDialog}
          ref={triggerRef}
        >
          <WhatsAppLogo size={56} fullSize />
        </button>
      </div>

      {isOpen && (
        <div className="whatsapp-enquiry" role="presentation" onMouseDown={closeDialog}>
          <section
            className="whatsapp-enquiry__dialog"
            id="whatsapp-enquiry-dialog"
            tabIndex={-1}
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
