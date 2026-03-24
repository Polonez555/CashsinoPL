export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to CashsinoPL</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#666' }}>
        Your premier online casino platform
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ padding: '2rem', borderRadius: '12px', backgroundColor: '#f5f5f5', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#e53e3e' }}>🎰 Roulette</h2>
          <p style={{ marginBottom: '1rem' }}>Experience the thrill of European Roulette with our secure random number generator.</p>
          <a href="/games/roulette" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: '#e53e3e', color: 'white', borderRadius: '6px', textDecoration: 'none' }}>Play Now</a>
        </div>

        <div style={{ padding: '2rem', borderRadius: '12px', backgroundColor: '#f5f5f5', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#3182ce' }}>🃏 Blackjack</h2>
          <p style={{ marginBottom: '1rem' }}>Test your skills with classic Blackjack. Beat the dealer to win big!</p>
          <a href="/games/blackjack" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: '#3182ce', color: 'white', borderRadius: '6px', textDecoration: 'none' }}>Play Now</a>
        </div>

        <div style={{ padding: '2rem', borderRadius: '12px', backgroundColor: '#f5f5f5', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#805ad5' }}>🎴 Uno</h2>
          <p style={{ marginBottom: '1rem' }}>Coming soon! Multiplayer Uno with real-time gameplay.</p>
          <span style={{ display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: '#cbd5e0', color: '#718096', borderRadius: '6px' }}>Coming Soon</span>
        </div>
      </div>

      <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#e6fffa', borderRadius: '12px', border: '2px solid #38b2ac' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2c7a7b' }}>✨ Features</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>✅ Cryptographically secure random number generation</li>
          <li style={{ marginBottom: '0.5rem' }}>✅ Fair gameplay with verifiable outcomes</li>
          <li style={{ marginBottom: '0.5rem' }}>✅ Real-time multiplayer support (coming soon)</li>
          <li style={{ marginBottom: '0.5rem' }}>✅ Modern, responsive design</li>
          <li>✅ Built with Next.js 14 and TypeScript</li>
        </ul>
      </div>
    </main>
  );
}