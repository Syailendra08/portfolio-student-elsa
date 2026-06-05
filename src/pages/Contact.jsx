  import { useState } from "react";
  import { profile } from "../data/cookingData";
  import "./Contact.css";

  const contactItems = [
    { icon: "📧", label: "Email", key: "email" },
    { icon: "📸", label: "Instagram", key: "instagram" },
    { icon: "📍", label: "Location", key: "location" },
    { icon: "💼", label: "LinkedIn", key: "linkedin" },
  ];

  export default function Contact() {
    const [toast, setToast] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      subject: "Collaboration",
      message: "",
    });

    // ✅ FIX: handleChange (INI YANG KURANG TADI)
    const handleChange = (e) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSend = async () => {
  setLoading(true);

  try {
    const form = new FormData();

    form.append("access_key", "");
    form.append("name", `${formData.firstName} ${formData.lastName}`);
    form.append("email", formData.email);
    form.append("subject", formData.subject);
    form.append("message", formData.message);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: form,
    });

    const result = await response.json();

    console.log("RESULT:", result); // 🔥 penting buat debug

    if (result.success) {
      setToast(true);
      setTimeout(() => setToast(false), 3200);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "Collaboration",
        message: "",
      });
    } else {
      console.log("FAILED:", result);
    }
  } catch (error) {
    console.error("Send error:", error);
  }

  setLoading(false);
};

    return (
      <div className="page-wrapper">
        <div className="container contact-section">
          <div className="contact-grid">
            {/* LEFT SIDE */}
            <div className="contact-info">
              <div className="section-label">Contact Me</div>
              <h2>
                Let's cook up<br />something <em>great</em><br />together
              </h2>
              <p>
                Whether it's a collaboration, a question about a recipe, or just a food chat —
                my inbox is always open.
              </p>

              <div className="contact-items">
                {contactItems.map((ci) => (
                  <div className="contact-item" key={ci.label}>
                    <div className="contact-item-icon">{ci.icon}</div>
                    <div className="contact-item-text">
                      <span className="contact-item-label">{ci.label}</span>
                      <span className="contact-item-val">
                        {profile[ci.key]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="contact-form">
              <h3>Send me a message 🌸</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Sari"
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Dewi"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="sari@email.com"
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="Collaboration">Collaboration</option>
                  <option value="Internship">Internship</option>
                  <option value="Hiring For Work">Hiring For Work</option>
                  <option value="Recipe Question">Recipe Question</option>
                  <option value="Just Saying Hi 👋">Just Saying Hi 👋</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me what's cooking... 🍳"
                />
              </div>

              <button
                className="send-btn"
                onClick={handleSend}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message ✦"}
              </button>
            </div>
          </div>
        </div>

        {toast && (
          <div className="toast">
            Message sent! I'll get back to you soon 🌸
          </div>
        )}

        <footer className="site-footer">
          Developed with <span>♥</span> by{" "}
          <a
            href="https://portofolio-react-syailendra.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Syailendra
          </a>
          · All rights reserved © 2025
        </footer>
      </div>
    );
  }