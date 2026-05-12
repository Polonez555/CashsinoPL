import './BettingBoard.css';

const RED = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
const numColor = (n) => (n === 0 ? 'green' : RED.has(n) ? 'red' : 'black');

// Number grid rows
const ROW3 = Array.from({ length: 12 }, (_, i) => (i + 1) * 3);        // 3,6,9,...,36
const ROW2 = Array.from({ length: 12 }, (_, i) => (i + 1) * 3 - 1);    // 2,5,8,...,35
const ROW1 = Array.from({ length: 12 }, (_, i) => (i + 1) * 3 - 2);    // 1,4,7,...,34

function NumCell({ n, selected, onBet }) {
  const active = selected?.type === 'straight' && selected?.value === n;
  return (
    <div
      className={`board-cell num-cell ${numColor(n)}${active ? ' selected' : ''}`}
      onClick={() => onBet({ type: 'straight', value: n })}
    >
      {n}
    </div>
  );
}

export default function BettingBoard({ selected, onBet, disabled }) {
  const sel = (type, value) =>
    selected?.type === type && String(selected?.value) === String(value);

  const cell = (type, value, label, extra = '') => (
    <div
      className={`board-cell outside-cell${extra ? ' ' + extra : ''}${sel(type, value) ? ' selected' : ''}${disabled ? ' disabled' : ''}`}
      onClick={() => !disabled && onBet({ type, value })}
    >
      {label}
    </div>
  );

  return (
    <div className={`betting-board${disabled ? ' betting-board--disabled' : ''}`}>

      {/* ── Zero ─────────────────────────────────────── */}
      <div className="board-zero-row">
        <div
          className={`board-cell zero-cell${sel('straight', 0) ? ' selected' : ''}${disabled ? ' disabled' : ''}`}
          onClick={() => !disabled && onBet({ type: 'straight', value: 0 })}
        >
          0
        </div>
      </div>

      {/* ── Number grid + column bets ─────────────────── */}
      <div className="board-grid-area">
        <div className="board-numbers">
          <div className="board-row">
            {ROW3.map(n => <NumCell key={n} n={n} selected={selected} onBet={!disabled ? onBet : () => {}} />)}
          </div>
          <div className="board-row">
            {ROW2.map(n => <NumCell key={n} n={n} selected={selected} onBet={!disabled ? onBet : () => {}} />)}
          </div>
          <div className="board-row">
            {ROW1.map(n => <NumCell key={n} n={n} selected={selected} onBet={!disabled ? onBet : () => {}} />)}
          </div>
        </div>

        <div className="board-col-bets">
          {cell('column', 3, '2:1')}
          {cell('column', 2, '2:1')}
          {cell('column', 1, '2:1')}
        </div>
      </div>

      {/* ── Dozens ────────────────────────────────────── */}
      <div className="board-dozens">
        {cell('dozen', 1, '1st 12')}
        {cell('dozen', 2, '2nd 12')}
        {cell('dozen', 3, '3rd 12')}
      </div>

      {/* ── Outside bets ──────────────────────────────── */}
      <div className="board-outside">
        {cell('range',  'low',   '1–18')}
        {cell('parity', 'even',  'Even')}
        {cell('color',  'red',   '●',    'bet-red')}
        {cell('color',  'black', '●',    'bet-black')}
        {cell('parity', 'odd',   'Odd')}
        {cell('range',  'high',  '19–36')}
      </div>
    </div>
  );
}
