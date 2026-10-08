import miraBedImage from '../assets/images/furniture-mira-bed.png';

const galleryImages = import.meta.glob('../assets/images/gallery/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
});

const categoryDefinitions = [
  {
    slug: 'sectionals',
    title: 'Sectionals',
    intro: 'Corner and L-shaped seating adapted to your room, upholstery and preferred comfort.',
    studio: [6],
    archive: [2, 3, 5, 6, 7, 8],
  },
  {
    slug: 'chairs',
    title: 'Chairs',
    intro: 'Accent chairs, lounge seating and upholstered chairs made around your space.',
    studio: [14, 2, 3],
    archive: [43, 44, 73, 118, 119, 120],
  },
  {
    slug: 'recliners',
    title: 'Recliners',
    intro: 'Explore reclining chairs and seating with upholstery and proportions chosen for you.',
    studio: [7, 8, 9, 1],
    archive: [65, 67, 70],
  },
  {
    slug: 'ottomans-benches',
    title: 'Ottomans & Benches',
    intro: 'Upholstered footstools, ottomans and benches for a finishing touch or an extra seat.',
    studio: [14],
    archive: [131, 60],
  },
  {
    slug: 'beds',
    title: 'Beds',
    intro: 'Upholstered beds and headboards tailored to your room, materials and storage needs.',
    archiveOverrides: { 57: miraBedImage },
    studio: [5],
    archive: [
      10, 12, 39, 40, 42, 47, 48, 49, 50, 51, 52, 55, 56, 57, 58, 60, 71, 75, 76,
      77, 78, 79, 82, 83, 84, 85, 97, 99, 109, 110, 111, 112, 113, 114, 115, 121,
      122, 133,
    ],
  },
  {
    slug: 'bedside',
    title: 'Bedside Furniture',
    intro: 'Bedside storage and tables coordinated with your bed and the layout of your room.',
    archive: [84, 12, 110, 10],
  },
  {
    slug: 'dining',
    title: 'Dining Tables',
    intro: 'Dining furniture planned around your space, seating requirements and everyday use.',
    archive: [107],
    additionalImages: [
      'dining-001.jpeg', 'dining-002.jpeg', 'dining-003.jpeg', 'dining-004.jpeg',
      'dining-005.jpeg', 'dining-006.jpeg', 'dining-007.jpeg',
    ],
  },
  {
    slug: 'dining-chairs',
    title: 'Dining Chairs',
    intro: 'Upholstered dining chairs with finishes and comfort chosen to complement your table.',
    archive: [107],
    additionalImages: [
      'dining-chair-001.jpeg', 'dining-chair-002.jpeg', 'dining-chair-003.jpeg',
      'dining-chair-004.jpeg', 'dining-chair-005.jpeg', 'dining-chair-006.jpeg',
      'dining-chair-007.jpeg',
    ],
  },
  {
    slug: 'coffee-tables',
    title: 'Coffee Tables',
    intro: 'Coffee tables proportioned to your seating, with materials and finishes selected for your room.',
    studio: [11],
    archive: [45],
    additionalImages: [
      'coffee-table-001.jpeg', 'coffee-table-002.jpeg', 'coffee-table-003.jpeg',
      'coffee-table-004.jpeg', 'coffee-table-005.jpeg', 'coffee-table-006.jpeg',
      'coffee-table-007.jpeg', 'coffee-table-008.jpeg', 'coffee-table-009.jpeg',
      'coffee-table-010.jpeg',
    ],
  },
  {
    slug: 'side-tables',
    title: 'Side Tables',
    intro: 'Compact tables and storage pieces made to fit alongside your seating or bed.',
    archive: [84, 12, 110],
    additionalImages: [
      'side-table-001.jpeg', 'side-table-002.jpeg', 'side-table-003.jpeg',
      'side-table-004.jpeg', 'side-table-005.jpeg', 'side-table-006.jpeg',
    ],
  },
  {
    slug: 'custom',
    title: 'Custom Furniture',
    intro: 'Explore furniture made in our studio, then discuss the dimensions, upholstery and details for your own piece.',
    studio: [14, 5, 6, 7, 2, 3, 4, 8, 9, 10, 11, 12, 13, 1],
    archive: [43, 44, 45, 107, 120, 131],
  },
  {
    slug: 'tables',
    title: 'Tables',
    intro: 'Explore dining, coffee and side tables, with sizes and finishes adapted to your room.',
    studio: [11],
    archive: [45, 107, 84],
  },
];

export const furnitureCategories = Object.fromEntries(
  categoryDefinitions.map(({ studio = [], archive = [], archiveOverrides = {}, additionalImages = [], ...category }) => [
    `/${category.slug}`,
    {
      ...category,
      images: [
        ...studio.map((id) => galleryImages[`../assets/images/gallery/studio-${String(id).padStart(3, '0')}.png`]),
        ...archive.map((id) => archiveOverrides[id] ||
          galleryImages[`../assets/images/gallery/archive-${String(id).padStart(3, '0')}.jpg`]),
        ...additionalImages.map((file) => galleryImages[`../assets/images/gallery/${file}`]),
      ].filter(Boolean).map((src) => ({
        src,
        label: category.title,
      })),
    },
  ]),
);

furnitureCategories['/bespoke-furniture'] = furnitureCategories['/custom'];
furnitureCategories['/furniture'] = furnitureCategories['/custom'];
