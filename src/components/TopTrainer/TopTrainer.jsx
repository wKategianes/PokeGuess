import { getAllUsers } from '../../utilities/users-api';
import { useEffect, useState } from 'react';
import './TopTrainer.css';

export default function TopTrainer() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setUsers(users);
    };
  
    fetchUsers();
  }, []);

  return (
    <div className="top-trainer">
      <h2>Top Trainers</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.score[0].value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
