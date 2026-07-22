import { useState, useEffect } from 'react';
import { 
  supabase, 
  isSupabaseConfigured, 
  loginAdmin, 
  logoutAdmin, 
  getAdminUser, 
  getProjects, 
  addProject, 
  deleteProject 
} from '../lib/supabase';
import { FiLock, FiLogOut, FiPlus, FiTrash2, FiUploadCloud, FiCheckCircle, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

export default function Admin({ onNavigate }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Form Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [submittingLogin, setSubmittingLogin] = useState(false);

  // Data Projects & Loading
  const [projects, setProjects] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // Form Tambah Masakan
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Pastry');
  const [emoji, setEmoji] = useState('🥐');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [date, setDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [submittingForm, setSubmittingForm] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    setLoadingAuth(true);
    const currentUser = await getAdminUser();
    setUser(currentUser);
    setLoadingAuth(false);
    if (currentUser) {
      loadProjects();
    }
  }

  async function loadProjects() {
    setLoadingData(true);
    const list = await getProjects();
    setProjects(list);
    setLoadingData(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    setSubmittingLogin(true);

    try {
      const data = await loginAdmin(email, password);
      setUser(data.user);
      loadProjects();
    } catch (err) {
      setLoginError(err.message || 'Gagal login. Cek kembali email & password.');
    } finally {
      setSubmittingLogin(false);
    }
  }

  async function handleLogout() {
    await logoutAdmin();
    setUser(null);
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function handleAddProject(e) {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!title.trim()) {
      setFormError('Judul masakan wajib diisi!');
      return;
    }

    setSubmittingForm(true);

    try {
      const payload = {
        title: title.trim(),
        category,
        emoji: emoji.trim() || '🍳',
        description: description.trim(),
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        date: date.trim() || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      };

      await addProject(payload, imageFile);

      setFormSuccess(`Berhasil menambahkan "${title}"!`);
      // Reset form
      setTitle('');
      setDescription('');
      setTags('');
      setDate('');
      setImageFile(null);
      setImagePreview('');

      // Reload list
      loadProjects();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan masakan.');
    } finally {
      setSubmittingForm(false);
    }
  }

  async function handleDelete(id, itemTitle) {
    if (!window.confirm(`Yakin ingin menghapus "${itemTitle}"?`)) return;

    try {
      await deleteProject(id);
      loadProjects();
    } catch (err) {
      alert(`Gagal menghapus: ${err.message}`);
    }
  }

  if (loadingAuth) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <p style={{ color: 'var(--mocha)', fontSize: '1.1rem' }}>Memuat Halaman Admin...</p>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '1000px' }}>
        
        {/* Banner Supabase Config Alert jika env belum diatur */}
        {!isSupabaseConfigured && (
          <div style={{
            background: 'linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%)',
            border: '1px solid #ffe8a1',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '32px',
            color: '#856404'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px' }}>
              <FiAlertCircle size={22} color="#856404" />
              <span>Supabase Belum Dikonfigurasi di .env</span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '12px' }}>
              Halaman ini memerlukan <strong>VITE_SUPABASE_URL</strong> dan <strong>VITE_SUPABASE_ANON_KEY</strong> yang terdaftar di file <code>.env.local</code> (untuk lokal) atau di Dashboard Vercel (Environment Variables).
            </p>
            <details style={{ fontSize: '0.85rem' }}>
              <summary style={{ cursor: 'pointer', fontWeight: '600' }}>Cara Menghubungkan ke Supabase (Klik untuk detail)</summary>
              <ol style={{ paddingLeft: '20px', marginTop: '8px', lineHeight: '1.8' }}>
                <li>Buat project baru gratis di <a href="https://supabase.com" target="_blank" rel="noreferrer">Supabase.com</a>.</li>
                <li>Buat tabel <code>cooking_projects</code> di SQL Editor / Table Editor.</li>
                <li>Buat Storage Bucket bernama <code>dishes</code> (set ke Public).</li>
                <li>Buat akun User baru di menu <code>Authentication -&gt; Users</code>.</li>
                <li>Salin <strong>URL</strong> dan <strong>anon key</strong> dari menu <code>Project Settings -&gt; API</code> ke file <code>.env.local</code> / Vercel.</li>
              </ol>
            </details>
          </div>
        )}

        {/* JIKA BELUM LOGIN */}
        {!user ? (
          <div style={{
            maxWidth: '440px',
            margin: '40px auto',
            background: 'var(--white)',
            padding: '40px',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--rose-100)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'var(--rose-100)', color: 'var(--rose-500)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', marginBottom: '12px'
              }}>
                <FiLock />
              </div>
              <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Admin <em>Login</em></h2>
              <p style={{ color: 'var(--mocha)', fontSize: '0.85rem' }}>Masuk untuk menambah & mengelola foto masakan</p>
            </div>

            {loginError && (
              <div style={{
                background: '#f8d7da', color: '#721c24', padding: '12px 16px',
                borderRadius: '8px', fontSize: '0.85rem', marginBottom: '20px'
              }}>
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '500', color: 'var(--bark)', marginBottom: '6px' }}>
                  Email Admin
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@domain.com"
                  required
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: '10px',
                    border: '1px solid var(--rose-200)', outline: 'none', fontSize: '0.9rem',
                    fontFamily: 'var(--font-body)'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '500', color: 'var(--bark)', marginBottom: '6px' }}>
                  Password
                </label>
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: '10px',
                    border: '1px solid var(--rose-200)', outline: 'none', fontSize: '0.9rem',
                    fontFamily: 'var(--font-body)'
                  }}
                />
              </div>

              <button 
                type="submit" 
                disabled={submittingLogin}
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', marginTop: '10px', padding: '14px' }}
              >
                {submittingLogin ? 'Proses Login...' : 'Masuk Dashboard'}
              </button>
            </form>
          </div>
        ) : (
          /* JIKA SUDAH LOGIN (DASHBOARD ADMIN) */
          <div>
            {/* Header Dashboard */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: '32px', background: 'var(--white)', padding: '20px 28px',
              borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)'
            }}>
              <div>
                <span className="section-label" style={{ marginBottom: '4px' }}>Dashboard Admin</span>
                <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', color: 'var(--bark)' }}>
                  Selamat Datang, <em>{user.email}</em>
                </h2>
              </div>
              <button 
                onClick={handleLogout}
                className="btn-outline" 
                style={{ padding: '8px 20px', fontSize: '0.82rem' }}
              >
                <FiLogOut /> Logout
              </button>
            </div>

            {/* Grid Form & Table */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
              
              {/* Form Input Masakan Baru */}
              <div style={{
                background: 'var(--white)', padding: '32px',
                borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)'
              }}>
                <h3 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
                  <FiPlus style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                  Tambah <em>Masakan Baru</em>
                </h3>

                {formError && (
                  <div style={{ background: '#f8d7da', color: '#721c24', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.85rem' }}>
                    {formError}
                  </div>
                )}
                {formSuccess && (
                  <div style={{ background: '#d4edda', color: '#155724', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiCheckCircle /> {formSuccess}
                  </div>
                )}

                <form onSubmit={handleAddProject} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  {/* Judul */}
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={labelStyle}>Judul Masakan *</label>
                    <input 
                      type="text" 
                      value={title} 
                      onChange={e => setTitle(e.target.value)} 
                      placeholder="Contoh: Burnt Basque Cheesecake" 
                      required 
                      style={inputStyle} 
                    />
                  </div>

                  {/* Kategori */}
                  <div>
                    <label style={labelStyle}>Kategori</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
                      <option value="Pastry">Pastry</option>
                      <option value="Hot Kitchen">Hot Kitchen</option>
                      <option value="Cold Kitchen">Cold Kitchen</option>
                      <option value="Drinks">Drinks</option>
                    </select>
                  </div>

                  {/* Emoji Placeholder */}
                  <div>
                    <label style={labelStyle}>Emoji Icon</label>
                    <input 
                      type="text" 
                      value={emoji} 
                      onChange={e => setEmoji(e.target.value)} 
                      placeholder="🍮" 
                      style={inputStyle} 
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label style={labelStyle}>Bulan & Tahun (Date)</label>
                    <input 
                      type="text" 
                      value={date} 
                      onChange={e => setDate(e.target.value)} 
                      placeholder="March 2025" 
                      style={inputStyle} 
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label style={labelStyle}>Tags (Dipisah koma)</label>
                    <input 
                      type="text" 
                      value={tags} 
                      onChange={e => setTags(e.target.value)} 
                      placeholder="Baking, Dessert, Fusion" 
                      style={inputStyle} 
                    />
                  </div>

                  {/* Deskripsi */}
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={labelStyle}>Deskripsi Cerita Masakan</label>
                    <textarea 
                      rows={3} 
                      value={description} 
                      onChange={e => setDescription(e.target.value)} 
                      placeholder="Jelaskan cita rasa, bahan spesial, atau cerita di balik masakan ini..." 
                      style={{ ...inputStyle, resize: 'vertical' }} 
                    />
                  </div>

                  {/* Upload Foto */}
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={labelStyle}>Upload Foto Masakan</label>
                    <div style={{
                      border: '2px dashed var(--rose-200)', borderRadius: '12px',
                      padding: '20px', textAlign: 'center', background: 'var(--blush)',
                      cursor: 'pointer', position: 'relative'
                    }}>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange}
                        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
                      />
                      <FiUploadCloud size={32} color="var(--rose-400)" />
                      <p style={{ fontSize: '0.85rem', color: 'var(--mocha)', marginTop: '6px' }}>
                        {imageFile ? imageFile.name : 'Klik atau seret foto masakan ke sini (PNG, JPG, WEBP)'}
                      </p>
                    </div>

                    {imagePreview && (
                      <div style={{ marginTop: '12px', textAlign: 'center' }}>
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          style={{ maxHeight: '160px', borderRadius: '10px', border: '2px solid var(--rose-200)' }} 
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div style={{ gridColumn: 'span 2', marginTop: '10px' }}>
                    <button 
                      type="submit" 
                      disabled={submittingForm}
                      className="btn-primary" 
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      {submittingForm ? 'Mengunggah & Menyimpan...' : 'Upload & Simpan Masakan'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Tabel / Lista Masakan */}
              <div style={{
                background: 'var(--white)', padding: '32px',
                borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 className="section-title" style={{ fontSize: '1.5rem', marginBottom: 0 }}>
                    Daftar <em>Masakan ({projects.length})</em>
                  </h3>
                  <button 
                    onClick={loadProjects} 
                    className="btn-outline" 
                    style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                    title="Refresh Data"
                  >
                    <FiRefreshCw className={loadingData ? 'spin' : ''} /> Refresh
                  </button>
                </div>

                {loadingData ? (
                  <p style={{ color: 'var(--mocha)' }}>Memuat data masakan...</p>
                ) : projects.length === 0 ? (
                  <p style={{ color: 'var(--mocha)' }}>Belum ada masakan di database.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {projects.map((item) => (
                      <div 
                        key={item.id} 
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '12px 16px', background: 'var(--cream)', borderRadius: '12px',
                          border: '1px solid var(--rose-100)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div style={{
                            width: '48px', height: '48px', borderRadius: '10px',
                            background: 'var(--rose-100)', overflow: 'hidden', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem'
                          }}>
                            {item.image ? (
                              <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              item.emoji || '🍳'
                            )}
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--bark)' }}>{item.title}</h4>
                            <span style={{ fontSize: '0.75rem', color: 'var(--rose-500)', fontWeight: '500' }}>{item.category}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--mocha)', marginLeft: '10px' }}>• {item.date}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          style={{
                            background: 'transparent', border: 'none', color: '#dc3545',
                            cursor: 'pointer', padding: '8px', borderRadius: '8px',
                            transition: 'background 0.2s'
                          }}
                          title="Hapus Masakan"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block', fontSize: '0.82rem', fontWeight: '500',
  color: 'var(--bark)', marginBottom: '6px'
};

const inputStyle = {
  width: '100%', padding: '12px 16px', borderRadius: '10px',
  border: '1px solid var(--rose-200)', outline: 'none', fontSize: '0.9rem',
  fontFamily: 'var(--font-body)'
};
