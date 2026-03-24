export default function RoulettePage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#e53e3e' }}>🎰 Roulette</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: '#666' }}>
        European Roulette with secure random number generation
      </p>

      <div style={{ 
        padding: '3rem', 
        borderRadius: '12px', 
        backgroundColor: '#f5f5f5', 
        textAlign: 'center',
        border: '3px solid #e53e3e'
      }}>
        <div style={{ 
          width: '200px', 
          height: '200px', 
          borderRadius: '50%', 
          backgroundColor: '#e53e3e', 
          margin: '0 auto 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '4rem',
          color: 'white',
          fontWeight: 'bold',
          border: '10px solid #c53030'
        }}>
          0
        </div>
        <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Place your bets!</p>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Game functionality will be implemented with React hooks and API integration
        </p>
      </div>

      <div style={{ marginTop: '2rem', padding: '2rem', backgroundColor: '#fff5f5', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#c53030' }}>How to Play</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Place your bets on numbers, colors, or even/odd</li>
          <li>Spin the wheel and watch the ball land</li>
          <li>Win up to 35x your bet on straight-up number bets!</li>
        </ul>
      </div>

      <a 
        href="/" 
        style={{ 
          display: 'inline-block', 
          marginTop: '2rem', 
          padding: '0.75rem 1.5rem', 
          backgroundColor: '#4a5568', 
          color: 'white', 
          borderRadius: '6px', 
          textDecoration: 'none' 
        }}
      >
        ← Back to Lobby
      </a>
    </main>
  );
}