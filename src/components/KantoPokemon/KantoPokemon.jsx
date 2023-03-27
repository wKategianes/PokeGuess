import { useState, useEffect } from 'react';
import Pokedex from 'pokedex-promise-v2';
import './KantoPokemon.css';

export default function KantoPokemon() {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

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

  const styles = {
    card: {
      border: '1px solid black',
      borderRadius: '5px',
      margin: '5px',
      padding: '5px',
      width: 'calc(20% - 10px)',
      height: 'auto',
      overflow: 'hidden',
      position: 'relative',
      display: 'inline-block',
    },
    image: {
      width: '100%',
      height: 'auto',
    },
    name: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '5px',
      background: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'center',
      textTransform: 'capitalize',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(255, 255, 255, 0.5)',
      visibility: 'hidden',
      opacity: 0,
      transition: 'visibility 0s, opacity 0.5s ease',
    },
    overlayHover: {
      visibility: 'visible',
      opacity: 1,
      transition: 'opacity 0.5s ease',
    },
  };

  const handleMouseEnter = (id) => {
    const overlay = document.getElementById(`overlay-${id}`);
    overlay.style.visibility = 'visible';
    overlay.style.opacity = 1;
    
    const pokemon = pokemonData.find(p => p.id === id);
    setSelectedPokemon(pokemon);
  };  

  const handleMouseLeave = (id) => {
    const overlay = document.getElementById(`overlay-${id}`);
    overlay.style.visibility = 'hidden';
    overlay.style.opacity = 0;
  };

  return (
    <>
      <h1>Kanto Pokemon</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {pokemonData.length > 0 ? (
          pokemonData.map((pokemon) => (
            <div
              key={pokemon.id}
              style={styles.card}
              onMouseEnter={() => handleMouseEnter(pokemon.id)}
              onMouseLeave={() => handleMouseLeave(pokemon.id)}
            >
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                style={styles.image}
              />
              <div id={`overlay-${pokemon.id}`} style={styles.overlay}>
                <div style={styles.name}>{pokemon.name}</div>
              </div>
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
              <input
                type="text"
                placeholder="Enter your guess"
                style={{ width: '100%', padding: '5px' }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}