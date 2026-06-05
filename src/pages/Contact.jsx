import { useState } from "react";
import { profile } from "../data/cookingData";
import "./Contact.css";

const contactItems = [
  { icon: "📧", label: "Email",     key: "email" },
  { icon: "📸", label: "Instagram", key: "instagram" },
  { icon: "📍", label: "Location",  key: "location" },
  { icon: "💼", label: "LinkedIn",  key: "linkedin" },
];

export default function Contact() {
  const [toast, setToast] = useState(false);

  function handleSend() {
    setToast(true);
    setTimeout(() => setToast(false), 3200);
  }

  return (
    <div className="page-wrapper">
      <div className="container contact-section">
        <div className="contact-grid">
          {/* Left info */}
          <div className="contact-info">
            <div className="section-label">Contact Me</div>
            <h2>
              Let's cook up<br />something <em>great</em><br />together
            </h2>
            <p>
              Whether it's a collaboration, a question about a recipe, or just a food chat —
              my inbox is always open. I'd love to hear from you!
            </p>
            <div className="contact-items">
              {contactItems.map((ci) => (
                <div className="contact-item" key={ci.label}>
                  <div className="contact-item-icon">{ci.icon}</div>
                  <div className="contact-item-text">
                    <span className="contact-item-label">{ci.label}</span>
                    <span className="contact-item-val">{profile[ci.key]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="contact-form">
            <h3>Send me a message 🌸</h3>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="Sari" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Dewi" />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="sari@email.com" />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <select>
                <option>Collaboration</option>
                <option>Recipe Question</option>
                <option>Just Saying Hi 👋</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Tell me what's cooking... 🍳" />
            </div>
            <button className="send-btn" onClick={handleSend}>
              Send Message ✦
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className={`toast ${toast ? "show" : ""}`}>
        Message sent! I'll get back to you soon 🌸
      </div>

      <footer className="site-footer">
        Developed with <span>♥</span> by <a href="https://portofolio-react-syailendra.vercel.app/" target="_blank" rel="noopener noreferrer">
          Syailendra
        </a> · All rights reserved © 2025
      </footer>
    </div>
  );
}
