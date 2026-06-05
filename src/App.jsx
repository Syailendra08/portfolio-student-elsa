import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import "./styles/global.css";

const pages = {
  home:     Home,
  about:    About,
  skills:   Skills,
  projects: Projects,
  contact:  Contact,
};

export default function App() {
  const [activePage, setActivePage] = useState("home");

  function navigate(pageId) {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const PageComponent = pages[activePage] || Home;

  return (
    <>
      <Navbar activePage={activePage} onNavigate={navigate} />
      <PageComponent onNavigate={navigate} />
    </>
  );
}
