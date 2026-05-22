import Navbar from "../../components/Navbar";
import SEOHead from "../../components/SEOHead";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { getBlogBySlug } from "../../lib/api";
import styles from "../../styles/Blog.module.css";

export default function BlogDetail({ blog }) {
  if (!blog) return <div>Blog not found</div>;

  return (
    <>
      <SEOHead blog={blog} />
      <Navbar />
      <div className={styles.container}>
        <article className={styles.article}>
          {blog.featureImage && (
            <img src={blog.featureImage} alt={blog.title} className={styles.featureImg} />
          )}
          <div className={styles.body}>
            <div className={styles.meta}>
              {blog.categories?.map((c) => (
                <Link key={c} href={`/category/${encodeURIComponent(c)}`} className={styles.catBadge}>{c}</Link>
              ))}
            </div>
            <h1 className={styles.title}>{blog.title}</h1>
            <div className={styles.authorRow}>
              <Link href={`/author/${blog.author?._id}`}>✍️ {blog.author?.name}</Link>
              <span>📅 {new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <div className={styles.tags}>
              {blog.tags?.map((t) => (
                <Link key={t} href={`/tag/${encodeURIComponent(t)}`} className={styles.tag}>#{t}</Link>
              ))}
            </div>

            {/* Table of Contents */}
            {blog.tableOfContents?.length > 0 && (
              <div className={styles.toc}>
                <h3>📋 Table of Contents</h3>
                <ol>
                  {blog.tableOfContents.map((item, i) => (
                    <li key={i} style={{ marginLeft: (item.level - 2) * 16 }}>
                      <a href={`#${item.id}`}>{item.text}</a>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Content */}
            <div className={styles.content}>
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>

            {/* FAQ */}
            {blog.faqs?.length > 0 && (
              <div className={styles.faq}>
                <h2>❓ Frequently Asked Questions</h2>
                {blog.faqs.map((f, i) => (
                  <div key={i} className={styles.faqItem}>
                    <h3>{f.question}</h3>
                    <p>{f.answer}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Related Blogs */}
            {blog.relatedBlogs?.length > 0 && (
              <div className={styles.related}>
                <h2>Related Articles</h2>
                <div className={styles.relatedGrid}>
                  {blog.relatedBlogs.map((r) => (
                    <Link key={r._id} href={`/blog/${r.slug}`} className={styles.relatedCard}>
                      {r.featureImage && <img src={r.featureImage} alt={r.title} />}
                      <p>{r.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { data } = await getBlogBySlug(params.slug);
    return { props: { blog: data } };
  } catch {
    return { notFound: true };
  }
}
