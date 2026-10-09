import { furnitureCategories } from './furniture.js';
import { collections } from './collections.js';

export const collectionPages = Object.fromEntries(collections.map((collection) => {
  const images = collection.furniturePaths.flatMap((path) => furnitureCategories[path].images);
  if (collection.slug === 'living' || collection.slug === 'bespoke') {
    images.unshift({ src: collection.image, label: collection.title });
  }

  return [collection.href, {
    slug: `collection-${collection.slug}`,
    group: 'Collections',
    title: `${collection.label} Collection`,
    intro: collection.intro,
    images: [...new Map(images.map((image) => [image.src.split('#')[0], image])).values()],
  }];
}));
