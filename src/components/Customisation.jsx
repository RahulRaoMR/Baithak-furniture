import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const customisationImages = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
});

const customisationImage = customisationImages['../assets/images/customisation-main.png'];

const customisationOptions = [
  {
    id: 'size',
    number: '01',
    label: 'Size',
    heading: 'Sized for your room.',
    description:
      'Choose proportions that work with your space rather than forcing your space around the furniture.',
    options: ['Compact', '2 Seater', '3 Seater', 'Sectional', 'Custom'],
    note: 'Dimensions can be finalised during consultation.',
  },
  {
    id: 'comfort',
    number: '02',
    label: 'Comfort',
    heading: 'Comfort is personal.',
    description:
      'Seat depth, support and softness can be considered around how you prefer to sit, lounge and live.',
    options: ['Structured', 'Balanced', 'Relaxed', 'Deep Lounge'],
  },
  {
    id: 'upholstery',
    number: '03',
    label: 'Upholstery',
    heading: 'Choose what the room feels like.',
    description:
      'Explore textures and colours that complement the furniture, the room and everyday use.',
    options: ['Textured Weave', 'Soft Neutral', 'Warm Earth', 'Deep Tone'],
    hasSwatches: true,
  },
  {
    id: 'finish',
    number: '04',
    label: 'Finish',
    heading: 'Finish the details.',
    description:
      'Refine the material, legs, wood tone and finishing details that complete the piece.',
    options: ['Natural', 'Warm Walnut', 'Dark Wood', 'Custom Finish'],
  },
];

const initialSelections = {
  size: '3 Seater',
  comfort: 'Balanced',
  upholstery: 'Soft Neutral',
  finish: 'Warm Walnut',
};

function Customisation() {
  const [activeTab, setActiveTab] = useState('size');
  const [selections, setSelections] = useState(initialSelections);
  const activeOption = customisationOptions.find((option) => option.id === activeTab);

  const selectOption = (value) => {
    setSelections((current) => ({ ...current, [activeTab]: value }));
  };

  const handleTabKeyDown = (event, currentIndex) => {
    const lastIndex = customisationOptions.length - 1;
    let nextIndex = currentIndex;

    if (event.key === 'ArrowRight') nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    if (event.key === 'ArrowLeft') nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = lastIndex;
    if (nextIndex === currentIndex && !['Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    const nextTab = customisationOptions[nextIndex];
    setActiveTab(nextTab.id);
    document.getElementById(`customisation-tab-${nextTab.id}`)?.focus();
  };

  return (
    <section className="customisation" id="customisation" aria-labelledby="customisation-title">
      <div className="container">
        <header className="customisation__header">
          <p className="customisation__eyebrow">Made for you</p>
          <h2 id="customisation-title">
            Your space.
            <br />
            Your comfort.
            <br />
            Your finish.
          </h2>
          <p>
            Begin with a design you love, then shape the details around your room and the way you
            live.
          </p>
        </header>

        <div className="customisation__layout">
          <div className="customisation__visual">
            <span className="customisation__image-fallback" aria-hidden="true" />
            {customisationImage && (
              <img
                className="customisation__image"
                src={customisationImage}
                alt="Customisable Baithak furniture in a considered interior"
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  event.currentTarget.hidden = true;
                }}
              />
            )}
          </div>

          <div className="customisation__panel">
            <div className="customisation__tabs" role="tablist" aria-label="Customisation options">
              {customisationOptions.map((option, index) => (
                <button
                  className={`customisation__tab${activeTab === option.id ? ' is-active' : ''}`}
                  id={`customisation-tab-${option.id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === option.id}
                  aria-controls="customisation-panel"
                  tabIndex={activeTab === option.id ? 0 : -1}
                  key={option.id}
                  onClick={() => setActiveTab(option.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  <span>{option.number}</span>
                  {option.label}
                </button>
              ))}
            </div>

            <div
              className="customisation__content"
              id="customisation-panel"
              role="tabpanel"
              aria-labelledby={`customisation-tab-${activeOption.id}`}
              tabIndex={0}
              key={activeOption.id}
            >
              <h3>{activeOption.heading}</h3>
              <p>{activeOption.description}</p>

              <div className="customisation__options" aria-label={`${activeOption.label} choices`}>
                {activeOption.options.map((option, index) => (
                  <button
                    className={`customisation__option${
                      selections[activeTab] === option ? ' is-selected' : ''
                    }`}
                    type="button"
                    aria-pressed={selections[activeTab] === option}
                    key={option}
                    onClick={() => selectOption(option)}
                  >
                    {activeOption.hasSwatches && (
                      <span
                        className={`customisation__swatch customisation__swatch--${index + 1}`}
                        aria-hidden="true"
                      />
                    )}
                    {option}
                  </button>
                ))}
              </div>

              {activeOption.note && <p className="customisation__note">{activeOption.note}</p>}
            </div>

            <div className="customisation__summary" aria-live="polite">
              <p className="customisation__summary-label">Your direction</p>
              <dl>
                {customisationOptions.map((option) => (
                  <div key={option.id}>
                    <dt>{option.label}</dt>
                    <dd>{selections[option.id]}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="customisation__cta">
              <a className="button button-primary" href="/contact">
                Design My Piece <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
              </a>
              <a href="/contact">Talk to Baithak</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Customisation;
