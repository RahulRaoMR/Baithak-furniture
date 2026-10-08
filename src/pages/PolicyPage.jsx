import { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { contactInfo } from '../data/contact.js';
import '../styles/policy-page.css';

const policies = {
  privacy: {
    title: 'Privacy Policy',
    introduction: 'This policy explains how information is handled when you browse Baithak furniture or get in touch about a piece for your space.',
    sections: [
      {
        id: 'information',
        title: 'Information you choose to share',
        paragraphs: [
          'An enquiry may include your name, phone number, furniture preferences and project details. You may also choose to share measurements, photographs or a delivery address during a conversation with Baithak. Please share only what is needed for your enquiry; do not include passwords, payment-card details or other sensitive information.',
        ],
      },
      {
        id: 'enquiries',
        title: 'How website enquiries work',
        paragraphs: [
          'The contact and WhatsApp enquiry forms prepare a message in your browser and open WhatsApp. Customisation choices can also be included in a prepared message. The website does not submit these details to a Baithak form database. You must send the message in WhatsApp to complete your enquiry.',
          'Opening WhatsApp passes the prepared text to that third-party service through a link. Review the details before proceeding. Email and telephone links open your email or calling application instead.',
        ],
      },
      {
        id: 'use',
        title: 'How enquiry information is used',
        paragraphs: [
          'Information you send helps Baithak respond to your questions, discuss designs and customisation, prepare a quotation and communicate about an agreed furniture project. Details needed for an order, delivery or service may be discussed separately with you.',
        ],
      },
      {
        id: 'technical',
        title: 'Browser storage and technical information',
        paragraphs: [
          'The current website does not use its own analytics or advertising scripts, or save enquiry details in cookies or browser storage. Form entries and customisation choices are held in the current page while you use it.',
          'The hosting provider may process technical information such as an IP address, browser information and request logs to deliver and protect the website. Third-party services may use their own cookies or storage when you visit them.',
        ],
      },
      {
        id: 'third-parties',
        title: 'Links to other services',
        paragraphs: [
          'WhatsApp, maps, social media and email services operate independently of this website. Their own privacy policies apply when you use them. Information sent through those services may be handled or stored outside your country.',
        ],
      },
      {
        id: 'choices',
        title: 'Your choices and privacy requests',
        paragraphs: [
          'You can browse the furniture without sending an enquiry. To ask about information you have shared, request a correction or deletion, withdraw permission for future contact, or raise a privacy concern, contact Baithak using the details below. Include enough information to identify your enquiry, but do not send identity documents unless requested through an appropriate channel.',
          'Information held in WhatsApp or your email provider is also subject to that service\'s controls. Retention and deletion of business records may depend on an ongoing order or applicable legal requirements. Contact Baithak for details about your particular enquiry.',
        ],
      },
      {
        id: 'updates',
        title: 'Changes to this policy',
        paragraphs: ['This page may be updated if the website or enquiry process changes. The last-updated date identifies the version shown here.'],
      },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    introduction: 'These terms cover browsing this website and making an enquiry. Details for an individual furniture order should be confirmed with Baithak before you proceed.',
    sections: [
      {
        id: 'website',
        title: 'About this website',
        paragraphs: ['This website presents Baithak furniture, collections, customisation ideas and examples of work. It is an enquiry website, not an online checkout. Sending a message or selecting customisation options does not place or confirm an order.'],
      },
      {
        id: 'details',
        title: 'Furniture images and details',
        paragraphs: ['Photographs and descriptions help you explore designs. Colours and textures can look different on different screens, and examples may show a particular finish or configuration. Confirm the dimensions, materials, upholstery, finish and suitability for your space directly with Baithak before ordering.'],
      },
      {
        id: 'quotations',
        title: 'Enquiries, quotations and orders',
        paragraphs: [
          'A website enquiry starts a conversation. Availability, the final design, price, taxes, any delivery or installation charges, and the payment schedule should be confirmed in your written quotation or order confirmation.',
          'Customisation selections on the website are preferences for discussion, not a final specification or price. Review and agree the full specification with Baithak before any production commitment or payment.',
        ],
      },
      {
        id: 'delivery',
        title: 'Delivery and installation',
        paragraphs: ['Confirm delivery coverage, timing, access requirements and any installation arrangements for your order. Tell Baithak about doorway, stairway, lift or room-access limitations when discussing a piece. This website does not provide a guaranteed delivery timeline.'],
      },
      {
        id: 'aftercare',
        title: 'Changes, cancellations and aftercare',
        paragraphs: [
          'Before ordering, ask Baithak to confirm the applicable change, cancellation, return, refund and warranty terms in writing, including any conditions for a made-to-order piece. This website does not set a universal refund period or warranty duration.',
          'If you have a concern about an order or a received piece, contact Baithak with the order details and relevant photographs. Nothing on this page is intended to exclude rights available to you under applicable consumer law.',
        ],
      },
      {
        id: 'use',
        title: 'Responsible use and website content',
        paragraphs: ['Use the website for lawful browsing and genuine enquiries. Do not attempt to disrupt the service, access restricted systems or send harmful content. Viewing the website does not grant permission to reuse Baithak branding or website content commercially; request permission from the relevant rights holder first.'],
      },
      {
        id: 'external-services',
        title: 'External services and privacy',
        paragraphs: ['Links to WhatsApp, maps and social platforms take you to independent services governed by their own terms. Opening an enquiry link does not guarantee message delivery. Review our Privacy Policy for information about the website enquiry flow.'],
      },
      {
        id: 'updates',
        title: 'Updates and questions',
        paragraphs: ['Website content and these terms may be updated. Any changes to an existing order should be discussed separately rather than assumed from a website update. Contact Baithak if you need clarification before placing an order.'],
      },
    ],
  },
};

function PolicyPage({ type }) {
  const policy = policies[type];

  useEffect(() => {
    document.title = `${policy.title} | Baithak`;
    window.scrollTo(0, 0);
  }, [policy.title]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main className="policy-page" id="main-content" tabIndex={-1}>
        <div className="container">
          <nav className="policy-page__breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">{policy.title}</span>
          </nav>
          <header className="policy-page__header">
            <h1>{policy.title}</h1>
            <p>{policy.introduction}</p>
            <p className="policy-page__date">Last updated: <time dateTime="2026-10-08">8 October 2026</time></p>
          </header>
          <div className="policy-page__layout">
            <nav className="policy-page__contents" aria-label="On this page">
              <h2>On this page</h2>
              {policy.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}
              <a href="#policy-contact">Contact Baithak</a>
            </nav>
            <article className="policy-page__body" aria-label={policy.title}>
              {policy.sections.map((section) => (
                <section id={section.id} aria-labelledby={`${section.id}-title`} key={section.id}>
                  <h2 id={`${section.id}-title`}>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </section>
              ))}
              <section id="policy-contact" aria-labelledby="policy-contact-title">
                <h2 id="policy-contact-title">Contact Baithak</h2>
                <p>For {type === 'privacy' ? 'privacy requests or concerns' : 'questions about these terms or your enquiry'}, email <a href={contactInfo.email.href}>{contactInfo.email.display}</a> or call <a href={contactInfo.phone.href}>{contactInfo.phone.display}</a>.</p>
                <address>{contactInfo.address.lines.join(' ')}</address>
                <a className="policy-page__related" href={type === 'privacy' ? '/terms' : '/privacy'}>{type === 'privacy' ? 'Terms & Conditions' : 'Privacy Policy'}</a>
              </section>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PolicyPage;
