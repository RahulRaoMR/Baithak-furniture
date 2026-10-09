import manifest from '../data/image-manifest.js';

const detailsByUrl = { ...manifest.images };
export const imageDetails = {};

export function registerImages(collection) {
  Object.assign(detailsByUrl, collection.images);
  // Fragments preserve logical gallery identity without extra network requests.
  return Object.fromEntries(Object.entries(collection.sources).map(([key, src]) => {
    const identity = `${src}#${encodeURIComponent(key)}`;
    imageDetails[identity] = detailsByUrl[src];
    return [key, identity];
  }));
}

export const imageSources = registerImages(manifest);

export function galleryImageSizes(src) {
  const image = imageDetails[src];
  const ratio = image ? image.width / image.height : 1;
  // Rows can stretch their final tile; preserve its clarity as well as cropped detail.
  return `(max-width: 767px) max(100vw, ${Math.ceil(220 * ratio)}px), (max-width: 1023px) max(100vw, ${Math.ceil(280 * ratio)}px), max(100vw, ${Math.ceil(360 * ratio)}px)`;
}
