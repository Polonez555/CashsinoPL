import { useState, useCallback } from 'react';
import RouletteWheel from '../components/roulette/RouletteWheel';
import BettingBoard from '../components/roulette/BettingBoard';
import { placeBet } from '../api/roulette';
import './Roulette.css';

const CHIPS = [5, 10, 25, 50, 100];
const STARTING_BALANCE = 1000;

const BET_LABEL = {
  straight: (v) => `#${v}`,
  color:    (v) => v === 'red' ? '🔴 Red' : '⚫ Black',
  parity:   (v) => v === 'even' ? 'Even' : 'Odd',
  range:    (v) => v === 'low' ? '1–18' : '19–36',
  dozen:    (v) => `${v === 1 ? '1st' : v === 2 ? '2nd' : '3rd'} 12`,
  column:   (v) => `Col ${v}`,
};

function resultDot(num) {
  const RED = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
  const color = num === 0 ? 'green' : RED.has(num) ? 'red' : 'black';
  return <span className={`history-dot dot-${color}`}>{num}</span>;
}

export default function Roulette() {
  const [balance, setBalance]       = useState(STARTING_BALANCE);
  const [betAmount, setBetAmount]   = useState(10);
  const [selectedBet, setSelectedBet] = useState(null);
  const [phase, setPhase]           = useState('betting'); // betting | spinning | result
  const [spinResult, setSpinResult] = useState(null);     // { number, color, ... }
  const [outcome, setOutcome]       = useState(null);     // { won, profit, payout }
  const [history, setHistory]       = useState([]);
  const [error, setError]           = useState('');

  const canSpin = phase === 'betting' && selectedBet !== null && betAmount > 0 && betAmount <= balance;

  const handleSpin = async () => {
    if (!canSpin) return;
    setError('');
    setPhase('spinning');
    setOutcome(null);
    setSpinResult(null);

    try {
      const data = await placeBet({ ...selectedBet, amount: betAmount });
      setSpinResult(data.result);
      setOutcome(data.outcome);
      // Balance updated after animation ends
    } catch (err) {
      setError(err.message);
      setPhase('betting');
    }
  };

  const handleAnimationEnd = useCallback(() => {
    setPhase('result');
    setBalance(prev => {
      const next = prev + (outcome?.profit ?? 0);
      return Math.max(0, next);
    });
    setHistory(prev => [spinResult, ...prev].slice(0, 20));
  }, [outcome, spinResult]);

  const handleNextRound = () => {
    setPhase('betting');
    setSpinResult(null);
    setOutcome(null);
    if (balance <= 0) {
      setBalance(STARTING_BALANCE);
    }
  };

  const betLabel = selectedBet
    ? BET_LABEL[selectedBet.type]?.(selectedBet.value) ?? '?'
    : null;

  return (
    <div className="roulette-page">

      {/* ── Header ── */}
      <div className="roulette-header">
        <h2 className="roulette-title">Roulette</h2>
        <div className="roulette-balance">
          <span className="balance-label">Balance</span>
          <span className="balance-amount">${balance.toLocaleString()}</span>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="roulette-layout">

        {/* Left — Wheel */}
        <div className="wheel-section">
          <RouletteWheel
            spinning={phase === 'spinning'}
            result={spinResult?.number}
            onAnimationEnd={handleAnimationEnd}
          />

          {/* Result overlay */}
          {phase === 'result' && spinResult && outcome && (
            <div className={`result-banner${outcome.won ? ' result-win' : ' result-lose'}`}>
              <div className="result-number">{spinResult.number}</div>
              <div className="result-info">
                <span className={`result-color dot-${spinResult.color}`}>
                  {spinResult.color.toUpperCase()}
                </span>
                <span>{spinResult.parity ?? ''}</span>
              </div>
              <div className={`result-profit${outcome.won ? ' profit-pos' : ' profit-neg'}`}>
                {outcome.won ? `+$${outcome.profit}` : `-$${Math.abs(outcome.profit)}`}
              </div>
            </div>
          )}
        </div>

        {/* Right — Controls */}
        <div className="controls-section">

          {/* Bet amount chips */}
          <div className="chips-row">
            {CHIPS.map(chip => (
              <button
                key={chip}
                className={`chip${betAmount === chip ? ' chip-active' : ''}`}
                onClick={() => setBetAmount(chip)}
                disabled={phase === 'spinning'}
              >
                ${chip}
              </button>
            ))}
            <input
              type="number"
              className="chip-input"
              min={1}
              max={balance}
              value={betAmount}
              onChange={e => setBetAmount(Math.max(1, Math.min(balance, Number(e.target.value) || 1)))}
              disabled={phase === 'spinning'}
            />
          </div>

          {/* Betting board */}
          <BettingBoard
            selected={selectedBet}
            onBet={setSelectedBet}
            disabled={phase !== 'betting'}
          />

          {/* Selected bet summary */}
          <div className="bet-summary">
            {selectedBet ? (
              <span>Betting <strong>${betAmount}</strong> on <strong>{betLabel}</strong></span>
            ) : (
              <span className="bet-hint">← Select a bet on the table</span>
            )}
          </div>

          {error && <div className="bet-error">{error}</div>}

          {/* Action button */}
          {phase === 'betting' && (
            <button
              className={`spin-btn${canSpin ? ' spin-btn-active' : ''}`}
              onClick={handleSpin}
              disabled={!canSpin}
            >
              SPIN
            </button>
          )}

          {phase === 'spinning' && (
            <div className="spinning-indicator">
              <span className="spin-dot" />
              <span className="spin-dot" />
              <span className="spin-dot" />
            </div>
          )}

          {phase === 'result' && (
            <button className="spin-btn spin-btn-active" onClick={handleNextRound}>
              {balance <= 0 ? 'RELOAD ($1000)' : 'NEXT ROUND'}
            </button>
          )}
        </div>
      </div>

      {/* ── History ── */}
      {history.length > 0 && (
        <div className="spin-history">
          <span className="history-label">Last spins:</span>
          <div className="history-dots">
            {history.map((r, i) => (
              <span key={i}>{resultDot(r.number)}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
