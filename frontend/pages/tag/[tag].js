import Head from "next/head";
import Navbar from "../../components/Navbar";
import BlogCard from "../../components/BlogCard";
import { getBlogs } from "../../lib/api";
import styles from "../../styles/Home.module.css";

export default function TagPage({ blogs, tag }) {
  return (
    <>
      <Head>
        <title>#{tag} — BlogPlatform</title>
        <meta name="description" content={`Browse all articles tagged with ${tag}.`} />
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1>🏷️ #{tag}</h1>
          <p>{blogs.length} article{blogs.length !== 1 ? "s" : ""} with this tag</p>
        </div>
        <div className={styles.grid}>
          {blogs.map((b) => <BlogCard key={b._id} blog={b} />)}
          {blogs.length === 0 && <p style={{ color: "#64748b" }}>No blogs with this tag yet.</p>}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { data } = await getBlogs({ tag: params.tag, limit: 20 });
    return { props: { blogs: data.blogs || [], tag: params.tag } };
  } catch {
    return { props: { blogs: [], tag: params.tag } };
  }
}
