import GameCard from '../components/GameCard';
import './Home.css';

const GAMES = [
  {
    title: 'Roulette',
    description: 'Spin the wheel and test your luck. Bet on numbers, colors, odd/even, and more.',
    path: '/roulette',
    available: true,
  },
  {
    title: 'Blackjack',
    description: 'Beat the dealer to 21 without going bust.',
    path: '/blackjack',
    available: false,
  },
  {
    title: 'Slots',
    description: 'Pull the lever and match the symbols for massive payouts.',
    path: '/slots',
    available: false,
  },
];

export default function Home() {
  return (
    <div className="home">
      <section className="home-hero">
        <h1>Welcome to <span className="brand">CashsinoPL</span></h1>
        <p>Your premier online casino experience. Play responsibly.</p>
      </section>
      <section>
        <h2 className="section-title">Games</h2>
        <div className="games-grid">
          {GAMES.map(game => (
            <GameCard key={game.title} {...game} />
          ))}
        </div>
      </section>
    </div>
  );
}
