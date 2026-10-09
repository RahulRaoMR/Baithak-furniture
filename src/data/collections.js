import { imageSources } from '../utils/images.js';

const collectionImages = imageSources;

const collectionDefinitions = [
  {
    slug: 'living',
    label: 'Living',
    title: 'Sofas & Sectionals',
    imagePath: '../assets/images/collection-sofas.png',
    alt: 'Baithak sofa collection',
    intro: 'Sofas, sectionals, coffee tables and upholstered accents for the room where you unwind.',
    furniturePaths: ['/sectionals', '/coffee-tables', '/ottomans-benches'],
  },
  {
    slug: 'seating',
    label: 'Seating',
    title: 'Chairs & Recliners',
    imagePath: '../assets/images/collection-chairs.png',
    alt: 'Baithak chairs and recliners collection',
    intro: 'Lounge chairs, recliners and ottomans, with comfort and upholstery chosen around you.',
    furniturePaths: ['/chairs', '/recliners', '/ottomans-benches'],
  },
  {
    slug: 'bedroom',
    label: 'Bedroom',
    title: 'Beds',
    imagePath: '../assets/images/furniture-mira-bed.png',
    alt: 'Charcoal tufted Baithak bed in a furnished bedroom',
    intro: 'Upholstered beds, headboards and bedside furniture coordinated for your bedroom.',
    furniturePaths: ['/beds', '/bedside'],
  },
  {
    slug: 'dining',
    label: 'Dining',
    title: 'Dining',
    imagePath: '../assets/images/collection-dining.jpg',
    alt: 'Baithak dining furniture collection',
    intro: 'Tables and upholstered dining chairs made for gathering, conversation and everyday meals.',
    furniturePaths: ['/dining', '/dining-chairs'],
  },
  {
    slug: 'tables',
    label: 'Tables',
    title: 'Tables',
    imagePath: '../assets/images/collection-tables.jpg',
    alt: 'Baithak table collection',
    intro: 'Dining, coffee and side tables adapted to your space and chosen finishes.',
    furniturePaths: ['/tables'],
  },
  {
    slug: 'bespoke',
    label: 'Bespoke',
    title: 'Custom Furniture',
    description: 'Designed around the architecture, made around the way you use it.',
    action: 'Explore Custom Work',
    imagePath: '../assets/images/collection-woodwork.jpg',
    alt: 'Baithak custom woodwork collection',
    intro: 'Custom seating, beds and room details shaped around your dimensions, materials and ideas.',
    furniturePaths: ['/custom', '/beds'],
  },
];

export const collections = collectionDefinitions.map((collection) => ({
  ...collection,
  href: `/collections/${collection.slug}`,
  image: collectionImages[collection.imagePath],
}));
