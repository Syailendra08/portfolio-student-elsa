import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import "./Navbar.css";

const navItems = [
  { id: "home",     label: "Home" },
  { id: "about",    label: "About Me" },
  { id: "skills",   label: "Skills & Cert" },
  { id: "projects", label: "My Cooking" },
  { id: "contact",  label: "Contact Me" },
];

export default function Navbar({ activePage, onNavigate, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-logo" onClick={() => onNavigate("home")}>
        Elsa<span>.</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button 
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <FiSun size={17} /> : <FiMoon size={17} />}
        </button>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href="#"
              className={activePage === item.id ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
                setMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}