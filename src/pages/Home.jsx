import { cookingProjects, profile } from "../data/cookingData";
import "./Home.css";

function MiniCard({ item, onNavigate }) {
  return (
    <div className="mini-card" onClick={() => onNavigate("projects")}>
      <div className="mini-card-img">
        {item.image
          ? <img src={item.image} alt={item.title} loading="lazy" />
          : item.emoji}
      </div>
      <div className="mini-card-body">
        <div className="mini-card-cat">{item.category}</div>
        <div className="mini-card-title">{item.title}</div>
        <div className="mini-card-desc">{item.description.slice(0, 100)}…</div>
      </div>
    </div>
  );
}

export default function Home({ onNavigate }) {
  const featured = cookingProjects.slice(0, 3);

  return (
    <div className="page-wrapper">
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      {/* Hero */}
      <div className="hero container">
        <div className="hero-text">
          <span className="hero-eyebrow">✦ Culinary Arts Portfolio</span>
          <h1 className="hero-title">
            Cooking is<br />my <em>love</em><br />language
          </h1>
          <p className="hero-sub">
            Hi, I'm Elsa Prima Ayunda Sayang — a culinary student turning passion into plates.
            From buttery croissants to bold wok-fired dishes, every recipe is a new story.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => onNavigate("projects")}>
              ✦ See My Cooking
            </button>
            <button className="btn-outline" onClick={() => onNavigate("contact")}>
              Let's Connect →
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-deco" />

          {/* Foto utama */}
          <div className="photo-frame">
            {profile.avatar
      ? <img src={profile.avatar} alt={profile.name} />
      : <span>👩‍🍳</span>}
          </div>

          {/* Floating badges */}
          <div className="stat-badge badge-dishes">
            <span className="badge-num">{cookingProjects.length}+</span>
            <span className="badge-lbl">Dishes Made</span>
          </div>

          <div className="stat-badge badge-cats">
            <span className="badge-num">4</span>
            <span className="badge-lbl">Categories</span>
          </div>

          <div className="stat-badge badge-certs">
            <span className="badge-num">5</span>
            <span className="badge-lbl">Certificates</span>
          </div>
        </div>
      </div>

      <div className="scroll-hint">↓ scroll to explore ↓</div>

      {/* Featured strip */}
      <div className="featured-section">
        <div className="container">
          <div className="section-label">Featured Dishes</div>
          <h2 className="section-title">Fresh from the kitchen</h2>
          <p className="section-sub">A taste of my latest creations across every station.</p>
          <div className="featured-grid">
            {featured.map(item => (
              <MiniCard key={item.id} item={item} onNavigate={onNavigate} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button className="btn-primary" onClick={() => onNavigate("projects")}>
              View All Cooking →
            </button>
          </div>
        </div>
      </div>

      <footer className="site-footer">
        Developed with <span>♥</span> by <a href="https://portofolio-react-syailendra.vercel.app/" target="_blank" rel="noopener noreferrer">
          Syailendra
        </a> · All rights reserved © 2025
      </footer>
    </div>
  );
}
