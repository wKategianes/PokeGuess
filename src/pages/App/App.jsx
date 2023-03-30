import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import KantoPage from '../KantoPage/KantoPage';
import JohtoPage from '../JohtoPage/JohtoPage';
import HoennPage from '../HoennPage/HoennPage';
import SinnohPage from '../SinnohPage/SinnohPage';
import UnovaPage from '../UnovaPage/UnovaPage';
import KalosPage from '../KalosPage/KalosPage';
import AlolaPage from '../AlolaPage/AlolaPage';
import GalarPage from '../GalarPage/GalarPage';
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      { user ?
          <>
            <Routes>
              {/* Route components in here */}
              <Route path="/kanto" element={<KantoPage />} />
              <Route path="/johto" element={<JohtoPage />} />
              <Route path="/hoenn" element={<HoennPage />} />
              <Route path="/sinnoh" element={<SinnohPage />} />
              <Route path="/unova" element={<UnovaPage />} />
              <Route path="/kalos" element={<KalosPage />} />
              <Route path="/alola" element={<AlolaPage />} />
              <Route path="/galar" element={<GalarPage />} />
            </Routes>
          </>
          :         
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}