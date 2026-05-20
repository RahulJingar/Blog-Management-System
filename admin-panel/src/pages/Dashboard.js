import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [all, pub, draft] = await Promise.all([
          api.get('/blogs'),
          api.get('/blogs?status=published'),
          api.get('/blogs?status=draft')
        ]);
        setStats({ total: all.data.total, published: pub.data.total, draft: draft.data.total });
      } catch {}
    };
    fetchStats();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Welcome, {user?.name} 👋</h2>
      <p style={{ color: '#666' }}>Role: <strong>{user?.role}</strong></p>

      <div style={styles.cards}>
        <div style={styles.card}><h3>{stats.total}</h3><p>Total Blogs</p></div>
        <div style={{ ...styles.card, background: '#27ae60' }}><h3>{stats.published}</h3><p>Published</p></div>
        <div style={{ ...styles.card, background: '#e67e22' }}><h3>{stats.draft}</h3><p>Drafts</p></div>
      </div>

      <div style={styles.actions}>
        {['superadmin', 'editor', 'author'].includes(user?.role) && (
          <Link to="/blogs/new" style={styles.actionBtn}>+ New Blog</Link>
        )}
        <Link to="/blogs" style={{ ...styles.actionBtn, background: '#2c3e50' }}>View All Blogs</Link>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '24px' },
  cards: { display: 'flex', gap: '16px', marginTop: '24px', flexWrap: 'wrap' },
  card: { background: '#1a1a2e', color: '#fff', padding: '24px', borderRadius: '8px', minWidth: '150px', textAlign: 'center' },
  actions: { marginTop: '24px', display: 'flex', gap: '12px' },
  actionBtn: { background: '#e94560', color: '#fff', padding: '10px 20px', borderRadius: '4px', textDecoration: 'none', fontSize: '14px' }
};

export default Dashboard;
