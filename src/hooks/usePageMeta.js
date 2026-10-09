import { useEffect } from 'react';
import { getPageMeta } from '../data/routes.js';
import { applyPageMeta, restoreIndexing } from '../utils/seo.js';

export default function usePageMeta(path) {
  useEffect(() => {
    applyPageMeta(getPageMeta(path));
    return restoreIndexing;
  }, [path]);
}
