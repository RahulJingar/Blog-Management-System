import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchBlogs = () => {
    setLoading(true);
    API.get("/blogs/admin/all")
      .then((res) => setBlogs(res.data))
      .catch(() => toast.error("Failed to load blogs"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await API.delete(`/blogs/${id}`);
      toast.success("Blog deleted");
      fetchBlogs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <div className="page"><div className="loading-spinner">Loading...</div></div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>📝 Blogs</h1>
        <Link to="/dashboard/blogs/new" className="btn-primary">+ New Blog</Link>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 && (
              <tr><td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>No blogs yet. Create your first blog!</td></tr>
            )}
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td className="blog-title-cell">{blog.title}</td>
                <td>{blog.author?.name}</td>
                <td>{blog.categories?.join(", ") || "—"}</td>
                <td><span className={`badge ${blog.status}`}>{blog.status}</span></td>
                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td className="actions">
                  <Link to={`/dashboard/blogs/edit/${blog._id}`} className="btn-sm">Edit</Link>
                  {(user.role === "superadmin" || user.role === "editor" ||
                    blog.author?._id === user._id) && (
                    <button onClick={() => handleDelete(blog._id)} className="btn-sm danger">Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;
