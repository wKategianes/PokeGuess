import HoennPokemon from '../../components/HoennPokemon/HoennPokemon';
import HoennRegionImage from '../../images/HoennRegion.png';
import './Hoenn.css';

export default function HoennPage({user, setUser}) {

  return ( 
    <><HoennPokemon user={user} setUser={setUser} /></>

    )
}