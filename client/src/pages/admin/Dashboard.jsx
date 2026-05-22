import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0 });

  useEffect(() => {
    if (user?.role !== "viewer") {
      API.get("/blogs/admin/all")
        .then((res) => {
          const blogs = res.data;
          setStats({
            total: blogs.length,
            published: blogs.filter((b) => b.status === "published").length,
            draft: blogs.filter((b) => b.status === "draft").length,
          });
        })
        .catch(() => {});
    }
  }, [user]);

  return (
    <div className="page">
      <h1>Welcome back, {user?.name} 👋</h1>
      <p className="subtitle">Role: <span className={`role-badge ${user?.role}`}>{user?.role}</span></p>

      {user?.role === "viewer" ? (
        <div className="info-box">
          <p>🔒 You have read-only access. Contact a Super Admin to upgrade your role.</p>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <h3>{stats.total}</h3>
              <p>Total Blogs</p>
            </div>
            <div className="stat-card green">
              <div className="stat-icon">✅</div>
              <h3>{stats.published}</h3>
              <p>Published</p>
            </div>
            <div className="stat-card yellow">
              <div className="stat-icon">📋</div>
              <h3>{stats.draft}</h3>
              <p>Drafts</p>
            </div>
          </div>
          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-grid">
              <Link to="/dashboard/blogs/new" className="action-card">
                <span>➕</span><p>New Blog</p>
              </Link>
              <Link to="/dashboard/blogs" className="action-card">
                <span>📋</span><p>Manage Blogs</p>
              </Link>
              {user?.role === "superadmin" && (
                <Link to="/dashboard/users" className="action-card">
                  <span>👥</span><p>Manage Users</p>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
