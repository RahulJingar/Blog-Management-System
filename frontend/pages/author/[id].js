import api from '../../lib/api';
import BlogCard from '../../components/BlogCard';
import SEOHead from '../../components/SEOHead';

export default function AuthorPage({ author, blogs }) {
  if (!author) return <div>Author not found</div>;
  return (
    <>
      <SEOHead title={`${author.name} - Author`} description={`Blogs by ${author.name}`} />
      <div style={styles.profile}>
        <div style={styles.avatar}>{author.name[0]}</div>
        <div>
          <h1>{author.name}</h1>
          <p style={{ color: '#888' }}>{author.email}</p>
          <span style={styles.role}>{author.role}</span>
        </div>
      </div>
      <h2 style={{ marginTop: '32px' }}>Posts by {author.name}</h2>
      {blogs.length === 0 && <p>No published blogs yet.</p>}
      {blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const blogsRes = await api.get(`/blogs?status=published&author=${params.id}`);
    const blogs = blogsRes.data.blogs;
    const author = blogs[0]?.author || null;
    if (!author) return { notFound: true };
    return { props: { author, blogs } };
  } catch {
    return { notFound: true };
  }
}

const styles = {
  profile: { display: 'flex', gap: '20px', alignItems: 'center', background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' },
  avatar: { width: '80px', height: '80px', background: '#e94560', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold' },
  role: { background: '#1a1a2e', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', textTransform: 'uppercase' }
};
