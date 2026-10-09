import ResponsiveImage from './ResponsiveImage.jsx';
import { imageSources } from '../utils/images.js';
import { ArrowRight } from 'lucide-react';

const categoryImages = imageSources;

const categories = [
  {
    id: 'sofas',
    title: ['Custom', 'Sofas'],
    imagePath: '../assets/images/category-sofas.png',
    imageAlt: 'Custom sofa designed by Baithak',
    href: '/sofas',
  },
  {
    id: 'chairs',
    title: ['Chairs &', 'Seating'],
    imagePath: '../assets/images/category-chairs.png',
    imageAlt: 'Custom chair and seating by Baithak',
    href: '/chairs',
  },
  {
    id: 'custom-woodwork',
    title: ['Custom', 'Woodwork'],
    imagePath: '../assets/images/category-woodwork.jpg',
    imageAlt: 'Custom woodwork crafted by Baithak',
    href: '/custom-woodwork',
  },
  {
    id: 'bespoke-furniture',
    title: ['Bespoke', 'Furniture'],
    imagePath: '../assets/images/category-bespoke.jpg',
    imageAlt: 'Bespoke furniture created by Baithak',
    href: '/bespoke-furniture',
  },
];

function CategoryCards() {
  return (
    <section className="category-section" id="furniture" aria-label="Furniture categories">
      <div className="container">
        <div className="category-grid">
          {categories.map((category, index) => {
            const imageSource = categoryImages[category.imagePath];
            const accessibleTitle = category.title.join(' ');

            return (
              <a
                className={`category-card category-card-${index + 1}`}
                id={category.id}
                key={accessibleTitle}
                href={category.href}
              >
                <div className="category-image-wrap">
                  <span className="category-image-fallback" aria-hidden="true" />
                  {imageSource && (
                    <ResponsiveImage sizes="(max-width: 767px) 85vw, (max-width: 1023px) 50vw, 25vw"
                      className="category-image"
                      src={imageSource}
                      alt={category.imageAlt}
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.hidden = true;
                      }}
                    />
                  )}
                </div>

                <div className="category-card-content">
                  <h2>
                    {category.title.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h2>
                  <span className="category-arrow" aria-hidden="true">
                    <ArrowRight size={20} strokeWidth={1.7} />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CategoryCards;
