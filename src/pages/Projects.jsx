import { useState } from "react";
import { cookingProjects } from "../data/cookingData";
import "./Projects.css";

const categories = ["All", ...new Set(cookingProjects.map((p) => p.category))];

function ProjectCard({ item }) {
  return (
    <div className="project-card">
      <div className="project-img">
        {item.image
          ? <img src={item.image} alt={item.title} loading="lazy" />
          : <span style={{ position: "relative", zIndex: 1 }}>{item.emoji}</span>}
        <span className="project-cat-badge">{item.category}</span>
      </div>
      <div className="project-body">
        <div className="project-title">{item.title}</div>
        <div className="project-desc">{item.description}</div>
        <div className="project-tags">
          {item.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>
        <div className="project-date">📅 {item.date}</div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? cookingProjects
    : cookingProjects.filter((p) => p.category === activeFilter);

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
          Showing {filtered.length} of {cookingProjects.length} dishes
        </p>
      </div>

     <footer className="site-footer">
        Developed with <span>♥</span> by <a href="https://portofolio-react-syailendra.vercel.app/" target="_blank" rel="noopener noreferrer">
          Syailendra
        </a> · All rights reserved © 2025
      </footer>
    </div>
  );
}
