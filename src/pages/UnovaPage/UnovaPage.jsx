import UnovaPokemon from '../../components/UnovaPokemon/UnovaPokemon';
import UnovaRegionImage from '../../images/UnovaRegion.png';
import './Unova.css'

export default function UnovaPage({user, setUser}) {

  return ( 
    <><UnovaPokemon user={user} setUser={setUser} /></>
    )
}