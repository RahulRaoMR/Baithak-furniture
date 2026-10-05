import Home from './pages/Home.jsx';
import SofaCollection from './pages/SofaCollection.jsx';
import PortfolioCollection from './pages/PortfolioCollection.jsx';
import ContactPage from './pages/ContactPage.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  return (
    <>
      {path === '/sofas' && <SofaCollection />}
      {path === '/custom-woodwork' && <PortfolioCollection variant="woodwork" />}
      {path === '/our-work' && <PortfolioCollection variant="work" />}
      {path === '/contact' && <ContactPage />}
      {!['/sofas', '/custom-woodwork', '/our-work', '/contact'].includes(path) && <Home />}
      <WhatsAppButton />
    </>
  );
}

export default App;
