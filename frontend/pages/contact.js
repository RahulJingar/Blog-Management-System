import SEOHead from '../components/SEOHead';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <SEOHead title="Contact Us - BlogPlatform" description="Get in touch with the BlogPlatform team." />
      <div style={styles.container}>
        <h1>Contact Us</h1>
        {sent ? (
          <p style={{ color: 'green' }}>Thanks! We'll get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <input style={styles.input} placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input style={styles.input} type="email" placeholder="Your Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            <textarea style={styles.textarea} placeholder="Your Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} required />
            <button style={styles.btn} type="submit">Send Message</button>
          </form>
        )}
      </div>
    </>
  );
}

const styles = {
  container: { maxWidth: '600px' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: { padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '15px' },
  textarea: { padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '15px' },
  btn: { background: '#1a1a2e', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontSize: '15px' }
};
