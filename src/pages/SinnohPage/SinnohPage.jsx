import SinnohPokemon from '../../components/SinnohPokemon/SinnohPokemon';
import SinnohRegionImage from '../../images/SinnohRegion.webp';
import './Sinnoh.css';

export default function SinnohPage({user, setUser}) {

  return ( 
    <><SinnohPokemon user={user} setUser={setUser} /></>

    )
}