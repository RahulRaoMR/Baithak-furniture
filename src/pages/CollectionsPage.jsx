import Navbar from '../components/Navbar.jsx';
import Collections from '../components/Collections.jsx';
import Footer from '../components/Footer.jsx';

function CollectionsPage() {
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
