import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import ColoradoStartupMapGoogle from '../../components/ColoradoStartupMapGoogle';

export default function StartupPortal() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <h2 style={{ color: 'white' }}>Loading Colorado startups...</h2>
      </div>
    );
  }

  return (
    <>
      <Header />
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Colorado Startup Map</h1>
          <p className="page-subtitle">
            Explore CSU and Northern Colorado startups with a live map and curated directory.
          </p>
        </div>
      </section>

      <main style={{ paddingTop: 0 }}>
        <section className="section" style={{ paddingTop: 24, paddingBottom: 24 }}>
          <div className="container" style={{ maxWidth: 1400 }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)' }}>
              <ColoradoStartupMapGoogle />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
