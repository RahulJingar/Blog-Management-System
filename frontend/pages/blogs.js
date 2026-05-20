import api from '../lib/api';
import BlogCard from '../components/BlogCard';
import SEOHead from '../components/SEOHead';

export default function Blogs({ blogs, pages, currentPage }) {
  return (
    <>
      <SEOHead title="All Blogs - BlogPlatform" description="Browse all blog posts on BlogPlatform." />
      <h1>All Blogs</h1>
      <div style={{ marginTop: '24px' }}>
        {blogs.length === 0 && <p>No blogs published yet.</p>}
        {blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const page = query.page || 1;
    const { data } = await api.get(`/blogs?status=published&page=${page}&limit=10`);
    return { props: { blogs: data.blogs, pages: data.pages, currentPage: Number(page) } };
  } catch {
    return { props: { blogs: [], pages: 1, currentPage: 1 } };
  }
}
