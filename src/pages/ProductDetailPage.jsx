import { useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Armchair, Paintbrush, Ruler, SwatchBook } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import ProductGallery from '../components/ProductGallery.jsx';
import { contactInfo } from '../data/contact.js';
import { products } from '../data/products.js';
import '../styles/product-detail.css';

const customisationPossibilities = [
  ['Size', Ruler],
  ['Comfort', Armchair],
  ['Upholstery', SwatchBook],
  ['Finish', Paintbrush],
];

function ProductDetailPage({ product }) {
  useEffect(() => {
    document.title = `${product.name} | Baithak`;
    window.scrollTo(0, 0);
  }, [product.name]);

  const message = [
    'Hello Baithak,',
    '',
    `I am interested in the ${product.name}.`,
    '',
    'Please share more details about customisation and availability.',
  ].join('\n');
  const separator = contactInfo.whatsapp.href.includes('?') ? '&' : '?';
  const enquiryUrl = `${contactInfo.whatsapp.href}${separator}text=${encodeURIComponent(message)}`;
  const relatedProducts = products.filter((item) => item.slug !== product.slug);
  const overviewFields = [
    ['Type', product.category],
    ['Designed for', 'Residential furniture use'],
    ['Customisation', 'Through consultation'],
    ['Dimensions', product.dimensions],
    ['Materials', product.materials],
    ['Finishes', product.finishes],
    ['Upholstery', product.upholstery],
  ].filter(([, value]) => value != null && value !== '' && (!Array.isArray(value) || value.length > 0));

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main className="product-detail" id="main-content" tabIndex={-1}>
        <nav className="container product-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/furniture">Furniture</a></li>
            <li><span aria-current="page">{product.name}</span></li>
          </ol>
        </nav>

        <section className="container product-main" aria-labelledby="product-title">
          <ProductGallery product={product} key={product.slug} />
          <div className="product-main__copy">
            <p className="product-detail__eyebrow">{product.category}</p>
            <h1 id="product-title">{product.name}</h1>
            <p className="product-main__description">{product.shortDescription}</p>
            <p className="product-main__consultation">Discuss this piece around your space and requirements.</p>
            <div className="product-main__actions">
              <a className="button button-primary" href={enquiryUrl} target="_blank" rel="noopener noreferrer">
                Enquire About This Piece <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="product-detail__text-link" href="/contact#enquiry">Talk to Baithak <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className="product-overview product-detail__band" aria-labelledby="product-overview-title">
          <div className="container product-detail__split">
            <header>
              <p className="product-detail__eyebrow">Product overview</p>
              <h2 id="product-overview-title">A starting point for your space.</h2>
              <p>{product.overview}</p>
              {product.highlights.length > 0 && (
                <ul className="product-overview__highlights">
                  {product.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              )}
            </header>
            <dl className="product-overview__details">
              {overviewFields.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{Array.isArray(value) ? value.join(', ') : value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="product-customisation product-detail__band" aria-labelledby="product-customisation-title">
          <div className="container">
            <p className="product-detail__eyebrow">Made for your space</p>
            <h2 id="product-customisation-title">Made around you.</h2>
            <p>Size, comfort, upholstery and finish can be discussed around your room and requirements.</p>
            <ul className="product-customisation__possibilities">
              {customisationPossibilities.map(([label, Icon]) => (
                <li key={label}><Icon size={26} strokeWidth={1.5} aria-hidden="true" /><span>{label}</span></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="product-enquiry product-detail__band" aria-labelledby="product-enquiry-title">
          <div className="container product-enquiry__layout">
            <header>
              <p className="product-detail__eyebrow">Your next conversation</p>
              <h2 id="product-enquiry-title">Let&apos;s talk about {product.name}.</h2>
              <p>Share your room, references and requirements with Baithak.</p>
            </header>
            <a className="button button-primary" href={enquiryUrl} target="_blank" rel="noopener noreferrer">
              Enquire About This Piece <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="product-related product-detail__band" aria-labelledby="product-related-title">
          <div className="container">
            <p className="product-detail__eyebrow">You may also like</p>
            <h2 id="product-related-title">Other pieces to consider.</h2>
            <div className="product-related__grid">
              {relatedProducts.map((item) => (
                <a className="product-related__item" href={item.href} key={item.slug} aria-label={`View ${item.name}`}>
                  <img src={item.heroImage} alt={item.alt} loading="lazy" decoding="async" />
                  <p className="product-detail__eyebrow">{item.category}</p>
                  <h3>{item.name}</h3>
                  <span>View Piece <ArrowUpRight size={17} aria-hidden="true" /></span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ProductDetailPage;
