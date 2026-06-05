import { useEffect, useState } from "react";
import "./Navbar.css";

const navItems = [
  { id: "home",     label: "Home" },
  { id: "about",    label: "About Me" },
  { id: "skills",   label: "Skills & Cert" },
  { id: "projects", label: "My Cooking" },
  { id: "contact",  label: "Contact Me" },
];

export default function Navbar({ activePage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // tambah ini

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

      {/* Tambahan burger */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href="#"
              className={activePage === item.id ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
                setMenuOpen(false); // tutup menu setelah klik
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