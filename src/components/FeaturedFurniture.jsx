import { ArrowRight, ArrowUpRight } from 'lucide-react';

const furnitureImages = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
});

const products = [
  {
    name: 'Aster Sofa',
    category: 'Sofa',
    imagePath: '../assets/images/furniture-aster-sofa.png',
    hoverImage: null,
    alt: 'Baithak Aster Sofa',
    href: '/furniture/aster-sofa',
  },
  {
    name: 'Noma Lounge Chair',
    category: 'Lounge Chair',
    imagePath: '../assets/images/furniture-noma-chair.png',
    hoverImage: null,
    alt: 'Baithak Noma Lounge Chair',
    href: '/furniture/noma-chair',
  },
  {
    name: 'Arden Dining',
    category: 'Dining',
    imagePath: '../assets/images/furniture-arden-dining.jpg',
    hoverImage: null,
    alt: 'Baithak Arden Dining furniture',
    href: '/furniture/arden-dining',
  },
  {
    name: 'Mira Bed',
    category: 'Upholstered Bed',
    imagePath: '../assets/images/furniture-mira-bed.png',
    hoverImage: null,
    alt: 'Baithak Mira upholstered bed',
    href: '/furniture/mira-bed',
  },
];

const categories = [
  ['Sofas', '/sofas'],
  ['Chairs', '/chairs'],
  ['Beds', '/beds'],
  ['Dining', '/dining'],
  ['Tables', '/tables'],
  ['Custom', '/custom'],
];

function FeaturedFurniture() {
  return (
    <section className="featured-furniture" aria-labelledby="featured-furniture-title">
      <div className="container">
        <header className="featured-furniture__header">
          <div>
            <p className="featured-furniture__eyebrow">New collection</p>
            <h2 className="featured-furniture__title" id="featured-furniture-title">
              Made to take its place.
            </h2>
            <p className="featured-furniture__intro">
              Furniture considered in proportion, comfort and material - then made around the
              space it will call home.
            </p>
          </div>
          <a className="featured-furniture__explore" href="/furniture">
            Explore All Furniture <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </header>

        <nav className="featured-furniture__categories" aria-label="Furniture categories">
          {categories.map(([label, href]) => (
            <a href={href} key={label}>
              {label}
            </a>
          ))}
        </nav>

        <div className="featured-furniture__grid">
          {products.map((product, index) => {
            const imageSource = furnitureImages[product.imagePath];

            return (
              <a
                className={`featured-furniture__product featured-furniture__product--${index + 1}`}
                href={product.href}
                key={product.name}
                aria-label={`View ${product.name}`}
              >
                <span className="featured-furniture__media">
                  <span className="featured-furniture__image-fallback" aria-hidden="true" />
                  {imageSource && (
                    <img
                      className="featured-furniture__image"
                      src={imageSource}
                      alt={product.alt}
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.hidden = true;
                      }}
                    />
                  )}
                </span>

                <span className="featured-furniture__meta">
                  <span className="featured-furniture__category">{product.category}</span>
                  <span className="featured-furniture__name">{product.name}</span>
                  <span className="featured-furniture__link">
                    View Piece <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                </span>
              </a>
            );
          })}
        </div>

        <footer className="featured-furniture__footer">
          <p>Every piece can begin with your room.</p>
          <a href="/contact">
            Design With Us <ArrowRight size={17} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </footer>
      </div>
    </section>
  );
}

export default FeaturedFurniture;
