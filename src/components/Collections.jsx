import { ArrowRight, ArrowUpRight } from 'lucide-react';

const collectionImages = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
});

const collections = [
  {
    label: 'Living',
    title: 'Sofas & Sectionals',
    imagePath: '../assets/images/collection-sofas.png',
    alt: 'Baithak sofa collection',
    href: '/sofas',
  },
  {
    label: 'Seating',
    title: 'Chairs & Recliners',
    imagePath: '../assets/images/collection-chairs.png',
    alt: 'Baithak chairs and recliners collection',
    href: '/chairs',
  },
  {
    label: 'Bedroom',
    title: 'Beds',
    imagePath: '../assets/images/collection-beds.jpg',
    alt: 'Baithak bed collection',
    href: '/beds',
  },
  {
    label: 'Dining',
    title: 'Dining',
    imagePath: '../assets/images/collection-dining.jpg',
    alt: 'Baithak dining furniture collection',
    href: '/dining',
  },
  {
    label: 'Tables',
    title: 'Tables',
    imagePath: '../assets/images/collection-tables.jpg',
    alt: 'Baithak table collection',
    href: '/tables',
  },
  {
    label: 'Bespoke',
    title: 'Custom Woodwork',
    description: 'Designed around the architecture, made around the way you use it.',
    action: 'Explore Custom Work',
    imagePath: '../assets/images/collection-woodwork.jpg',
    alt: 'Baithak custom woodwork collection',
    href: '/custom-woodwork',
  },
];

function Collections() {
  return (
    <section className="collections" id="collections" aria-labelledby="collections-title">
      <div className="container">
        <header className="collections__header">
          <div>
            <p className="collections__eyebrow">What we make</p>
            <h2 className="collections__title" id="collections-title">
              Furniture for every
              <br />
              part of living.
            </h2>
            <p className="collections__intro">
              From everyday seating to statement pieces and custom woodwork, each collection
              begins with proportion, material and the space around it.
            </p>
          </div>
          <a className="collections__explore" href="/furniture">
            Explore All Furniture <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </header>

        <div className="collections__grid">
          {collections.map((collection, index) => {
            const imageSource = collectionImages[collection.imagePath];

            return (
              <a
                className={`collections__item collections__item--${index + 1}`}
                href={collection.href}
                key={collection.title}
                aria-label={`Explore ${collection.title}`}
              >
                <span className="collections__media">
                  <span className="collections__image-fallback" aria-hidden="true" />
                  {imageSource && (
                    <img
                      className="collections__image"
                      src={imageSource}
                      alt={collection.alt}
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.hidden = true;
                      }}
                    />
                  )}
                </span>
                <span className="collections__overlay" aria-hidden="true" />

                <span className="collections__content">
                  <span className="collections__label">{collection.label}</span>
                  <span className="collections__name">{collection.title}</span>
                  {collection.description && (
                    <span className="collections__woodwork-copy">{collection.description}</span>
                  )}
                  {collection.action && (
                    <span className="collections__woodwork-link">
                      {collection.action}
                      <ArrowRight size={17} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                  )}
                </span>

                <span className="collections__arrow" aria-hidden="true">
                  <ArrowUpRight size={21} strokeWidth={1.7} />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Collections;
