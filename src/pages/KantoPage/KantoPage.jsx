import KantoPokemon from '../../components/KantoPokemon/KantoPokemon';
import backgroundImage from '../../images/PokemonBackground.jpg';
import './Kanto.css'

export default function KantoPage({ user, setUser }) {

  return (
    <>
    <KantoPokemon user={user} setUser={setUser} />
    </>

    )
}