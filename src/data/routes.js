import { products } from './products.js';
import { projects } from './projects.js';

const standardPages = {
  '/': ['Baithak | Custom Furniture & Upholstered Furniture in Bengaluru', 'Explore custom sofas, seating, beds, dining furniture and bespoke woodwork by Baithak in Bengaluru. Furniture considered around your space and everyday life.'],
  '/about': ['About Baithak | Custom Furniture in Bengaluru', 'Meet Baithak and explore an approach to custom furniture centred on your room, comfort and personal choices. Start a conversation about your space.'],
  '/contact': ['Contact Baithak | Furniture Enquiries in Bengaluru', 'Contact Baithak for furniture enquiries in Bengaluru. Share your room, measurements and references, or connect by phone, email and a prepared WhatsApp message.'],
  '/materials': ['Materials & Finishes | Baithak', 'Explore upholstery, wood tones and finishing details with Baithak. Consider texture and colour for your room, then discuss the options for your piece.'],
  '/collections': ['Furniture Collections | Baithak', 'Explore Baithak furniture collections for living, seating, bedroom, dining, tables and bespoke ideas. Find a reference for your next furniture conversation.'],
  '/customise': ['Customise Your Furniture | Baithak', 'Explore size, comfort, upholstery and finish preferences with Baithak. Share your selected direction through WhatsApp and discuss what works for your room.'],
  '/sofas': ['Sofas & Sectionals | Baithak', 'Browse sofa and sectional photographs with Baithak. Explore forms and proportions, then discuss your room, seating comfort and upholstery preferences.'],
  '/custom-woodwork': ['Custom Woodwork & Upholstered Walls | Baithak', 'Explore photographs of beds, headboards, upholstered walls and room details with Baithak. Discuss the scope and requirements of your furniture project.'],
  '/our-work': ['Our Work | Baithak', 'Explore furniture photographs, from workshop views to room settings, in the Baithak portfolio. Open a project reference or discuss ideas for your space.'],
  '/privacy': ['Privacy Policy | Baithak', 'Read how the Baithak website handles furniture enquiries, contact information and links to external services, including WhatsApp. Contact us with questions.'],
  '/terms': ['Terms & Conditions | Baithak', 'Read the terms for using the Baithak website, furniture references and enquiry links. Confirm the details of any custom furniture order directly with Baithak.'],
};

const categoryPages = [
  ['sectionals', 'Sectionals', 'corner and L-shaped seating'],
  ['chairs', 'Chairs', 'accent chairs and upholstered seating'],
  ['recliners', 'Recliners', 'reclining chairs and seating'],
  ['ottomans-benches', 'Ottomans & Benches', 'footstools, ottomans and benches'],
  ['beds', 'Beds', 'upholstered beds and headboards'],
  ['bedside', 'Bedside Furniture', 'bedside tables and storage in bedroom settings'],
  ['dining', 'Dining Tables', 'dining tables and table settings'],
  ['dining-chairs', 'Dining Chairs', 'upholstered dining-chair references'],
  ['coffee-tables', 'Coffee Tables', 'coffee tables and living-room settings'],
  ['side-tables', 'Side Tables', 'compact side and bedside tables'],
  ['tables', 'Tables', 'dining, coffee and side-table references'],
  ['custom', 'Custom Furniture', 'seating, beds and furniture references'],
  ['furniture', 'Furniture', 'furniture references for your room'],
  ['bespoke-furniture', 'Bespoke Furniture', 'custom furniture references and room ideas'],
];

export const pageMetadata = Object.fromEntries([
  ...Object.entries(standardPages).map(([path, [title, description]]) => [path, { title, description }]),
  ...categoryPages.map(([slug, title, subject]) => [`/${slug}`, {
    title: `${title} | Baithak`,
    description: `Browse ${subject} with Baithak. Explore the gallery, then discuss your room, dimensions and preferences through a furniture enquiry.`,
  }]),
  ...['Living', 'Seating', 'Bedroom', 'Dining', 'Tables', 'Bespoke'].map(label => [`/collections/${label.toLowerCase()}`, {
    title: `${label} Collection | Baithak`,
    description: `Explore the ${label.toLowerCase()} furniture collection with Baithak. Browse photographs for reference, then discuss the details and requirements of your space with us.`,
  }]),
  ...products.map(product => [product.href, { title: `${product.name} | Baithak`, description: product.shortDescription }]),
  ...projects.map(project => [project.href, { title: `${project.title} | Baithak`, description: project.shortDescription }]),
].map(([path, metadata]) => [path, {
  ...metadata,
  canonical: new URL(path, 'https://www.baithakfurniture.com/').href,
}]));

export const publicRoutes = Object.keys(pageMetadata);

export function getPageMeta(path) {
  return pageMetadata[path] || {
    title: 'Page Not Found | Baithak',
    description: 'This page could not be found. Return to Baithak to explore furniture photographs, collections and ways to discuss your space with us.',
    noindex: true,
  };
}
