import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>📝 Blog Admin</div>
      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/blogs" style={styles.link}>Blogs</Link>
        {['superadmin', 'editor'].includes(user?.role) && (
          <>
            <Link to="/categories" style={styles.link}>Categories</Link>
            <Link to="/tags" style={styles.link}>Tags</Link>
          </>
        )}
        {user?.role === 'superadmin' && (
          <Link to="/users" style={styles.link}>Users</Link>
        )}
        <span style={styles.role}>{user?.role}</span>
        <button onClick={handleLogout} style={styles.btn}>Logout</button>
      </div>
    </nav>
  );
};

const styles = {
  nav: { background: '#1a1a2e', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  brand: { color: '#fff', fontSize: '20px', fontWeight: 'bold' },
  links: { display: 'flex', gap: '16px', alignItems: 'center' },
  link: { color: '#ccc', textDecoration: 'none', fontSize: '14px' },
  role: { background: '#e94560', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', textTransform: 'uppercase' },
  btn: { background: '#e94560', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer' }
};

export default Navbar;
