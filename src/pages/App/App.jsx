import { useState, useEffect } from 'react';
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
import TopTrainerPage from '../TopTrainerPage/TopTrainerPage';
import './App.css';


export default function App() {
  const [user, setUser] = useState(getUser());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    }
    getUsers();
  }, []);

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      {user ?
        <Routes>
          <Route path="/kanto" element={<KantoPage user={user} setUser={setUser} />} />
          <Route path="/johto" element={<JohtoPage user={user} setUser={setUser} />} />
          <Route path="/hoenn" element={<HoennPage user={user} setUser={setUser} />} />
          <Route path="/sinnoh" element={<SinnohPage user={user} setUser={setUser} />} />
          <Route path="/unova" element={<UnovaPage user={user} setUser={setUser} />} />
          <Route path="/kalos" element={<KalosPage user={user} setUser={setUser} />} />
          <Route path="/alola" element={<AlolaPage user={user} setUser={setUser} />} />
          <Route path="/galar" element={<GalarPage user={user} setUser={setUser} />} />
          <Route path="/toptrainer" element={<TopTrainerPage users={users} />} />
        </Routes>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
