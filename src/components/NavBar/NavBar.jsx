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
      <Link class="navItem" to="/orders">Order History</Link>
      &nbsp; | &nbsp;
      <Link class="navItem" to="/home">Home</Link>
      &nbsp;&nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp;&nbsp;<Link class="navItem" to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}