import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';
import logo from '../../images/pokeball.png';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="NavBar">
      { user && 
      <>
      <Link to="/kanto" className="navItem">Kanto</Link>
      <Link to="/johto" className="navItem">Johto</Link>
      <Link to="/hoenn" className="navItem">Hoenn</Link>
      <Link to="/sinnoh" className="navItem">Sinnoh</Link>
      <Link to="/unova" className="navItem">Unova</Link>
      <Link to="/kalos" className="navItem">Kalos</Link>
      <Link to="/alola" className="navItem">Alola</Link>
      <Link to="/galar" className="navItem">Galar</Link>
        <button onClick={handleLogOut} className="navItem">Logout</button>
        </>
      }
    </nav>
  );
}