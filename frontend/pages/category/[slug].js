import api from '../../lib/api';
import BlogCard from '../../components/BlogCard';
import SEOHead from '../../components/SEOHead';

export default function CategoryPage({ category, blogs }) {
  if (!category) return <div>Category not found</div>;
  return (
    <>
      <SEOHead title={`${category.name} - BlogPlatform`} description={category.description || `Blogs in ${category.name}`} />
      <h1>Category: {category.name}</h1>
      {category.description && <p style={{ color: '#666' }}>{category.description}</p>}
      <div style={{ marginTop: '24px' }}>
        {blogs.length === 0 && <p>No blogs in this category.</p>}
        {blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const catsRes = await api.get('/categories');
    const category = catsRes.data.find(c => c.slug === params.slug);
    if (!category) return { notFound: true };
    const blogsRes = await api.get(`/blogs?status=published&category=${category._id}`);
    return { props: { category, blogs: blogsRes.data.blogs } };
  } catch {
    return { notFound: true };
  }
}
