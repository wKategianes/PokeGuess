import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';
import logo from '../../images/pokeball.png';
import scoreImage from '../../images/ScoreLogo.png';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  const score = user?.score?.[0]?.value || '';

  return (
    <nav className="NavBar">
      <div className="logo">
        <div className="logo-image">
          <img src={logo} alt="Pokeball logo" />
        </div>
      </div>
      {user && (
        <div className="navItems">
          <Link to="/kanto" className="navItem">
            Kanto
          </Link>
          <Link to="/johto" className="navItem">
            Johto
          </Link>
          <Link to="/hoenn" className="navItem">
            Hoenn
          </Link>
          <Link to="/sinnoh" className="navItem">
            Sinnoh
          </Link>
          <Link to="/unova" className="navItem">
            Unova
          </Link>
          <Link to="/kalos" className="navItem">
            Kalos
          </Link>
          <Link to="/alola" className="navItem">
            Alola
          </Link>
          <Link to="/galar" className="navItem">
            Galar
          </Link>
          <Link to="/toptrainer" className="navTopTrainer">
            Top Trainers
          </Link>
          <button onClick={handleLogOut} className="navLogout">
            Logout
          </button>
          <div className="score-navItem">
            <img src={scoreImage} alt="Score Logo" height="40" />
            <span className='user-score-span'>{score}</span>
          </div>
        </div>
      )}
    </nav>
  );
}
