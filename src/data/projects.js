import { imageSources } from '../utils/images.js';

const livingImage = imageSources['../assets/images/project-01.png'];
const seatingImage = imageSources['../assets/images/project-02.png'];
const woodworkImage = imageSources['../assets/images/project-03.jpg'];

// Retain the existing editorial labels; project-specific facts await confirmation.
const projectDefinitions = [
  {
    slug: 'project-01',
    number: '01',
    titleLines: ['The Living Room,', 'Reconsidered.'],
    category: 'Custom Living',
    location: 'Bengaluru',
    shortDescription: 'A living-room seating arrangement that brings a sofa and armchairs together within the room.',
    introductionTitle: 'A living space shaped around seating.',
    heroImage: livingImage,
    imageAlt: 'Custom Baithak living room furniture project',
    heroAlt: 'Upholstered sofa and two armchairs with curved arm detailing in a living room',
    scope: ['Sofa', 'Armchairs'],
  },
  {
    slug: 'project-02',
    number: '02',
    titleLines: ['Built Around', 'Comfort.'],
    category: 'Bespoke Seating',
    location: 'Bengaluru',
    shortDescription: 'A sectional seating arrangement considered around comfort, proportion and the space it belongs in.',
    introductionTitle: 'Comfort, considered in the room.',
    heroImage: seatingImage,
    imageAlt: 'Bespoke seating project crafted by Baithak',
    heroAlt: 'Pink sectional sofa with a chaise in a furnished living room',
    scope: ['Sectional sofa'],
  },
  {
    slug: 'project-03',
    number: '03',
    titleLines: ['Made to Belong.'],
    category: 'Custom Woodwork',
    location: 'Bengaluru',
    shortDescription: 'A living-room seating arrangement that brings a sectional sofa into the setting of the room.',
    introductionTitle: 'Furniture that finds its place.',
    heroImage: woodworkImage,
    imageAlt: 'Green sectional sofa beside curtains in a living room',
    heroAlt: 'Green sectional sofa beside curtains in a living room',
    scope: ['Custom seating'],
    contentReview: {
      title: 'editorial-unconfirmed',
      category: 'inconsistent-with-image',
      location: 'unconfirmed',
      imageOwnership: 'unconfirmed',
    },
  },
];

export const projects = projectDefinitions.map((project) => ({
  // Additional supplied photographs use { src, alt }; do not repeat the hero.
  gallery: [],
  scope: [],
  materials: null,
  completion: null,
  client: null,
  contentReview: {
    title: 'editorial-unconfirmed',
    category: 'unconfirmed',
    location: 'unconfirmed',
    imageOwnership: 'unconfirmed',
  },
  approachTitle: 'Designed around the space.',
  approachDescription: 'The furniture, proportions and finishes are considered together so the final pieces feel integrated with the room.',
  ...project,
  title: project.titleLines.join(' '),
  href: `/our-work/${project.slug}`,
  seoDescription: project.seoDescription || project.shortDescription,
}));

export const getProjectBySlug = (slug) => projects.find((project) => project.slug === slug);
