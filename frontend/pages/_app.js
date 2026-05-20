import Navbar from '../components/Navbar';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
        <Component {...pageProps} />
      </main>
      <footer style={{ background: '#1a1a2e', color: '#ccc', textAlign: 'center', padding: '20px', marginTop: '40px' }}>
        <p>© 2024 BlogPlatform. All rights reserved.</p>
      </footer>
    </>
  );
}
