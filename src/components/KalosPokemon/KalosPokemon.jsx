import { useState, useEffect } from 'react';
import * as userAPI from '../../utilities/users-api';
import Pokedex from 'pokedex-promise-v2';
import './KalosPokemon.css';

export default function KalosPokemon({ user, setUser }) {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [guess, setGuess] = useState('');
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  let [score, setScore] = useState(user.score[0].value);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const P = new Pokedex();

    // Get data for all Pokemon by ID
  const pokemonIDs = Array.from({ length: 72 }, (_, index) => index + 650);
  Promise.all(pokemonIDs.map((id) => P.getResource(`/api/v2/pokemon/${id}`)))
    .then((responses) => {
      // Shuffle the responses array randomly and select the first 8 items
      const shuffledResponses = responses.sort(() => Math.random() - 0.5);
      setPokemonData(shuffledResponses.slice(0, 8));
    })
    .catch((error) => {
      console.log(error);
    });
}, []);


  const handleClick = (id) => {
    const pokemon = pokemonData.find(p => p.id === id);
    setSelectedPokemon(pokemon);
    setGuess('');
    setIsCorrectGuess(false);
    setErrorMessage('');
  };

  const handleGuess = async (event) => {
    event.preventDefault();
    if (guess.toLowerCase() === selectedPokemon.name.toLowerCase()) {
      setIsCorrectGuess(true);
      let newScore = score++;
      setScore(newScore);
      console.log(score, "This is score variable on line 64 of the handleGuess function");
      const updateScore = await userAPI.modifyScore(user._id, score);
      console.log(updateScore, "This is updateScore right before the setUser(updateScore)");
      const updateUser = {...updateScore};
      setUser(updateUser);
      setScore(updateScore.score[0].value);
      setTimeout(() => {
        setSelectedPokemon(null);
      }, 2000); // Close popup after 2 seconds
      setErrorMessage(null); // clear error message
    } else {
      setErrorMessage("Incorrect guess, try again!");
      setTimeout(() => {
        setErrorMessage(null); // clear error message
      }, 1500);
    }
  };

  return (
    <>
      <h1 className='h1-title'>Kalos Pokemon</h1>
      <p>Score: {score}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', height: '100vh'  }}>
        {pokemonData.length > 0 ? (
          pokemonData.map((pokemon) => (
            <div
              key={pokemon.id}
              className="card"
              onClick={() => handleClick(pokemon.id)}
            >
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="img"
              />
              <div className="name">{pokemon.name}</div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}

        {selectedPokemon && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => setSelectedPokemon(null)}
          >
            <div
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '5px',
                textAlign: 'center',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Who's that Pokemon?</h2>
              <img
                src={selectedPokemon.sprites.other['official-artwork'].front_default}
                alt={selectedPokemon.name}
                style={{ maxWidth: '100%', marginBottom: '10px' }}
              />
              <form onSubmit={handleGuess}>
                <input
                  type="text"
                  placeholder="Enter your guess"
                  style={{ width: '100%', padding: '5px' }}
                  value={guess}
                  onChange={(event) => setGuess(event.target.value)}
                />
                <button type="submit">Guess</button>
              </form>
              {isCorrectGuess && <p>Correct!</p>}
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
        )}
      </div>
    </>
  );
}