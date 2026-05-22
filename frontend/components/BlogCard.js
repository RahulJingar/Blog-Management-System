import Link from "next/link";
import styles from "../styles/Home.module.css";

const BlogCard = ({ blog }) => (
  <div className={styles.card}>
    {blog.featureImage && <img src={blog.featureImage} alt={blog.title} className={styles.cardImg} />}
    <div className={styles.cardBody}>
      <div className={styles.cardMeta}>
        {blog.categories?.[0] && (
          <Link href={`/category/${encodeURIComponent(blog.categories[0])}`} className={styles.catBadge}>
            {blog.categories[0]}
          </Link>
        )}
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      <h2 className={styles.cardTitle}>
        <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
      </h2>
      {blog.excerpt && <p className={styles.cardExcerpt}>{blog.excerpt}</p>}
      <div className={styles.cardFooter}>
        <Link href={`/author/${blog.author?._id}`} className={styles.authorLink}>
          ✍️ {blog.author?.name}
        </Link>
        <Link href={`/blog/${blog.slug}`} className={styles.readMore}>Read More →</Link>
      </div>
    </div>
  </div>
);

export default BlogCard;
