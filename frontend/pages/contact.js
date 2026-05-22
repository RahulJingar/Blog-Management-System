import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us — BlogPlatform</title>
        <meta name="description" content="Get in touch with the BlogPlatform team." />
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.staticPage}>
          <h1>Contact Us</h1>
          <p>Have a question, suggestion, or want to contribute? We'd love to hear from you.</p>
          <p>📧 Email: <a href="mailto:hello@blogplatform.com">hello@blogplatform.com</a></p>
          <p>🐙 GitHub: <a href="https://github.com" target="_blank" rel="noreferrer">github.com/blogplatform</a></p>
        </div>
      </div>
    </>
  );
}
