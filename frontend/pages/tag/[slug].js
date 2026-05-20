import api from '../../lib/api';
import BlogCard from '../../components/BlogCard';
import SEOHead from '../../components/SEOHead';

export default function TagPage({ tag, blogs }) {
  if (!tag) return <div>Tag not found</div>;
  return (
    <>
      <SEOHead title={`#${tag.name} - BlogPlatform`} description={`Blogs tagged with ${tag.name}`} />
      <h1>Tag: #{tag.name}</h1>
      <div style={{ marginTop: '24px' }}>
        {blogs.length === 0 && <p>No blogs with this tag.</p>}
        {blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const tagsRes = await api.get('/tags');
    const tag = tagsRes.data.find(t => t.slug === params.slug);
    if (!tag) return { notFound: true };
    const blogsRes = await api.get(`/blogs?status=published&tag=${tag._id}`);
    return { props: { tag, blogs: blogsRes.data.blogs } };
  } catch {
    return { notFound: true };
  }
}
