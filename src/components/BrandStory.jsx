import { ArrowRight } from 'lucide-react';

const storyImages = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
});

const storyImage = storyImages['../assets/images/brand-story.png'];

function BrandStory() {
  return (
    <section className="brand-story" id="about" aria-labelledby="brand-story-title">
      <div className="container brand-story__intro">
        <header>
          <p className="brand-story__eyebrow">
            <span aria-hidden="true" />
            Our approach
          </p>

          <h2 className="brand-story__title" id="brand-story-title">
            <span>
              Not picked from
              <br />a catalogue.
            </span>
            <span className="brand-story__title-accent">
              Designed from
              <br />an idea.
            </span>
          </h2>

          <p className="brand-story__description">
            Every Baithak piece begins with a conversation - about your space, how you live, and
            what you need from it. From proportion and comfort to materials and finishes, every
            detail is considered before it is crafted.
          </p>
        </header>
      </div>

      <div className="brand-story__visual">
        <div className="brand-story__media">
          <span className="brand-story__image-fallback" aria-hidden="true" />
          {storyImage && (
            <img
              className="brand-story__image"
              src={storyImage}
              alt="Baithak upholstered furniture arranged in a living room"
              loading="lazy"
              decoding="async"
              onError={(event) => {
                event.currentTarget.hidden = true;
              }}
            />
          )}
        </div>

        <article className="brand-story__card">
          <p className="brand-story__card-label">Built around you</p>
          <h3>
            Your space.
            <br />
            Your comfort.
            <br />
            Your way of living.
          </h3>
          <p>
            We design around real dimensions, real routines and real requirements - creating
            furniture that belongs exactly where it is meant to.
          </p>
          <a className="brand-story__link" href="/about">
            Discover Our Approach <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </article>
      </div>
    </section>
  );
}

export default BrandStory;
