import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Roulette from './pages/Roulette';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roulette" element={<Roulette />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
