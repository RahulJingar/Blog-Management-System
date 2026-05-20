import api from '../lib/api';
import BlogCard from '../components/BlogCard';
import SEOHead from '../components/SEOHead';
import Link from 'next/link';

export default function Home({ blogs, categories }) {
  return (
    <>
      <SEOHead
        title="BlogPlatform - Latest Blogs"
        description="Read the latest articles on web development, technology, and more."
        canonical={process.env.NEXT_PUBLIC_SITE_URL}
      />

      <div style={styles.hero}>
        <h1>Welcome to BlogPlatform</h1>
        <p>Discover articles on web development, technology, and more.</p>
      </div>

      <div style={styles.layout}>
        <div style={styles.main}>
          <h2 style={styles.sectionTitle}>Latest Posts</h2>
          {blogs.length === 0 && <p>No blogs published yet.</p>}
          {blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
        </div>

        <aside style={styles.sidebar}>
          <div style={styles.widget}>
            <h3>Categories</h3>
            {categories.map(c => (
              <Link key={c._id} href={`/category/${c.slug}`} style={styles.catLink}>{c.name}</Link>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const [blogsRes, catsRes] = await Promise.all([
      api.get('/blogs?status=published&limit=10'),
      api.get('/categories')
    ]);
    return { props: { blogs: blogsRes.data.blogs, categories: catsRes.data } };
  } catch {
    return { props: { blogs: [], categories: [] } };
  }
}

const styles = {
  hero: { background: 'linear-gradient(135deg, #1a1a2e, #e94560)', color: '#fff', padding: '48px 32px', borderRadius: '12px', marginBottom: '32px', textAlign: 'center' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 280px', gap: '32px' },
  main: {},
  sectionTitle: { marginBottom: '16px', color: '#1a1a2e' },
  sidebar: {},
  widget: { background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' },
  catLink: { display: 'block', color: '#2980b9', textDecoration: 'none', padding: '6px 0', borderBottom: '1px solid #eee', fontSize: '14px' }
};
