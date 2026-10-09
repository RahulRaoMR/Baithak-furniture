import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import images from './src/data/image-manifest.js';

const hero = images.images[images.sources['../assets/images/gallery/studio-006.png']];
const heroPreload = `if(location.pathname==='/'){const mobile=matchMedia('(max-width: 767px)').matches;const link=document.createElement('link');link.rel='preload';link.as='image';link.type='image/webp';link.href=mobile?${JSON.stringify(hero.mobile.webp)}:${JSON.stringify(hero.variants.at(-1).src)};if(!mobile){link.setAttribute('imagesrcset',${JSON.stringify(hero.variants.map(image => `${image.src} ${image.width}w`).join(', '))});link.setAttribute('imagesizes','(max-width: 1024px) 1900px, 100vw');}link.setAttribute('fetchpriority','high');document.head.append(link);}`;

export default defineConfig({
  plugins: [react(), {
    name: 'home-hero-preload',
    transformIndexHtml() {
      return [{ tag: 'script', children: heroPreload, injectTo: 'head' }];
    },
  }],
});
