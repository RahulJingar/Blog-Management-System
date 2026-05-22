import Link from "next/link";

const Navbar = () => (
  <nav style={{ background: "#0f172a", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
    <Link href="/" style={{ color: "#60a5fa", fontSize: "1.4rem", fontWeight: 700, textDecoration: "none" }}>
      📝 BlogPlatform
    </Link>
    <div style={{ display: "flex", gap: "28px" }}>
      {[["Home", "/"], ["About", "/about"], ["Contact", "/contact"]].map(([label, href]) => (
        <Link key={href} href={href} style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.95rem" }}>
          {label}
        </Link>
      ))}
    </div>
  </nav>
);

export default Navbar;
