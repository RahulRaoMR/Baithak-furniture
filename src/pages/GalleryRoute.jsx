import PortfolioCollection from './PortfolioCollection.jsx';
import { furnitureCategories } from '../data/furniture.js';
import { collectionPages } from '../data/collectionPages.js';

export default function GalleryRoute({ path }) {
  const category = furnitureCategories[path] || collectionPages[path];
  return <PortfolioCollection variant={category?.slug || (path === '/our-work' ? 'work' : 'woodwork')} category={category} />;
}
