import GalarPokemon from '../../components/GalarPokemon/GalarPokemon';
import GalarRegionImage from '../../images/GalarRegion.png';
import './Galar.css';

export default function GalarPage({user, setUser}) {

  return ( 
    <><GalarPokemon user={user} setUser={setUser} /></>

    )
}