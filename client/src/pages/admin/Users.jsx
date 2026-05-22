import { useEffect, useState } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";

const ROLES = ["superadmin", "editor", "author", "viewer"];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchUsers = () => {
    setLoading(true);
    API.get("/users")
      .then((res) => setUsers(res.data))
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const startEdit = (u) => { setEditId(u._id); setEditForm({ name: u.name, role: u.role, status: u.status }); };

  const saveEdit = async (id) => {
    try {
      await API.put(`/users/${id}`, editForm);
      toast.success("User updated");
      setEditId(null);
      fetchUsers();
    } catch (err) { toast.error(err.response?.data?.message || "Update failed"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await API.delete(`/users/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch (err) { toast.error(err.response?.data?.message || "Delete failed"); }
  };

  if (loading) return <div className="page"><div className="loading-spinner">Loading...</div></div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>👥 User Management</h1>
        <span style={{ color: "#64748b" }}>{users.length} users total</span>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>
                  {editId === u._id
                    ? <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                    : u.name}
                </td>
                <td>{u.email}</td>
                <td>
                  {editId === u._id
                    ? <select value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}>
                        {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    : <span className={`badge ${u.role}`}>{u.role}</span>}
                </td>
                <td>
                  {editId === u._id
                    ? <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                      </select>
                    : <span className={`badge ${u.status}`}>{u.status}</span>}
                </td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="actions">
                  {editId === u._id
                    ? <>
                        <button onClick={() => saveEdit(u._id)} className="btn-sm">Save</button>
                        <button onClick={() => setEditId(null)} className="btn-sm">Cancel</button>
                      </>
                    : <>
                        <button onClick={() => startEdit(u)} className="btn-sm">Edit</button>
                        <button onClick={() => handleDelete(u._id)} className="btn-sm danger">Delete</button>
                      </>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
