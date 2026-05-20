import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [name, setName] = useState('');

  const fetch = async () => {
    const { data } = await api.get('/tags');
    setTags(data);
  };

  useEffect(() => { fetch(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await api.post('/tags', { name });
    setName('');
    fetch();
  };

  const del = async (id) => {
    if (!window.confirm('Delete?')) return;
    await api.delete(`/tags/${id}`);
    fetch();
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2>Tags</h2>
      <form onSubmit={create} style={styles.form}>
        <input style={styles.input} placeholder="Tag name" value={name} onChange={e => setName(e.target.value)} required />
        <button style={styles.btn} type="submit">Add</button>
      </form>
      <div style={styles.tagCloud}>
        {tags.map(t => (
          <div key={t._id} style={styles.tag}>
            #{t.name}
            <button onClick={() => del(t._id)} style={styles.x}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  form: { display: 'flex', gap: '8px', marginBottom: '24px' },
  input: { padding: '8px', border: '1px solid #ddd', borderRadius: '4px', flex: 1, maxWidth: '300px' },
  btn: { background: '#1a1a2e', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' },
  tagCloud: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  tag: { background: '#e8f4fd', color: '#2980b9', padding: '6px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' },
  x: { background: 'none', border: 'none', cursor: 'pointer', color: '#e74c3c', fontWeight: 'bold', fontSize: '16px', lineHeight: 1 }
};

export default Tags;
