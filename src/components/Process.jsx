import { ArrowRight } from 'lucide-react';
import { contactInfo } from '../data/contact.js';

const steps = [
  {
    number: '01',
    title: 'Discuss',
    text: 'We begin with your space, requirements, preferences and the way you intend to use the furniture.',
  },
  {
    number: '02',
    title: 'Design',
    text: 'Proportion, layout, materials and details are developed around the room and your direction.',
  },
  {
    number: '03',
    title: 'Craft',
    text: 'The approved piece moves into making, where construction, upholstery and finishing come together.',
  },
  {
    number: '04',
    title: 'Deliver',
    text: 'The finished furniture is prepared for its place in your home and delivered with care.',
  },
];

function Process() {
  return (
    <section className="process" id="process" aria-labelledby="process-title">
      <div className="container">
        <header className="process__header">
          <div>
            <p className="process__eyebrow">How Baithak works</p>
            <h2 className="process__title" id="process-title">
              From your room
              <br />
              to the finished piece.
            </h2>
          </div>
          <p className="process__intro">
            Every piece starts with understanding the space, the way it will be used and what you
            want it to feel like.
          </p>
        </header>

        <ol className="process__steps">
          {steps.map((step) => (
            <li className="process__step" key={step.number}>
              <span className="process__number" aria-hidden="true">
                {step.number}
              </span>
              <span className="process__marker" aria-hidden="true" />
              <h3 className="process__step-title">{step.title}</h3>
              <p className="process__step-copy">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="process__cta">
          <p>Ready to begin?</p>
          <a
            href={contactInfo.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Start a Conversation <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Process;
