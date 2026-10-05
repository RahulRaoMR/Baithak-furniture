import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import CategoryCards from '../components/CategoryCards.jsx';
import BrandStory from '../components/BrandStory.jsx';
import FeaturedFurniture from '../components/FeaturedFurniture.jsx';
import Customisation from '../components/Customisation.jsx';
import Collections from '../components/Collections.jsx';
import FeaturedProjects from '../components/FeaturedProjects.jsx';
import Craftsmanship from '../components/Craftsmanship.jsx';
import Process from '../components/Process.jsx';
import CTASection from '../components/CTASection.jsx';
import Footer from '../components/Footer.jsx';

function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex="-1">
        <Hero />
        <CategoryCards />
        <BrandStory />
        <FeaturedFurniture />
        <Customisation />
        <Collections />
        <FeaturedProjects />
        <Craftsmanship />
        <Process />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

export default Home;
