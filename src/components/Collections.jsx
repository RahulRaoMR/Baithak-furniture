import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { collections } from '../data/collections.js';

function Collections({ standalone = false }) {
  const Heading = standalone ? 'h1' : 'h2';
  return (
    <section
      className={`collections${standalone ? ' collections--page' : ''}`}
      id="collections"
      aria-labelledby="collections-title"
    >
      <div className="container">
        <header className="collections__header">
          <div>
            <p className="collections__eyebrow">What we make</p>
            <Heading className="collections__title" id="collections-title">
              {standalone ? 'Collections' : (
                <>
                  Furniture for every
                  <br />
                  part of living.
                </>
              )}
            </Heading>
            <p className="collections__intro">
              From everyday seating to statement pieces and custom woodwork, each collection
              begins with proportion, material and the space around it.
            </p>
          </div>
          {!standalone && (
            <a className="collections__explore" href="/collections">
              View All Collections <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
            </a>
          )}
        </header>

        <div className="collections__grid">
          {collections.map((collection, index) => {
            const imageSource = collection.image;

            return (
              <a
                className={`collections__item collections__item--${index + 1}`}
                href={collection.href}
                key={collection.title}
                aria-label={`Explore ${standalone ? `${collection.label} Collection` : collection.title}`}
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
                  <span className="collections__label">{standalone ? collection.title : collection.label}</span>
                  <span className="collections__name">{standalone ? collection.label : collection.title}</span>
                  {!standalone && collection.description && (
                    <span className="collections__woodwork-copy">{collection.description}</span>
                  )}
                  {!standalone && collection.action && (
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
