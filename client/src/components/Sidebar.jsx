import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/login"); };

  const links = [
    { to: "/dashboard", label: "🏠 Dashboard", roles: ["superadmin", "editor", "author", "viewer"] },
    { to: "/dashboard/blogs", label: "📝 All Blogs", roles: ["superadmin", "editor", "author"] },
    { to: "/dashboard/blogs/new", label: "➕ New Blog", roles: ["superadmin", "editor", "author"] },
    { to: "/dashboard/users", label: "👥 Users", roles: ["superadmin"] },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>BlogCMS</h2>
        <span className={`role-badge ${user?.role}`}>{user?.role}</span>
      </div>
      <nav>
        {links
          .filter((l) => l.roles.includes(user?.role))
          .map((l) => (
            <Link key={l.to} to={l.to} className={pathname === l.to ? "nav-link active" : "nav-link"}>
              {l.label}
            </Link>
          ))}
      </nav>
      <div className="sidebar-footer">
        <p className="user-name">{user?.name}</p>
        <p className="user-email">{user?.email}</p>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </aside>
  );
};

export default Sidebar;
