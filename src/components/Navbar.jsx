import { useEffect, useRef, useState } from 'react';
import { ChevronDown, MapPin, Menu, X } from 'lucide-react';
import { contactInfo } from '../data/contact.js';
import { collections } from '../data/collections.js';
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

const collectionLinks = collections.map(({ label, href }) => [label, href]);

const primaryLinks = [
  ['Collections', '/collections'],
  ['Customise', '/customise'],
  ['Our Work', '/our-work'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFurnitureOpen, setIsFurnitureOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const menuToggleRef = useRef(null);
  const furnitureTriggerRef = useRef(null);
  const furnitureMenuRef = useRef(null);
  const furnitureCloseTimerRef = useRef(null);
  const furniturePinnedRef = useRef(false);
  const currentPath = window.location.pathname;

  const closeFurnitureMenu = () => {
    clearTimeout(furnitureCloseTimerRef.current);
    furniturePinnedRef.current = false;
    setIsFurnitureOpen(false);
  };

  useEffect(() => () => clearTimeout(furnitureCloseTimerRef.current), []);

  useEffect(() => {
    if (!isFurnitureOpen) return undefined;
    const handlePointerDown = (event) => {
      if (!furnitureMenuRef.current?.contains(event.target)) closeFurnitureMenu();
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isFurnitureOpen]);

  useEffect(() => {
    if (!isMenuOpen && !isFurnitureOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setIsMenuOpen(false);
      setMobileAccordion(null);
      closeFurnitureMenu();
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
    if (href === '/collections') return currentPath === href || currentPath.startsWith(`${href}/`);
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
            ref={furnitureMenuRef}
            onMouseEnter={() => {
              clearTimeout(furnitureCloseTimerRef.current);
              setIsFurnitureOpen(true);
            }}
            onMouseLeave={() => {
              furnitureCloseTimerRef.current = setTimeout(() => {
                if (!furniturePinnedRef.current) setIsFurnitureOpen(false);
              }, 200);
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) closeFurnitureMenu();
            }}
          >
            <button
              className="nav-mega__trigger"
              type="button"
              aria-expanded={isFurnitureOpen}
              aria-controls="furniture-mega-menu"
              onClick={() => {
                clearTimeout(furnitureCloseTimerRef.current);
                furniturePinnedRef.current = !furniturePinnedRef.current;
                setIsFurnitureOpen(furniturePinnedRef.current);
              }}
              onKeyDown={(event) => {
                if (event.key !== 'ArrowDown') return;
                event.preventDefault();
                clearTimeout(furnitureCloseTimerRef.current);
                furniturePinnedRef.current = true;
                setIsFurnitureOpen(true);
                requestAnimationFrame(() => furnitureMenuRef.current?.querySelector('a')?.focus());
              }}
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
                      <a href={href} key={label} onClick={closeFurnitureMenu}>
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

        <a
          className="button button-primary nav-quote"
          href={contactInfo.address.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Baithak showroom location in Google Maps"
        >
          <MapPin size={18} strokeWidth={1.8} aria-hidden="true" /> Location
        </a>

        <button
          className="icon-button mobile-menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          onClick={() => (isMenuOpen ? closeMenu() : setIsMenuOpen(true))}
          ref={menuToggleRef}
        >
          {isMenuOpen ? <X size={23} strokeWidth={1.8} /> : <Menu size={23} strokeWidth={1.8} />}
        </button>

        <div
          className={`mobile-navigation${isMenuOpen ? ' is-open' : ''}`}
          id="mobile-navigation"
          aria-hidden={!isMenuOpen}
          inert={!isMenuOpen}
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
              aria-hidden={!isMenuOpen || mobileAccordion !== 'furniture'}
              inert={!isMenuOpen || mobileAccordion !== 'furniture'}
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
              aria-hidden={!isMenuOpen || mobileAccordion !== 'collections'}
              inert={!isMenuOpen || mobileAccordion !== 'collections'}
            >
              <a href="/collections" onClick={closeMenu}>All Collections</a>
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
          <a
            className="button button-primary mobile-quote"
            href={contactInfo.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Baithak showroom location in Google Maps"
            onClick={closeMenu}
          >
            <MapPin size={18} strokeWidth={1.8} aria-hidden="true" /> Location
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
