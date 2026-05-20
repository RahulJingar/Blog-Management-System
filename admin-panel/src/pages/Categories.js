import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Categories = () => {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const fetch = async () => {
    const { data } = await api.get('/categories');
    setCats(data);
  };

  useEffect(() => { fetch(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await api.post('/categories', { name, description: desc });
    setName(''); setDesc('');
    fetch();
  };

  const del = async (id) => {
    if (!window.confirm('Delete?')) return;
    await api.delete(`/categories/${id}`);
    fetch();
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2>Categories</h2>
      <form onSubmit={create} style={styles.form}>
        <input style={styles.input} placeholder="Category name" value={name} onChange={e => setName(e.target.value)} required />
        <input style={styles.input} placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
        <button style={styles.btn} type="submit">Add</button>
      </form>
      <div style={styles.list}>
        {cats.map(c => (
          <div key={c._id} style={styles.item}>
            <div><strong>{c.name}</strong> <span style={{ color: '#888', fontSize: '13px' }}>/{c.slug}</span></div>
            <button onClick={() => del(c._id)} style={styles.delBtn}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  form: { display: 'flex', gap: '8px', marginBottom: '24px' },
  input: { padding: '8px', border: '1px solid #ddd', borderRadius: '4px', flex: 1 },
  btn: { background: '#1a1a2e', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' },
  list: { background: '#fff', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' },
  item: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #eee' },
  delBtn: { background: '#e74c3c', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }
};

export default Categories;
