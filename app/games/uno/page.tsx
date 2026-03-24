export default function UnoPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#805ad5' }}>🎴 Uno</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: '#666' }}>
        Multiplayer Uno - Coming Soon!
      </p>

      <div style={{ 
        padding: '3rem', 
        borderRadius: '12px', 
        backgroundColor: '#f5f5f5', 
        textAlign: 'center',
        border: '3px solid #805ad5'
      }}>
        <div style={{ fontSize: '5rem', marginBottom: '2rem' }}>🚧</div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#805ad5' }}>Under Construction</h2>
        <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '2rem' }}>
          We're working hard to bring you multiplayer Uno with real-time gameplay!
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ 
            width: '60px', 
            height: '90px', 
            borderRadius: '8px', 
            backgroundColor: '#e53e3e',
            border: '2px solid #c53030'
          }}></div>
          <div style={{ 
            width: '60px', 
            height: '90px', 
            borderRadius: '8px', 
            backgroundColor: '#3182ce',
            border: '2px solid #2b6cb0'
          }}></div>
          <div style={{ 
            width: '60px', 
            height: '90px', 
            borderRadius: '8px', 
            backgroundColor: '#48bb78',
            border: '2px solid #38a169'
          }}></div>
          <div style={{ 
            width: '60px', 
            height: '90px', 
            borderRadius: '8px', 
            backgroundColor: '#ecc94b',
            border: '2px solid #d69e2e'
          }}></div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', padding: '2rem', backgroundColor: '#faf5ff', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#6b46c1' }}>Planned Features</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Real-time multiplayer with WebSocket support</li>
          <li>Classic Uno rules with action cards (Skip, Reverse, Draw Two, Wild, Wild Draw Four)</li>
          <li>Lobby system for creating and joining games</li>
          <li>Chat functionality during games</li>
          <li>Game history and statistics</li>
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