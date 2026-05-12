const BASE = '/api/roulette';

export async function placeBet(bet) {
  const res = await fetch(`${BASE}/bet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bet }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Bet failed');
  return data;
}
