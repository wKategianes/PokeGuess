import { useState, useEffect } from 'react';
import * as userAPI from '../../utilities/users-api';
import Pokedex from 'pokedex-promise-v2';
import trainerTriviaLogo from '../../images/TrainerTriviaLogo.png';
import './KalosPokemon.css';

export default function KantoPokemon({ user, setUser }) {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [guess, setGuess] = useState('');
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  let [score, setScore] = useState(user.score[0].value);
  const [errorMessage, setErrorMessage] = useState('');
  const [hoveredPokemon, setHoveredPokemon] = useState(null);

  useEffect(() => {
    const P = new Pokedex();

    // Get data for all Pokemon by ID
    const pokemonIDs = Array.from({ length: 72 }, (_, index) => index + 650);
    Promise.all(pokemonIDs.map((id) => P.getResource(`/api/v2/pokemon/${id}`)))
      .then((responses) => {
        // Shuffle the responses array randomly and select the first 6 items
        const shuffledResponses = responses.sort(() => Math.random() - 0.5);
        setPokemonData(shuffledResponses.slice(0, 6));
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
      const updateScore = await userAPI.modifyScore(user._id, score);
      const updateUser = { ...updateScore };
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
      <h1 className='h1-title'><img src={trainerTriviaLogo} alt="Trainer Trivia Logo" /></h1>
      <div className='div-pokemonData' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', height: '100vh' }}>
        {pokemonData.length > 0 ? (
          pokemonData.map((pokemon) => (
            <div
              key={pokemon.id}
              className={`card card-type-${pokemon.types[0].type.name}`}
              onClick={() => handleClick(pokemon.id)}
              onMouseEnter={() => setHoveredPokemon(pokemon.id)}
              onMouseLeave={() => setHoveredPokemon(null)}
              style={{ width: 'calc(33.33% - 10px)' }} // added style to set width
            >
              <img
                src={
                  pokemon.id === hoveredPokemon
                    ? "https://projectpokemon.org/images/normal-sprite/" + pokemon.name.toLowerCase() + ".gif"
                    : pokemon.sprites.other["official-artwork"].front_default
                }
                alt={pokemon.name}
                className="card-img"
              />
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
                className="popup-img"
              />
              <form onSubmit={handleGuess}
                className="popup-form">
                <input
                  type="text"
                  placeholder="Enter your guess"
                  style={{ width: '100%', padding: '5px' }}
                  value={guess}
                  onChange={(event) => setGuess(event.target.value)}
                  className="popup-form-input"
                />
                <button type="submit" className="popup-submit-button">Guess</button>
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