import { Link } from 'react-router-dom';
import './GameCard.css';

export default function GameCard({ title, description, path, available }) {
  return (
    <div className={`game-card${available ? '' : ' game-card--disabled'}`}>
      <h3 className="game-card__title">{title}</h3>
      <p className="game-card__desc">{description}</p>
      {available ? (
        <Link to={path} className="game-card__btn">Play Now</Link>
      ) : (
        <span className="game-card__badge">Coming Soon</span>
      )}
    </div>
  );
}
