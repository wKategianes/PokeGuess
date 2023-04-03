import { useEffect, useState } from 'react';
import pokeballSpin from '../../images/pokeballSpin.gif';
import './TopTrainer.css';

export default function TopTrainer() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Make an API call to retrieve the updated user data
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const sortedUsers = [...users].sort((a, b) => b.score[0].value - a.score[0].value);

  return (
    <div className="top-trainer">
      <div className="top-trainer-header">
      </div>
      <table>
        <thead>
          <tr><th colSpan={2}>            
              {/* <span className="top-trainers-title">Top Trainers</span> */}
              <span className='top-trainer-span'><img className='pokeballSpin' src={pokeballSpin} alt="Pokeball" />Top Trainers<img className='pokeballSpin' src={pokeballSpin} alt="Pokeball" /></span>
            </th></tr>
          <tr>
            <th >Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user._id} className="top-trainer-row">
              <td className='td-user'>{user.name}</td>
              <td className='td-score'>{user.score[0].value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
