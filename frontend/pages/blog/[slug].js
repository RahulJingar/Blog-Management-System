import api from '../../lib/api';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';

export default function BlogDetail({ blog }) {
  if (!blog) return <div>Blog not found</div>;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // JSON-LD Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.metaDescription,
    image: blog.featureImage ? `http://localhost:5000${blog.featureImage}` : '',
    author: { '@type': 'Person', name: blog.author?.name },
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt
  };

  // FAQ Schema
  const faqSchema = blog.faq?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: blog.faq.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer }
    }))
  } : null;

  return (
    <>
      <SEOHead
        title={blog.metaTitle || blog.title}
        description={blog.metaDescription}
        canonical={blog.canonicalUrl || `${siteUrl}/blog/${blog.slug}`}
        ogTitle={blog.ogTitle || blog.title}
        ogDescription={blog.ogDescription || blog.metaDescription}
        ogImage={blog.ogImage || (blog.featureImage ? `http://localhost:5000${blog.featureImage}` : '')}
        twitterTitle={blog.twitterTitle || blog.title}
        twitterDescription={blog.twitterDescription || blog.metaDescription}
        twitterImage={blog.twitterImage}
        jsonLd={[articleSchema, faqSchema].filter(Boolean)}
      />

      <article style={styles.article}>
        {blog.featureImage && (
          <img src={`http://localhost:5000${blog.featureImage}`} alt={blog.title} style={styles.heroImg} />
        )}

        <div style={styles.meta}>
          {blog.categories?.map(c => (
            <Link key={c._id} href={`/category/${c.slug}`} style={styles.cat}>{c.name}</Link>
          ))}
        </div>

        <h1 style={styles.title}>{blog.title}</h1>

        <div style={styles.authorRow}>
          <span>By <Link href={`/author/${blog.author?._id}`} style={styles.authorLink}>{blog.author?.name}</Link></span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          <span>👁 {blog.views} views</span>
        </div>

        {/* Table of Contents */}
        {blog.tableOfContents?.length > 0 && (
          <div style={styles.toc}>
            <h3>Table of Contents</h3>
            <ol>
              {blog.tableOfContents.map((item, i) => (
                <li key={i} style={{ marginLeft: (item.level - 2) * 16 }}>
                  <a href={`#${item.id}`} style={styles.tocLink}>{item.text}</a>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Blog Content */}
        <div style={styles.content} dangerouslySetInnerHTML={{ __html: blog.content }} />

        {/* FAQ Section */}
        {blog.faq?.length > 0 && (
          <div style={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            {blog.faq.map((f, i) => (
              <div key={i} style={styles.faqItem}>
                <h3>{f.question}</h3>
                <p>{f.answer}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div style={styles.tags}>
            {blog.tags.map(t => (
              <Link key={t._id} href={`/tag/${t.slug}`} style={styles.tag}>#{t.name}</Link>
            ))}
          </div>
        )}
      </article>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { data } = await api.get(`/blogs/slug/${params.slug}`);
    return { props: { blog: data } };
  } catch {
    return { notFound: true };
  }
}

const styles = {
  article: { maxWidth: '800px', margin: '0 auto' },
  heroImg: { width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '24px' },
  meta: { display: 'flex', gap: '8px', marginBottom: '12px' },
  cat: { background: '#e8f4fd', color: '#2980b9', padding: '3px 10px', borderRadius: '4px', fontSize: '13px', textDecoration: 'none' },
  title: { fontSize: '36px', color: '#1a1a2e', marginBottom: '16px', lineHeight: 1.3 },
  authorRow: { display: 'flex', gap: '20px', color: '#888', fontSize: '14px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #eee' },
  authorLink: { color: '#e94560', textDecoration: 'none' },
  toc: { background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '32px', borderLeft: '4px solid #e94560' },
  tocLink: { color: '#2980b9', textDecoration: 'none', fontSize: '14px' },
  content: { lineHeight: 1.8, fontSize: '16px', color: '#333' },
  faqSection: { marginTop: '40px', padding: '24px', background: '#f8f9fa', borderRadius: '8px' },
  faqItem: { marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' },
  tags: { marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '8px' },
  tag: { background: '#eee', color: '#555', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', textDecoration: 'none' }
};
