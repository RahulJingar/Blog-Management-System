import SEOHead from '../components/SEOHead';

export default function About() {
  return (
    <>
      <SEOHead title="About Us - BlogPlatform" description="Learn about BlogPlatform, our mission and team." />
      <div style={styles.container}>
        <h1>About BlogPlatform</h1>
        <p>BlogPlatform is a production-ready blog management system built with Node.js, Express, MongoDB, React, and Next.js.</p>
        <h2>Our Mission</h2>
        <p>To provide a fast, SEO-optimized, and secure platform for content creators to share their knowledge with the world.</p>
        <h2>Tech Stack</h2>
        <ul>
          <li>Backend: Node.js + Express + MongoDB</li>
          <li>Admin Panel: React.js</li>
          <li>Frontend: Next.js (SSR for SEO)</li>
          <li>Auth: JWT + bcrypt</li>
        </ul>
      </div>
    </>
  );
}

const styles = {
  container: { maxWidth: '700px', lineHeight: 1.8 }
};
