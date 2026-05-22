import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import { getBlogs, getCategories, getTags } from "../lib/api";
import styles from "../styles/Home.module.css";

export default function Home({ blogs, categories, tags }) {
  return (
    <>
      <Head>
        <title>BlogPlatform — Latest Articles</title>
        <meta name="description" content="Read the latest articles on web development, technology, and career growth." />
        <meta property="og:title" content="BlogPlatform — Latest Articles" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Read the latest articles on web development, technology, and career growth." />
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1>Latest Articles</h1>
          <p>Explore blogs on web development, technology, and career growth.</p>
        </div>
        <div className={styles.layout}>
          <main>
            {blogs.length === 0 && <p style={{ color: "#64748b" }}>No blogs published yet.</p>}
            <div className={styles.grid}>
              {blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
            </div>
          </main>
          <aside className={styles.sidebar}>
            <div className={styles.widget}>
              <h3>Categories</h3>
              {categories.map((c) => (
                <Link key={c} href={`/category/${encodeURIComponent(c)}`} className={styles.pill}>{c}</Link>
              ))}
              {categories.length === 0 && <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>No categories yet</p>}
            </div>
            <div className={styles.widget}>
              <h3>Tags</h3>
              {tags.map((t) => (
                <Link key={t} href={`/tag/${encodeURIComponent(t)}`} className={styles.pill}>#{t}</Link>
              ))}
              {tags.length === 0 && <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>No tags yet</p>}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const [blogsRes, catsRes, tagsRes] = await Promise.all([
      getBlogs({ limit: 12 }),
      getCategories(),
      getTags(),
    ]);
    return { props: { blogs: blogsRes.data.blogs || [], categories: catsRes.data || [], tags: tagsRes.data || [] } };
  } catch {
    return { props: { blogs: [], categories: [], tags: [] } };
  }
}
