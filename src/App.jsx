import Home from './pages/Home.jsx';
import SofaCollection from './pages/SofaCollection.jsx';
import PortfolioCollection from './pages/PortfolioCollection.jsx';
import ContactPage from './pages/ContactPage.jsx';
import CollectionsPage from './pages/CollectionsPage.jsx';
import CustomisePage from './pages/CustomisePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
import PolicyPage from './pages/PolicyPage.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import { furnitureCategories } from './data/furniture.js';
import { collectionPages } from './data/collections.js';
import { getProductBySlug } from './data/products.js';
import { getProjectBySlug } from './data/projects.js';

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const category = furnitureCategories[path] || collectionPages[path];
  const productMatch = path.match(/^\/furniture\/([^/]+)$/);
  const product = productMatch ? getProductBySlug(productMatch[1]) : undefined;
  const projectMatch = path.match(/^\/our-work\/([^/]+)$/);
  const project = projectMatch ? getProjectBySlug(projectMatch[1]) : undefined;
  let page;

  if (product) page = <ProductDetailPage product={product} />;
  else if (project) page = <ProjectDetailPage project={project} key={project.slug} />;
  else if (category) page = <PortfolioCollection variant={category.slug} category={category} />;
  else {
    switch (path) {
      case '/': page = <Home />; break;
      case '/sofas': page = <SofaCollection />; break;
      case '/custom-woodwork': page = <PortfolioCollection variant="woodwork" />; break;
      case '/our-work': page = <PortfolioCollection variant="work" />; break;
      case '/contact': page = <ContactPage />; break;
      case '/collections': page = <CollectionsPage />; break;
      case '/customise': page = <CustomisePage />; break;
      case '/about': page = <AboutPage />; break;
      case '/privacy': page = <PolicyPage type="privacy" />; break;
      case '/terms': page = <PolicyPage type="terms" />; break;
      default: page = <NotFoundPage />;
    }
  }

  return (
    <>
      {page}
      <WhatsAppButton />
    </>
  );
}

export default App;
