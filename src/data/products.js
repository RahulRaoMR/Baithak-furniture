import { imageSources } from '../utils/images.js';

const asterImage = imageSources['../assets/images/furniture-aster-sofa.png'];
const nomaImage = imageSources['../assets/images/furniture-noma-chair.png'];
const ardenImage = imageSources['../assets/images/furniture-arden-dining.jpg'];
const miraImage = imageSources['../assets/images/furniture-mira-bed.png'];

// Existing working names; replace these records when the catalogue is confirmed.
const productDefinitions = [
  {
    slug: 'aster-sofa',
    name: 'Aster Sofa',
    category: 'Sofa',
    shortDescription: 'Considered around comfort, proportion and the room where you unwind.',
    overview: 'Start with this sofa as a reference, then discuss your room and seating preferences with Baithak.',
    heroImage: asterImage,
    alt: 'Pink sectional sofa with a chaise in a living-room setting',
  },
  {
    slug: 'noma-chair',
    name: 'Noma Lounge Chair',
    category: 'Lounge Chair',
    shortDescription: 'A lounge chair to give a favourite corner its own place to settle.',
    overview: 'Consider this chair for your seating arrangement and discuss how it could fit your space.',
    heroImage: nomaImage,
    alt: 'Orange upholstered armchair with a padded back and seat',
  },
  {
    slug: 'arden-dining',
    name: 'Arden Dining',
    category: 'Dining',
    shortDescription: 'Dining furniture considered around the moments you share at the table.',
    overview: 'Use this dining design as a starting point for a conversation about your room and the way you gather.',
    heroImage: ardenImage,
    alt: 'White rectangular table and blue upholstered chairs in an office-style setting',
  },
  {
    slug: 'mira-bed',
    name: 'Mira Bed',
    category: 'Upholstered Bed',
    shortDescription: 'An upholstered bed to shape the room where you slow down.',
    overview: 'Explore this bed as a reference for your bedroom and discuss your requirements with Baithak.',
    heroImage: miraImage,
    alt: 'Charcoal upholstered bed frame with a tall tufted headboard',
  },
];

export const products = productDefinitions.map((product) => ({
  // Add additional supplied views as { src, alt }; the hero is already included.
  gallery: [],
  highlights: [],
  dimensions: null,
  materials: null,
  finishes: null,
  upholstery: null,
  intendedUse: null,
  customSizes: null,
  warranty: null,
  leadTime: null,
  pricing: null,
  delivery: null,
  // Internal review metadata; working names are not approved catalogue names.
  contentReview: {
    name: 'unconfirmed',
    description: 'editorial-reference',
    imageOwnership: 'unconfirmed',
    specifications: 'not-supplied',
  },
  ...product,
  href: `/furniture/${product.slug}`,
}));

export const getProductBySlug = (slug) => products.find((product) => product.slug === slug);
