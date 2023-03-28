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
    <nav class="navBar">
      <div class="logo"><img src={logo} alt="pokeball logo"/></div>
      <Link class="navItem" to="/kanto">Kanto</Link>
      <Link class="navItem" to="/johto">Johto</Link>
      <Link class="navItem" to="/hoenn">Hoenn</Link>
      <Link class="navItem" to="/sinnoh">Sinnoh</Link>
      <Link class="navItem" to="/unova">Unova</Link>
      <Link class="navItem" to="/kalos">Kalos</Link>
      <Link class="navItem" to="/alola">Alola</Link>
      <Link class="navItem" to="/galar">Galar</Link>
      <div class="userContainer">
        {user && <span>Welcome, {user.name}</span>}
        {user && <Link class="navItem" to="" onClick={handleLogOut}>Log Out</Link>}
      </div>
    </nav>
  );
}