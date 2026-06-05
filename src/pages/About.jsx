import { profile } from "../data/cookingData";
import "./About.css";

export default function About() {
  return (
    <div className="page-wrapper">
      <div className="container about-section">
        <div className="section-label">About Me</div>
        <h1 className="section-title">
          The chef behind<br />the <em>apron</em>
        </h1>

        <div className="about-grid">
          {/* Avatar */}
          <div className="about-avatar-wrap">
            <div className="about-avatar">
              {profile.avatar
                ? <img src={profile.avatar} alt={profile.name} />
                : "👩‍🍳"}
            </div>
            <div className="about-badge">
              <div className="about-badge-emoji">🎓</div>
              <div className="about-badge-text">
                <div className="about-badge-title">1st Year Student</div>
                <div className="about-badge-sub">Culinary, SMK Baranangsiang</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="about-content">
            <div className="section-label">My Story</div>
            <h2>A <em>passionate</em> cook with a curious palate</h2>
            <p>{profile.bio}</p>
            <p>{profile.bioExtra}</p>
            <div className="about-info">
              <div className="about-info-item">
                <span className="about-info-label">📍 Location</span>
                <span className="about-info-val">{profile.location}</span>
              </div>
              <div className="about-info-item">
                <span className="about-info-label">📧 Email</span>
                <span className="about-info-val">{profile.email}</span>
              </div>
              <div className="about-info-item">
                <span className="about-info-label">📸 Instagram</span>
                <span className="about-info-val">{profile.instagram}</span>
              </div>
            </div>
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
