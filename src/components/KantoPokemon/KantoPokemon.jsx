import { useState, useEffect } from 'react';
import Pokedex from 'pokedex-promise-v2';
import './KantoPokemon.css';

export default function KantoPokemon() {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [guess, setGuess] = useState('');
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);

  useEffect(() => {
    const P = new Pokedex();

    // Get data for all original 151 Pokemon by ID
    const pokemonIDs = Array.from({ length: 151 }, (_, index) => index + 1);
    Promise.all(pokemonIDs.map((id) => P.getResource(`/api/v2/pokemon/${id}`)))
      .then((responses) => {
        setPokemonData(responses);
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
  };

  const handleGuess = (event) => {
    event.preventDefault();
    if (guess.toLowerCase() === selectedPokemon.name.toLowerCase()) {
      setIsCorrectGuess(true);
    } else {
      setIsCorrectGuess(false);
    }
  };

  return (
    <>
      <h1>Kanto Pokemon</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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
                {isCorrectGuess && <p>Correct!</p>}
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}