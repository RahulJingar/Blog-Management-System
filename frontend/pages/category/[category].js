import Head from "next/head";
import Navbar from "../../components/Navbar";
import BlogCard from "../../components/BlogCard";
import { getBlogs } from "../../lib/api";
import styles from "../../styles/Home.module.css";

export default function CategoryPage({ blogs, category }) {
  return (
    <>
      <Head>
        <title>{category} Articles — BlogPlatform</title>
        <meta name="description" content={`Browse all articles in the ${category} category.`} />
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1>📂 {category}</h1>
          <p>{blogs.length} article{blogs.length !== 1 ? "s" : ""} in this category</p>
        </div>
        <div className={styles.grid}>
          {blogs.map((b) => <BlogCard key={b._id} blog={b} />)}
          {blogs.length === 0 && <p style={{ color: "#64748b" }}>No blogs in this category yet.</p>}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { data } = await getBlogs({ category: params.category, limit: 20 });
    return { props: { blogs: data.blogs || [], category: params.category } };
  } catch {
    return { props: { blogs: [], category: params.category } };
  }
}
