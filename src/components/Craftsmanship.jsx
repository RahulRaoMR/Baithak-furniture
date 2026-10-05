import { ArrowRight } from 'lucide-react';

const craftsmanshipImages = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
});

const principles = [
  {
    number: '01',
    title: 'Materials with purpose',
    text: 'Chosen for how they look, feel and perform in everyday use.',
  },
  {
    number: '02',
    title: 'Comfort in the construction',
    text: 'Proportion, support and upholstery are considered together.',
  },
  {
    number: '03',
    title: 'Finished by detail',
    text: 'Edges, seams, surfaces and transitions receive the same attention as the overall form.',
  },
];

const detailImages = [
  {
    imagePath: '../assets/images/craftsmanship-upholstery.jpg',
    alt: 'Baithak upholstery detail',
  },
  {
    imagePath: '../assets/images/craftsmanship-wood.jpg',
    alt: 'Baithak woodwork detail',
  },
  {
    imagePath: '../assets/images/craftsmanship-detail.jpg',
    alt: 'Baithak furniture finishing detail',
  },
];

function Craftsmanship() {
  const mainImage = craftsmanshipImages['../assets/images/craftsmanship-main.jpg'];

  return (
    <section className="craftsmanship" id="craftsmanship" aria-labelledby="craftsmanship-title">
      <div className="container craftsmanship__layout">
        <div className="craftsmanship__visual">
          <span className="craftsmanship__image-fallback" aria-hidden="true" />
          {mainImage && (
            <img
              className="craftsmanship__main-image"
              src={mainImage}
              alt="Baithak furniture craftsmanship"
              loading="lazy"
              decoding="async"
              onError={(event) => {
                event.currentTarget.hidden = true;
              }}
            />
          )}
        </div>

        <div className="craftsmanship__content">
          <header>
            <p className="craftsmanship__eyebrow">In the details</p>
            <h2 className="craftsmanship__title" id="craftsmanship-title">
              Made well.
              <br />
              Felt every day.
            </h2>
            <p className="craftsmanship__intro">
              From the material beneath the surface to the finishing touch you see and feel,
              every detail contributes to how a piece lives in your space.
            </p>
          </header>

          <div className="craftsmanship__principles">
            {principles.map((principle) => (
              <article className="craftsmanship__principle" key={principle.number}>
                <span className="craftsmanship__number" aria-hidden="true">
                  {principle.number}
                </span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>

          <a className="craftsmanship__link" href="/materials">
            Explore Materials &amp; Finishes
            <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </div>

        <div className="craftsmanship__details" aria-label="Craftsmanship details">
          {detailImages.map((detail, index) => {
            const imageSource = craftsmanshipImages[detail.imagePath];

            return (
              <div className={`craftsmanship__detail craftsmanship__detail--${index + 1}`} key={detail.alt}>
                <span className="craftsmanship__image-fallback" aria-hidden="true" />
                {imageSource && (
                  <img
                    src={imageSource}
                    alt={detail.alt}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.hidden = true;
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Craftsmanship;
