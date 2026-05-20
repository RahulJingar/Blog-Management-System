import Link from 'next/link';

const Navbar = () => (
  <nav style={styles.nav}>
    <Link href="/" style={styles.brand}>📝 BlogPlatform</Link>
    <div style={styles.links}>
      <Link href="/" style={styles.link}>Home</Link>
      <Link href="/blogs" style={styles.link}>Blogs</Link>
      <Link href="/about" style={styles.link}>About</Link>
      <Link href="/contact" style={styles.link}>Contact</Link>
    </div>
  </nav>
);

const styles = {
  nav: { background: '#1a1a2e', padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  brand: { color: '#fff', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' },
  links: { display: 'flex', gap: '20px' },
  link: { color: '#ccc', textDecoration: 'none', fontSize: '15px' }
};

export default Navbar;
