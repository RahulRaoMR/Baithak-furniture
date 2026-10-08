import { useEffect } from 'react';
import { ArrowRight, Home, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found | Baithak';
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main className="container not-found-page" id="main-content" tabIndex={-1}>
        <p className="not-found-page__code">404</p>
        <h1>We couldn&apos;t find that page.</h1>
        <div className="not-found-page__actions">
          <a className="button button-primary" href="/"><Home size={18} aria-hidden="true" /> Back to Home</a>
          <a className="button button-secondary" href="/furniture">Explore Furniture <ArrowRight size={18} aria-hidden="true" /></a>
          <a href="/contact"><MessageCircle size={18} aria-hidden="true" /> Contact Baithak</a>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default NotFoundPage;
