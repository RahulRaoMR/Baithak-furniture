import manifest from '../data/gallery-image-manifest.js';
import { imageSources as coreImages, registerImages } from './images.js';

export const imageSources = { ...coreImages, ...registerImages(manifest) };
