import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Coins from './components/Coins';
import Header from './components/Header';
import Exchange from './components/Exchange';
import CoinDetails from './components/CoinDetails';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Coins />} path="/coins" />
          <Route element={<Exchange />} path="/exchanges" />
          <Route element={<CoinDetails />} path="/coin/:id" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
