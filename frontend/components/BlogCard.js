import Link from 'next/link';

const BlogCard = ({ blog }) => (
  <div style={styles.card}>
    {blog.featureImage && (
      <img src={`http://localhost:5000${blog.featureImage}`} alt={blog.title} style={styles.img} />
    )}
    <div style={styles.body}>
      <div style={styles.meta}>
        {blog.categories?.map(c => (
          <Link key={c._id} href={`/category/${c.slug}`} style={styles.cat}>{c.name}</Link>
        ))}
      </div>
      <h2 style={styles.title}>
        <Link href={`/blog/${blog.slug}`} style={styles.titleLink}>{blog.title}</Link>
      </h2>
      <p style={styles.excerpt}>{blog.excerpt || blog.metaDescription}</p>
      <div style={styles.footer}>
        <span>By <Link href={`/author/${blog.author?._id}`} style={styles.author}>{blog.author?.name}</Link></span>
        <span style={styles.date}>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  </div>
);

const styles = {
  card: { background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '24px' },
  img: { width: '100%', height: '200px', objectFit: 'cover' },
  body: { padding: '20px' },
  meta: { display: 'flex', gap: '8px', marginBottom: '8px' },
  cat: { background: '#e8f4fd', color: '#2980b9', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', textDecoration: 'none' },
  title: { margin: '0 0 8px', fontSize: '20px' },
  titleLink: { color: '#1a1a2e', textDecoration: 'none' },
  excerpt: { color: '#666', fontSize: '14px', lineHeight: 1.6, margin: '0 0 12px' },
  footer: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#888' },
  author: { color: '#e94560', textDecoration: 'none' },
  date: {}
};

export default BlogCard;
