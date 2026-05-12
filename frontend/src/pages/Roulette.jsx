import './Roulette.css';

export default function Roulette() {
  return (
    <div className="roulette-page">
      <h2 className="roulette-title">Roulette</h2>
      <p className="roulette-subtitle">Game coming soon — backend API is live and ready.</p>

      <div className="roulette-placeholder">
        <div className="wheel-icon">🎡</div>
        <p>The roulette wheel will appear here.</p>
        <div className="api-note">
          <span className="api-dot" />
          Backend running at <code>/api/roulette/spin</code>
        </div>
      </div>
    </div>
  );
}
