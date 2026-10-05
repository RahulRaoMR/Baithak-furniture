import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';

const furnitureGroups = [
  {
    label: 'Seating',
    links: [
      ['Sofas', '/sofas'],
      ['Sectionals', '/sectionals'],
      ['Chairs', '/chairs'],
      ['Recliners', '/recliners'],
      ['Ottomans & Benches', '/ottomans-benches'],
    ],
  },
  {
    label: 'Bedroom',
    links: [
      ['Beds', '/beds'],
      ['Bedside Furniture', '/bedside'],
    ],
  },
  {
    label: 'Dining',
    links: [
      ['Dining Tables', '/dining'],
      ['Dining Chairs', '/dining-chairs'],
    ],
  },
  {
    label: 'Tables',
    links: [
      ['Coffee Tables', '/coffee-tables'],
      ['Side Tables', '/side-tables'],
      ['Console Tables', '/console-tables'],
    ],
  },
  {
    label: 'Bespoke',
    links: [
      ['Custom Furniture', '/custom'],
      ['Custom Woodwork', '/custom-woodwork'],
    ],
  },
];

const collectionLinks = [
  ['Living', '/collections/living'],
  ['Seating', '/collections/seating'],
  ['Bedroom', '/collections/bedroom'],
  ['Dining', '/collections/dining'],
  ['Bespoke', '/collections/bespoke'],
];

const primaryLinks = [
  ['Collections', '/#collections'],
  ['Customise', '/#customisation'],
  ['Our Work', '/our-work'],
  ['About', '/#about'],
  ['Contact', '/contact'],
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFurnitureOpen, setIsFurnitureOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const menuToggleRef = useRef(null);
  const furnitureTriggerRef = useRef(null);
  const currentPath = window.location.pathname;

  useEffect(() => {
    if (!isMenuOpen && !isFurnitureOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setIsMenuOpen(false);
      setIsFurnitureOpen(false);
      if (isMenuOpen) menuToggleRef.current?.focus();
      else furnitureTriggerRef.current?.focus();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, isFurnitureOpen]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setMobileAccordion(null);
  };

  const toggleAccordion = (name) => {
    setMobileAccordion((current) => (current === name ? null : name));
  };

  const isActive = (href) => {
    const path = href.split('#')[0] || '/';
    if (href.includes('#')) return currentPath === path && window.location.hash === `#${href.split('#')[1]}`;
    return currentPath === path;
  };

  return (
    <header className="site-header">
      <nav className="container navbar" aria-label="Main navigation">
        <a className="brand-mark" href="/" aria-label="Baithak home">
          <Logo className="navbar-logo" />
        </a>

        <div className="nav-links" aria-label="Primary links">
          <a className={currentPath === '/' ? 'is-active' : undefined} href="/">
            Home
          </a>
          <div
            className={`nav-mega${isFurnitureOpen ? ' is-open' : ''}`}
            onMouseEnter={() => setIsFurnitureOpen(true)}
            onMouseLeave={() => setIsFurnitureOpen(false)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setIsFurnitureOpen(false);
            }}
          >
            <button
              className="nav-mega__trigger"
              type="button"
              aria-expanded={isFurnitureOpen}
              aria-controls="furniture-mega-menu"
              onClick={() => setIsFurnitureOpen((open) => !open)}
              ref={furnitureTriggerRef}
            >
              Furniture
              <ChevronDown size={15} aria-hidden="true" />
            </button>
            <div className="nav-mega__menu" id="furniture-mega-menu">
              <div className="container nav-mega__layout">
                {furnitureGroups.map((group) => (
                  <div className="nav-mega__group" key={group.label}>
                    <p>{group.label}</p>
                    {group.links.map(([label, href]) => (
                      <a href={href} key={label} onClick={() => setIsFurnitureOpen(false)}>
                        {label}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {primaryLinks.map(([label, href]) => (
            <a className={isActive(href) ? 'is-active' : undefined} key={label} href={href}>
              {label}
            </a>
          ))}
        </div>

        <a className="button button-primary nav-quote" href="/contact#enquiry">
          Get a Quote <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
        </a>

        <button
          className="icon-button mobile-menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          ref={menuToggleRef}
        >
          {isMenuOpen ? <X size={23} strokeWidth={1.8} /> : <Menu size={23} strokeWidth={1.8} />}
        </button>

        <div
          className={`mobile-navigation${isMenuOpen ? ' is-open' : ''}`}
          id="mobile-navigation"
          aria-hidden={!isMenuOpen}
        >
          <a className={currentPath === '/' ? 'is-active' : undefined} href="/" onClick={closeMenu}>
            Home
          </a>
          <div className="mobile-accordion">
            <button
              type="button"
              aria-expanded={mobileAccordion === 'furniture'}
              aria-controls="mobile-furniture-links"
              onClick={() => toggleAccordion('furniture')}
            >
              Furniture <ChevronDown size={17} aria-hidden="true" />
            </button>
            <div
              className={`mobile-accordion__panel${mobileAccordion === 'furniture' ? ' is-open' : ''}`}
              id="mobile-furniture-links"
            >
              {furnitureGroups.flatMap((group) => group.links).map(([label, href]) => (
                <a href={href} key={label} onClick={closeMenu}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="mobile-accordion">
            <button
              type="button"
              aria-expanded={mobileAccordion === 'collections'}
              aria-controls="mobile-collection-links"
              onClick={() => toggleAccordion('collections')}
            >
              Collections <ChevronDown size={17} aria-hidden="true" />
            </button>
            <div
              className={`mobile-accordion__panel${mobileAccordion === 'collections' ? ' is-open' : ''}`}
              id="mobile-collection-links"
            >
              {collectionLinks.map(([label, href]) => (
                <a href={href} key={label} onClick={closeMenu}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {primaryLinks.slice(1).map(([label, href]) => (
            <a className={isActive(href) ? 'is-active' : undefined} key={label} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
          <a className="button button-primary mobile-quote" href="/contact#enquiry" onClick={closeMenu}>
            Get a Quote <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
