import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const BlogList = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchBlogs = async () => {
    try {
      const params = filter ? `?status=${filter}` : '';
      const { data } = await api.get(`/blogs${params}`);
      setBlogs(data.blogs);
    } catch {}
  };

  useEffect(() => { fetchBlogs(); }, [filter]);

  const deleteBlog = async (id) => {
    if (!window.confirm('Delete this blog?')) return;
    await api.delete(`/blogs/${id}`);
    fetchBlogs();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Blogs</h2>
        {['superadmin', 'editor', 'author'].includes(user?.role) && (
          <Link to="/blogs/new" style={styles.btn}>+ New Blog</Link>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <select value={filter} onChange={e => setFilter(e.target.value)} style={styles.select}>
          <option value="">All</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th>Title</th><th>Author</th><th>Status</th><th>Views</th><th>Date</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog._id} style={styles.row}>
              <td>{blog.title}</td>
              <td>{blog.author?.name}</td>
              <td><span style={{ ...styles.badge, background: blog.status === 'published' ? '#27ae60' : '#e67e22' }}>{blog.status}</span></td>
              <td>{blog.views}</td>
              <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/blogs/edit/${blog._id}`} style={styles.editBtn}>Edit</Link>
                {(user?.role === 'superadmin' || user?.role === 'editor' || blog.author?._id === user?.id) && (
                  <button onClick={() => deleteBlog(blog._id)} style={styles.delBtn}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: { padding: '24px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  btn: { background: '#e94560', color: '#fff', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none' },
  select: { padding: '8px', borderRadius: '4px', border: '1px solid #ddd' },
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' },
  thead: { background: '#1a1a2e', color: '#fff' },
  row: { borderBottom: '1px solid #eee' },
  badge: { color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' },
  editBtn: { background: '#3498db', color: '#fff', padding: '4px 10px', borderRadius: '4px', textDecoration: 'none', marginRight: '6px', fontSize: '13px' },
  delBtn: { background: '#e74c3c', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }
};

export default BlogList;
