export default function BlackjackPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#3182ce' }}>🃏 Blackjack</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: '#666' }}>
        Classic Blackjack - Beat the dealer without going over 21
      </p>

      <div style={{ 
        padding: '3rem', 
        borderRadius: '12px', 
        backgroundColor: '#f5f5f5', 
        textAlign: 'center',
        border: '3px solid #3182ce'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '1.25rem', color: '#718096', marginBottom: '1rem' }}>DEALER</p>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{ 
              width: '80px', 
              height: '120px', 
              borderRadius: '8px', 
              backgroundColor: '#2d3748',
              border: '2px solid #1a202c'
            }}></div>
            <div style={{ 
              width: '80px', 
              height: '120px', 
              borderRadius: '8px', 
              backgroundColor: '#2d3748',
              border: '2px solid #1a202c'
            }}></div>
          </div>

          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#e6fffa', 
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2c7a7b' }}>
              Score: 0
            </p>
          </div>

          <p style={{ fontSize: '1.25rem', color: '#718096', marginBottom: '1rem' }}>PLAYER</p>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{ 
              width: '80px', 
              height: '120px', 
              borderRadius: '8px', 
              backgroundColor: '#2d3748',
              border: '2px solid #1a202c'
            }}></div>
            <div style={{ 
              width: '80px', 
              height: '120px', 
              borderRadius: '8px', 
              backgroundColor: '#2d3748',
              border: '2px solid #1a202c'
            }}></div>
          </div>

          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#ebf8ff', 
            borderRadius: '8px'
          }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2b6cb0' }}>
              Score: 0
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            disabled
            style={{ 
              padding: '1rem 2rem', 
              fontSize: '1.25rem',
              backgroundColor: '#48bb78', 
              color: 'white', 
              borderRadius: '6px', 
              border: 'none',
              cursor: 'not-allowed',
              opacity: 0.5
            }}
          >
            Hit
          </button>
          <button 
            disabled
            style={{ 
              padding: '1rem 2rem', 
              fontSize: '1.25rem',
              backgroundColor: '#f56565', 
              color: 'white', 
              borderRadius: '6px', 
              border: 'none',
              cursor: 'not-allowed',
              opacity: 0.5
            }}
          >
            Stand
          </button>
        </div>

        <p style={{ marginTop: '2rem', color: '#666' }}>
          Game functionality will be implemented with React hooks and API integration
        </p>
      </div>

      <div style={{ marginTop: '2rem', padding: '2rem', backgroundColor: '#ebf8ff', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2c5282' }}>How to Play</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Get closer to 21 than the dealer without going over</li>
          <li>Face cards (J, Q, K) are worth 10, Aces are worth 1 or 11</li>
          <li>Hit to get another card, Stand to keep your current hand</li>
          <li>Dealer must hit on 16 or less, stand on 17 or more</li>
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