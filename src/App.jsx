import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import "./styles/global.css";

const pages = {
  home:     Home,
  about:    About,
  skills:   Skills,
  projects: Projects,
  contact:  Contact,
  admin:    Admin,
};

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [activePage, setActivePage] = useState(() => {
    if (window.location.hash === "#admin" || window.location.search.includes("admin")) {
      return "admin";
    }
    return "home";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#admin") {
        setActivePage("admin");
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  function navigate(pageId) {
    setActivePage(pageId);
    window.location.hash = pageId === "admin" ? "admin" : "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const PageComponent = pages[activePage] || Home;

  return (
    <>
      <Navbar 
        activePage={activePage} 
        onNavigate={navigate} 
        theme={theme} 
        onToggleTheme={toggleTheme} 
      />
      <PageComponent onNavigate={navigate} />
    </>
  );
}


