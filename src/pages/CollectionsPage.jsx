import { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Collections from '../components/Collections.jsx';
import Footer from '../components/Footer.jsx';

function CollectionsPage() {
  useEffect(() => {
    document.title = 'Furniture Collections | Baithak';
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Collections standalone />
      </main>
      <Footer />
    </>
  );
}

export default CollectionsPage;
