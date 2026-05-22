import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import API from "../../api/axios";
import toast from "react-hot-toast";

const empty = {
  title: "", content: "", excerpt: "",
  metaTitle: "", metaDescription: "", canonicalUrl: "",
  featureImage: "", ogTitle: "", ogDescription: "", ogImage: "",
  twitterTitle: "", twitterDescription: "", twitterImage: "",
  tags: "", categories: "", status: "draft",
  faqs: [{ question: "", answer: "" }],
};

const BlogEditor = () => {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState("content");
  const [preview, setPreview] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setFetching(true);
    API.get(`/blogs/admin/${id}`)
      .then((res) => {
        const b = res.data;
        setForm({ ...b, tags: b.tags?.join(", ") || "", categories: b.categories?.join(", ") || "" });
      })
      .catch(() => toast.error("Failed to load blog"))
      .finally(() => setFetching(false));
  }, [id]);

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("image", file);
    setUploading(true);
    try {
      const res = await API.post("/upload", data);
      setForm((f) => ({ ...f, featureImage: `http://localhost:5000${res.data.url}` }));
      toast.success("Image uploaded!");
    } catch { toast.error("Upload failed"); }
    finally { setUploading(false); }
  };

  const setFaq = (i, field, val) => {
    const faqs = [...form.faqs];
    faqs[i][field] = val;
    setForm({ ...form, faqs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        categories: form.categories.split(",").map((c) => c.trim()).filter(Boolean),
      };
      if (id) {
        await API.put(`/blogs/${id}`, payload);
        toast.success("Blog updated!");
      } else {
        await API.post("/blogs", payload);
        toast.success("Blog created!");
      }
      navigate("/dashboard/blogs");
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally { setLoading(false); }
  };

  if (fetching) return <div className="page"><div className="loading-spinner">Loading...</div></div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>{id ? "✏️ Edit Blog" : "➕ New Blog"}</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="button" onClick={() => setPreview(!preview)} className="btn-secondary">
            {preview ? "✏️ Edit" : "👁️ Preview"}
          </button>
        </div>
      </div>

      {preview ? (
        <div className="preview-box">
          <h1>{form.title}</h1>
          <div data-color-mode="light">
            <MDEditor.Markdown source={form.content} />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Title + Status row */}
          <div className="form-row">
            <div className="form-group flex-1">
              <label>Blog Title *</label>
              <input name="title" value={form.title} onChange={set} required placeholder="Enter blog title" />
            </div>
            <div className="form-group" style={{ minWidth: "140px" }}>
              <label>Status</label>
              <select name="status" value={form.status} onChange={set}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            {["content", "seo", "og & twitter", "faq"].map((t) => (
              <button key={t} type="button" className={tab === t ? "tab active" : "tab"} onClick={() => setTab(t)}>
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {/* CONTENT TAB */}
          {tab === "content" && (
            <div>
              <div className="form-group">
                <label>Excerpt (short description)</label>
                <textarea name="excerpt" value={form.excerpt} onChange={set} rows={2} placeholder="Brief summary of the blog..." />
              </div>
              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Categories <small>(comma separated)</small></label>
                  <input name="categories" value={form.categories} onChange={set} placeholder="Web Development, React" />
                </div>
                <div className="form-group flex-1">
                  <label>Tags <small>(comma separated)</small></label>
                  <input name="tags" value={form.tags} onChange={set} placeholder="react, nodejs, mern" />
                </div>
              </div>
              <div className="form-group">
                <label>Feature Image</label>
                <input type="file" accept="image/*" onChange={uploadImage} />
                {uploading && <span className="upload-status"> ⏳ Uploading...</span>}
                {form.featureImage && (
                  <div style={{ marginTop: "10px" }}>
                    <img src={form.featureImage} alt="feature" className="preview-img" />
                    <p style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "4px" }}>{form.featureImage}</p>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Content * <small>(Markdown supported)</small></label>
                <div data-color-mode="light">
                  <MDEditor value={form.content} onChange={(v) => setForm((f) => ({ ...f, content: v || "" }))} height={450} />
                </div>
              </div>
            </div>
          )}

          {/* SEO TAB */}
          {tab === "seo" && (
            <div>
              <div className="seo-preview">
                <p className="seo-preview-title">{form.metaTitle || form.title || "Meta Title"}</p>
                <p className="seo-preview-url">https://yourdomain.com/blog/{form.title?.toLowerCase().replace(/\s+/g, "-") || "slug"}</p>
                <p className="seo-preview-desc">{form.metaDescription || "Meta description will appear here..."}</p>
              </div>
              <div className="form-group">
                <label>Meta Title <small>(max 70 chars)</small></label>
                <input name="metaTitle" value={form.metaTitle} onChange={set} maxLength={70} placeholder="SEO optimized title" />
                <small className={form.metaTitle.length > 60 ? "warn" : ""}>{form.metaTitle.length}/70</small>
              </div>
              <div className="form-group">
                <label>Meta Description <small>(max 160 chars)</small></label>
                <textarea name="metaDescription" value={form.metaDescription} onChange={set} maxLength={160} rows={3} placeholder="SEO description (150-160 chars ideal)" />
                <small className={form.metaDescription.length > 150 ? "warn" : ""}>{form.metaDescription.length}/160</small>
              </div>
              <div className="form-group">
                <label>Canonical URL</label>
                <input name="canonicalUrl" value={form.canonicalUrl} onChange={set} placeholder="https://yourdomain.com/blog/slug" />
              </div>
            </div>
          )}

          {/* OG & TWITTER TAB */}
          {tab === "og & twitter" && (
            <div>
              <h3 style={{ marginBottom: "16px", color: "#1e293b" }}>Open Graph Tags</h3>
              <div className="form-group">
                <label>OG Title</label>
                <input name="ogTitle" value={form.ogTitle} onChange={set} placeholder="Open Graph title" />
              </div>
              <div className="form-group">
                <label>OG Description</label>
                <textarea name="ogDescription" value={form.ogDescription} onChange={set} rows={2} placeholder="Open Graph description" />
              </div>
              <div className="form-group">
                <label>OG Image URL</label>
                <input name="ogImage" value={form.ogImage} onChange={set} placeholder="https://..." />
              </div>
              <h3 style={{ margin: "24px 0 16px", color: "#1e293b" }}>Twitter Card</h3>
              <div className="form-group">
                <label>Twitter Title</label>
                <input name="twitterTitle" value={form.twitterTitle} onChange={set} placeholder="Twitter card title" />
              </div>
              <div className="form-group">
                <label>Twitter Description</label>
                <textarea name="twitterDescription" value={form.twitterDescription} onChange={set} rows={2} placeholder="Twitter card description" />
              </div>
              <div className="form-group">
                <label>Twitter Image URL</label>
                <input name="twitterImage" value={form.twitterImage} onChange={set} placeholder="https://..." />
              </div>
            </div>
          )}

          {/* FAQ TAB */}
          {tab === "faq" && (
            <div>
              <p style={{ color: "#64748b", marginBottom: "16px" }}>FAQs are rendered with JSON-LD schema markup for SEO.</p>
              {form.faqs.map((faq, i) => (
                <div key={i} className="faq-item">
                  <div className="faq-header">
                    <span>FAQ #{i + 1}</span>
                    <button type="button" onClick={() => setForm({ ...form, faqs: form.faqs.filter((_, idx) => idx !== i) })} className="btn-sm danger">Remove</button>
                  </div>
                  <div className="form-group">
                    <label>Question</label>
                    <input value={faq.question} onChange={(e) => setFaq(i, "question", e.target.value)} placeholder="Enter question" />
                  </div>
                  <div className="form-group">
                    <label>Answer</label>
                    <textarea value={faq.answer} onChange={(e) => setFaq(i, "answer", e.target.value)} rows={2} placeholder="Enter answer" />
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => setForm({ ...form, faqs: [...form.faqs, { question: "", answer: "" }] })} className="btn-secondary">
                + Add FAQ
              </button>
            </div>
          )}

          <div className="form-actions">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Saving..." : id ? "Update Blog" : "Create Blog"}
            </button>
            <button type="button" onClick={() => navigate("/dashboard/blogs")} className="btn-secondary">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BlogEditor;
