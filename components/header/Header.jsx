import React, { useState, useEffect, useCallback } from 'react';
import './Header.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Header = () => {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (window.scrollY >= 80) header.classList.add('scroll-header');
      else header.classList.remove('scroll-header');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('#home');

  const handleNavClick = useCallback((section) => {
    setActiveNav(section);
    setMenuOpen(false); // Close menu on navigation (useful for mobile)
  }, []);

  return (
    <header className='header'>
      <nav className='nav container'>
        <a href='index.html' className='nav__logo'>
          &lt;Saurav Kumar Singh/&gt;
        </a>

        <div className={isMenuOpen ? 'nav__menu show-menu' : 'nav__menu'}>
          <ul className='nav__list grid'>
            {[
              { id: '#home', icon: 'uil-estate', label: 'Home' },
              { id: '#projects', icon: 'uil-scenery', label: 'Projects' },
              { id: '#skills', icon: 'uil-file-alt', label: 'Skills' },
              { id: '#about', icon: 'uil-user', label: 'About' },
              { id: '#contact', icon: 'uil-message', label: 'Contact Me' },
            ].map(({ id, icon, label }) => (
              <li className='nav__item' key={id}>
                <a
                  href={id}
                  onClick={() => handleNavClick(id)}
                  className={`nav__link ${activeNav === id ? 'active-link' : ''}`}
                >
                  <i className={`uil ${icon} nav__icon`}></i> {label}
                </a>
              </li>
            ))}

            <li className='nav__item theme-toggle-desktop'>
              <ThemeToggle />
            </li>
          </ul>

          <i className='uil uil-times nav__close' onClick={() => setMenuOpen(false)}></i>
        </div>

        {!isMenuOpen && (
          <div className='theme-toggle-mobile'>
            <ThemeToggle />
          </div>
        )}

        <div className='nav__toggle' onClick={() => setMenuOpen(!isMenuOpen)}>
          <i className='uil uil-apps'></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;
