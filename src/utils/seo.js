import { contactInfo } from '../data/contact.js';

function setMeta(attribute, name, content) {
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.append(element);
  }
  element.setAttribute('content', content);
}

export function applyPageMeta({ title, description, canonical, noindex = false }) {
  document.title = title;
  setMeta('name', 'description', description);
  setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:type', 'website');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);

  let canonicalLink = document.head.querySelector('link[rel="canonical"]');
  if (canonical && !noindex) {
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.append(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);
    setMeta('property', 'og:url', canonical);
  } else {
    canonicalLink?.remove();
    document.head.querySelector('meta[property="og:url"]')?.remove();
  }

  let schema = document.head.querySelector('#baithak-business-schema');
  if (noindex) schema?.remove();
  else {
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'baithak-business-schema';
      schema.type = 'application/ld+json';
      document.head.append(schema);
    }
    // Phase 5 confirms only the display name and supplied email for publication here.
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'FurnitureStore',
      name: contactInfo.name, email: contactInfo.email.display,
    });
  }
}

export function restoreIndexing() {
  setMeta('name', 'robots', 'index, follow');
}
