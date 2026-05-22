import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us — BlogPlatform</title>
        <meta name="description" content="Learn about BlogPlatform — a production-ready MERN blog platform." />
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.staticPage}>
          <h1>About BlogPlatform</h1>
          <p>BlogPlatform is a production-ready blog management system built with the MERN stack (MongoDB, Express, React, Node.js) with Next.js for SEO-optimized public pages.</p>
          <h2>Our Mission</h2>
          <p>To provide developers with accurate, SEO-optimized, and up-to-date content that helps them grow in their careers and build better software.</p>
          <h2>Tech Stack</h2>
          <ul>
            <li>Backend: Node.js + Express.js + MongoDB</li>
            <li>Admin Panel: React.js with role-based access</li>
            <li>Frontend: Next.js with SSR for SEO</li>
            <li>Auth: JWT + bcrypt</li>
          </ul>
        </div>
      </div>
    </>
  );
}
