import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { data } = await api.get('/users');
    setUsers(data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const updateRole = async (id, role) => {
    await api.put(`/users/${id}`, { role });
    fetchUsers();
  };

  const updateStatus = async (id, status) => {
    await api.put(`/users/${id}`, { status });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete user?')) return;
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2>User Management</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} style={styles.row}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <select value={u.role} onChange={e => updateRole(u._id, e.target.value)} style={styles.select}>
                  <option value="superadmin">Super Admin</option>
                  <option value="editor">Editor</option>
                  <option value="author">Author</option>
                  <option value="viewer">Viewer</option>
                </select>
              </td>
              <td>
                <select value={u.status} onChange={e => updateStatus(u._id, e.target.value)} style={styles.select}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </td>
              <td>
                <button onClick={() => deleteUser(u._id)} style={styles.delBtn}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' },
  thead: { background: '#1a1a2e', color: '#fff' },
  row: { borderBottom: '1px solid #eee' },
  select: { padding: '4px 8px', borderRadius: '4px', border: '1px solid #ddd' },
  delBtn: { background: '#e74c3c', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }
};

export default Users;
