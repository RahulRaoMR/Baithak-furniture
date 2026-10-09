import ResponsiveImage from '../components/ResponsiveImage.jsx';
import { imageSources } from '../utils/images.js';
import { Armchair, ArrowRight, Layers, MapPin, Ruler } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { contactInfo } from '../data/contact.js';

const roomImage = imageSources['../assets/images/brand-story.png'];
const workshopImage = imageSources['../assets/images/craftsmanship-upholstery.jpg'];
const finishedImage = imageSources['../assets/images/customisation-main.png'];

const principles = [
  {
    Icon: Ruler,
    title: 'The right fit',
    text: 'A beautiful piece should belong in your room. We consider the dimensions, proportions and everyday routines that make your space your own.',
  },
  {
    Icon: Armchair,
    title: 'Comfort, made personal',
    text: 'Your favourite seat should feel as good as it looks. From support to seat depth, we help shape comfort around the way you like to unwind.',
  },
  {
    Icon: Layers,
    title: 'Details that feel like you',
    text: 'The texture you love. The colour that brings the room together. The finishing touch that makes it yours. Small choices give a piece its character.',
  },
];

function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main className="about-page" id="main-content" tabIndex="-1">
        <section className="about-hero" aria-labelledby="about-title">
          <ResponsiveImage loading="eager" sizes="(max-width: 1024px) 1900px, 100vw"
            className="about-hero__image"
            src={roomImage}
            alt="Green upholstered Baithak sofa and chairs in a finished living room"
            fetchPriority="high"
          />
          <div className="container about-hero__content">
            <p className="about-eyebrow">Custom furniture studio, Bengaluru</p>
            <h1 id="about-title">Baithak</h1>
            <p className="about-hero__tagline">Furniture with your story in it.</p>
            <p className="about-hero__intro">
              The right furniture does more than fill a room. It makes you feel at home.
            </p>
            <div className="about-actions">
              <a className="button button-primary" href="/contact#enquiry">
                Create Your Piece <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="button about-button-outline" href="/our-work">
                Explore Our Work <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="about-story" aria-labelledby="about-story-title">
          <div className="container about-story__layout">
            <header>
              <p className="about-eyebrow">Our story</p>
              <h2 id="about-story-title">A home should feel like you.</h2>
            </header>
            <div className="about-story__copy">
              <p>
                Your favourite corner. The seat everyone gravitates towards. The room that feels
                just right. We believe the most beautiful spaces are the ones that reflect the
                people who live in them.
              </p>
              <p>
                At Baithak, we create custom furniture and woodwork around your space and your
                idea. From a sofa that brings everyone together to a bedroom that feels like your
                own retreat, every piece begins with understanding what matters to you.
              </p>
              <p>
                Size, comfort, upholstery and finish come together in one conversation. The result
                is furniture that feels considered, personal and perfectly at home in your life.
              </p>
            </div>
          </div>
        </section>

        <section className="about-values" aria-labelledby="about-values-title">
          <div className="container">
            <header className="about-section-heading">
              <p className="about-eyebrow">The Baithak approach</p>
              <h2 id="about-values-title">Made around what matters to you.</h2>
            </header>
            <div className="about-values__grid">
              {principles.map(({ Icon, title, text }) => (
                <article className="about-value" key={title}>
                  <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-craft" aria-labelledby="about-craft-title">
          <div className="container">
            <header className="about-story__layout about-craft__heading">
              <div>
                <p className="about-eyebrow">From idea to everyday living</p>
                <h2 id="about-craft-title">Thoughtfully designed. Carefully brought to life.</h2>
              </div>
              <p>
                Good furniture is about more than the first impression. It is the comfort you
                return to, the texture you reach for and the details you notice a little more
                each day. We bring those choices into the making, from construction and
                upholstery to the final finish.
              </p>
            </header>
            <div className="about-craft__images">
              <figure>
                <ResponsiveImage
                  src={workshopImage}
                  alt="Blue upholstered headboard and bed frame in the Baithak workshop"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>Upholstery and finishing, in the workshop.</figcaption>
              </figure>
              <figure>
                <ResponsiveImage
                  src={finishedImage}
                  alt="Baithak upholstered sofa and armchairs with wooden detailing in a living room"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>Comfort and character, in the finished room.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="about-invitation" aria-labelledby="about-invitation-title">
          <div className="container about-invitation__layout">
            <div>
              <p className="about-eyebrow">Your space. Your next chapter.</p>
              <h2 id="about-invitation-title">
                Your next favourite place starts with a conversation.
              </h2>
              <p>Bring us your room, a reference or an idea. Let&apos;s make it feel like home.</p>
            </div>
            <div className="about-actions">
              <a className="button button-primary" href="/contact#enquiry">
                Start Your Project <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                className="button about-button-outline"
                href={contactInfo.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin size={18} aria-hidden="true" /> Visit Our Studio
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default AboutPage;
