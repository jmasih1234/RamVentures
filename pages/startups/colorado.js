import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const ColoradoStartupMap = dynamic(() => import('../../components/ColoradoStartupMap'), {
  ssr: false,
  loading: () => (
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
  ),
});

export default function ColoradoPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      <ColoradoStartupMap />
    </div>
  );
}
