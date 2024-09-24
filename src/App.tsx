import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Staking from './Pages/Staking';
import Game from './Pages/Game';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/staking" element={<Staking />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
};

export default App;
