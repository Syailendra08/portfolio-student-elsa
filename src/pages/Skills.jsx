import { useEffect, useRef } from "react";
import { skills, certificates } from "../data/cookingData";
import "./Skills.css";

export default function Skills() {
  const barsRef = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      barsRef.current.forEach((el) => {
        if (el) el.style.width = el.dataset.level + "%";
      });
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container skills-section">
        <div className="section-label">Skills & Certificates</div>
        <h1 className="section-title">
          What I bring to<br />the <em>kitchen</em>
        </h1>
        <p className="section-sub">Honed through years of study, practice, and a genuine love for food.</p>

        <div className="section-label" style={{ marginBottom: 24 }}>Technical Skills</div>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div className="skill-item" key={s.name}>
              <div className="skill-top">
                <div className="skill-name">
                  <span className="skill-icon">
  {/* Cek apakah icon adalah sebuah URL */}
  {s.icon.includes('http') ? (
    <img 
      src={s.icon} 
      alt={s.name} 
      style={{ width: '25px', verticalAlign: 'middle', marginRight: '5px' }} 
    />
  ) : (
    s.icon // Jika bukan URL (emoji biasa), tampilkan langsung
  )}
</span>
                  {s.name}
                </div>
                <div className="skill-pct">{s.level}%</div>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-fill"
                  data-level={s.level}
                  ref={(el) => (barsRef.current[i] = el)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="section-label" style={{ marginTop: 60, marginBottom: 24 }}>
          Certificates & Achievements
        </div>
        <div className="certs-grid">
          {certificates.map((c) => (
            <div className="cert-card" key={c.title}>
              <div className="cert-icon">{c.icon}</div>
              <div className="cert-title">{c.title}</div>
              <div className="cert-issuer">{c.issuer}</div>
              <span className="cert-year">{c.year}</span>
            </div>
          ))}
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
