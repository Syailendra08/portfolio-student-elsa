import { useState, useEffect } from "react";
import { getProjects } from "../lib/supabase";
import { cookingProjects as fallbackProjects } from "../data/cookingData";
import "./Projects.css";

const categories = ["All", "Pastry", "Hot Kitchen", "Cold Kitchen", "Drinks"];

function ProjectCard({ item }) {
  const tagsList = Array.isArray(item.tags) ? item.tags : [];

  return (
    <div className="project-card">
      <div className="project-img">
        {item.image
          ? <img src={item.image} alt={item.title} loading="lazy" />
          : <span style={{ position: "relative", zIndex: 1 }}>{item.emoji || "🍳"}</span>}
        <span className="project-cat-badge">{item.category}</span>
      </div>
      <div className="project-body">
        <div className="project-title">{item.title}</div>
        <div className="project-desc">{item.description}</div>
        <div className="project-tags">
          {tagsList.map((t, idx) => <span className="tag" key={idx}>{t}</span>)}
        </div>
        <div className="project-date">📅 {item.date}</div>
      </div>
    </div>
  );
}

export default function Projects({ onNavigate }) {
  const [projectsList, setProjectsList] = useState(fallbackProjects);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getProjects();
      if (data && data.length > 0) {
        setProjectsList(data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const filtered = activeFilter === "All"
    ? projectsList
    : projectsList.filter((p) => p.category === activeFilter);

  return (
    <div className="page-wrapper">
      <div className="container projects-section">
        <div className="section-label">My Cooking</div>
        <h1 className="section-title">
          All of my<br /><em>creations</em>
        </h1>
        <p className="section-sub">Browse by station or explore everything.</p>

        {/* Filter bar */}
        <div className="filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="projects-grid">
          {filtered.map((item) => (
            <ProjectCard key={item.id} item={item} />
          ))}
        </div>

        <p className="projects-count">
          Showing {filtered.length} of {projectsList.length} dishes
        </p>
      </div>

      <footer className="site-footer">
        Developed with <span>♥</span> by{" "}
        <a href="https://portofolio-react-syailendra.vercel.app/" target="_blank" rel="noopener noreferrer">
          Syailendra
        </a>{" "}
        · All rights reserved © 2025 ·{" "}
        <a 
          href="#admin" 
          onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate("admin"); }} 
          style={{ opacity: 0.5, fontSize: '0.75rem', textDecoration: 'none' }}
          title="Admin Panel"
        >
          🔒 Admin
        </a>
      </footer>
    </div>
  );
}

