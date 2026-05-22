import Head from "next/head";
import Navbar from "../../components/Navbar";
import BlogCard from "../../components/BlogCard";
import { getBlogs } from "../../lib/api";
import styles from "../../styles/Home.module.css";

export default function AuthorPage({ blogs, authorName }) {
  return (
    <>
      <Head>
        <title>{authorName} — BlogPlatform</title>
        <meta name="description" content={`Read all articles by ${authorName}.`} />
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1>✍️ {authorName}</h1>
          <p>{blogs.length} article{blogs.length !== 1 ? "s" : ""} published</p>
        </div>
        <div className={styles.grid}>
          {blogs.map((b) => <BlogCard key={b._id} blog={b} />)}
          {blogs.length === 0 && <p style={{ color: "#64748b" }}>No blogs by this author yet.</p>}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { data } = await getBlogs({ author: params.id, limit: 20 });
    const authorName = data.blogs?.[0]?.author?.name || "Author";
    return { props: { blogs: data.blogs || [], authorName } };
  } catch {
    return { props: { blogs: [], authorName: "Author" } };
  }
}
