import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '../api/axios';

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', content: '', excerpt: '',
    metaTitle: '', metaDescription: '', canonicalUrl: '',
    ogTitle: '', ogDescription: '', ogImage: '',
    twitterTitle: '', twitterDescription: '',
    status: 'draft', featureImage: '',
    faq: [], internalLinks: [], externalLinks: [],
    tags: [], categories: []
  });
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [activeTab, setActiveTab] = useState('content');

  useEffect(() => {
    api.get('/categories').then(r => setCategories(r.data));
    api.get('/tags').then(r => setTags(r.data));
    if (id) {
      api.get(`/blogs/${id}`).then(r => {
        const b = r.data;
        setForm({
          ...b,
          tags: b.tags?.map(t => t._id) || [],
          categories: b.categories?.map(c => c._id) || []
        });
      });
    }
  }, [id]);

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const uploadImage = async () => {
    if (!imageFile) return null;
    const fd = new FormData();
    fd.append('image', imageFile);
    const { data } = await api.post('/blogs/upload/image', fd);
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let featureImage = form.featureImage;
      if (imageFile) featureImage = await uploadImage();
      const payload = { ...form, featureImage };
      if (id) await api.put(`/blogs/${id}`, payload);
      else await api.post('/blogs', payload);
      setMsg('Saved successfully!');
      setTimeout(() => navigate('/blogs'), 1000);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error saving');
    }
  };

  const addFaq = () => set('faq', [...form.faq, { question: '', answer: '' }]);
  const updateFaq = (i, field, val) => {
    const updated = [...form.faq];
    updated[i][field] = val;
    set('faq', updated);
  };

  const toggleMulti = (field, val) => {
    const arr = form[field];
    set(field, arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  const tabStyle = (tab) => ({
    padding: '8px 16px', cursor: 'pointer', border: 'none',
    background: activeTab === tab ? '#1a1a2e' : '#eee',
    color: activeTab === tab ? '#fff' : '#333',
    borderRadius: '4px 4px 0 0'
  });

  return (
    <div style={{ padding: '24px' }}>
      <h2>{id ? 'Edit Blog' : 'New Blog'}</h2>
      {msg && <p style={{ color: msg.includes('Error') ? 'red' : 'green' }}>{msg}</p>}

      <div style={{ display: 'flex', gap: '8px', marginBottom: '0' }}>
        {['content', 'seo', 'og', 'faq'].map(tab => (
          <button key={tab} style={tabStyle(tab)} onClick={() => setActiveTab(tab)}>
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '24px', borderRadius: '0 8px 8px 8px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>

        {activeTab === 'content' && (
          <>
            <label style={styles.label}>Title *</label>
            <input style={styles.input} value={form.title} onChange={e => set('title', e.target.value)} required />

            <label style={styles.label}>Excerpt</label>
            <textarea style={styles.textarea} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} rows={2} />

            <label style={styles.label}>Content *</label>
            <ReactQuill value={form.content} onChange={val => set('content', val)} style={{ marginBottom: '16px', height: '300px' }} />

            <div style={{ marginTop: '50px' }}>
              <label style={styles.label}>Feature Image</label>
              <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
              {form.featureImage && <img src={`http://localhost:5000${form.featureImage}`} alt="feature" style={{ height: '80px', marginTop: '8px', borderRadius: '4px' }} />}
            </div>

            <label style={styles.label}>Categories</label>
            <div style={styles.checkGroup}>
              {categories.map(c => (
                <label key={c._id} style={styles.checkLabel}>
                  <input type="checkbox" checked={form.categories.includes(c._id)} onChange={() => toggleMulti('categories', c._id)} /> {c.name}
                </label>
              ))}
            </div>

            <label style={styles.label}>Tags</label>
            <div style={styles.checkGroup}>
              {tags.map(t => (
                <label key={t._id} style={styles.checkLabel}>
                  <input type="checkbox" checked={form.tags.includes(t._id)} onChange={() => toggleMulti('tags', t._id)} /> {t.name}
                </label>
              ))}
            </div>

            <label style={styles.label}>Status</label>
            <select style={styles.input} value={form.status} onChange={e => set('status', e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </>
        )}

        {activeTab === 'seo' && (
          <>
            <label style={styles.label}>Meta Title (60 chars)</label>
            <input style={styles.input} value={form.metaTitle} onChange={e => set('metaTitle', e.target.value)} maxLength={60} />
            <small>{form.metaTitle.length}/60</small>

            <label style={styles.label}>Meta Description (160 chars)</label>
            <textarea style={styles.textarea} value={form.metaDescription} onChange={e => set('metaDescription', e.target.value)} maxLength={160} rows={3} />
            <small>{form.metaDescription.length}/160</small>

            <label style={styles.label}>Canonical URL</label>
            <input style={styles.input} value={form.canonicalUrl} onChange={e => set('canonicalUrl', e.target.value)} />
          </>
        )}

        {activeTab === 'og' && (
          <>
            <label style={styles.label}>OG Title</label>
            <input style={styles.input} value={form.ogTitle} onChange={e => set('ogTitle', e.target.value)} />
            <label style={styles.label}>OG Description</label>
            <textarea style={styles.textarea} value={form.ogDescription} onChange={e => set('ogDescription', e.target.value)} rows={2} />
            <label style={styles.label}>OG Image URL</label>
            <input style={styles.input} value={form.ogImage} onChange={e => set('ogImage', e.target.value)} />
            <label style={styles.label}>Twitter Title</label>
            <input style={styles.input} value={form.twitterTitle} onChange={e => set('twitterTitle', e.target.value)} />
            <label style={styles.label}>Twitter Description</label>
            <textarea style={styles.textarea} value={form.twitterDescription} onChange={e => set('twitterDescription', e.target.value)} rows={2} />
          </>
        )}

        {activeTab === 'faq' && (
          <>
            <h3>FAQ Section</h3>
            {form.faq.map((f, i) => (
              <div key={i} style={{ border: '1px solid #eee', padding: '12px', borderRadius: '4px', marginBottom: '12px' }}>
                <input style={styles.input} placeholder="Question" value={f.question} onChange={e => updateFaq(i, 'question', e.target.value)} />
                <textarea style={styles.textarea} placeholder="Answer" value={f.answer} onChange={e => updateFaq(i, 'answer', e.target.value)} rows={2} />
              </div>
            ))}
            <button type="button" onClick={addFaq} style={styles.addBtn}>+ Add FAQ</button>
          </>
        )}

        <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
          <button type="submit" style={styles.submitBtn}>Save Blog</button>
          <button type="button" onClick={() => navigate('/blogs')} style={styles.cancelBtn}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  label: { display: 'block', marginBottom: '4px', fontWeight: '600', fontSize: '14px', marginTop: '16px' },
  input: { width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px' },
  textarea: { width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px' },
  checkGroup: { display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' },
  checkLabel: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px' },
  submitBtn: { background: '#1a1a2e', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '4px', cursor: 'pointer', fontSize: '15px' },
  cancelBtn: { background: '#eee', color: '#333', border: 'none', padding: '10px 24px', borderRadius: '4px', cursor: 'pointer', fontSize: '15px' },
  addBtn: { background: '#3498db', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }
};

export default BlogEditor;
