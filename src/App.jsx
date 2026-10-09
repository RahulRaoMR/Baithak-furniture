import { lazy, Suspense } from 'react';
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import usePageMeta from './hooks/usePageMeta.js';
import { publicRoutes } from './data/routes.js';
import { getProductBySlug } from './data/products.js';
import { getProjectBySlug } from './data/projects.js';

const SofaCollection = lazy(() => import('./pages/SofaCollection.jsx'));
const GalleryRoute = lazy(() => import('./pages/GalleryRoute.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const CollectionsPage = lazy(() => import('./pages/CollectionsPage.jsx'));
const CustomisePage = lazy(() => import('./pages/CustomisePage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage.jsx'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage.jsx'));
const MaterialsPage = lazy(() => import('./pages/MaterialsPage.jsx'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage.jsx'));
const TermsPage = lazy(() => import('./pages/TermsPage.jsx'));

function RouteLoading() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="route-loading" aria-busy="true" tabIndex={-1}>
        <p role="status">Loading...</p>
      </main>
      <Footer />
    </>
  );
}

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  usePageMeta(path);
  const productMatch = path.match(/^\/furniture\/([^/]+)$/);
  const product = productMatch ? getProductBySlug(productMatch[1]) : undefined;
  const projectMatch = path.match(/^\/our-work\/([^/]+)$/);
  const project = projectMatch ? getProjectBySlug(projectMatch[1]) : undefined;
  let page;

  if (product) page = <ProductDetailPage product={product} />;
  else if (project) page = <ProjectDetailPage project={project} key={project.slug} />;
  else {
    switch (path) {
      case '/': page = <Home />; break;
      case '/sofas': page = <SofaCollection />; break;
      case '/contact': page = <ContactPage />; break;
      case '/collections': page = <CollectionsPage />; break;
      case '/customise': page = <CustomisePage />; break;
      case '/about': page = <AboutPage />; break;
      case '/materials': page = <MaterialsPage />; break;
      case '/privacy': page = <PrivacyPage />; break;
      case '/terms': page = <TermsPage />; break;
      default: page = publicRoutes.includes(path) ? <GalleryRoute path={path} /> : <NotFoundPage />;
    }
  }

  return (
    <>
      <Suspense fallback={<RouteLoading />}>{page}</Suspense>
      <WhatsAppButton />
    </>
  );
}

export default App;
