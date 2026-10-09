import { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Customisation from '../components/Customisation.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/customise-page.css';

function CustomisePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Customisation standalone />
      </main>
      <Footer />
    </>
  );
}

export default CustomisePage;
