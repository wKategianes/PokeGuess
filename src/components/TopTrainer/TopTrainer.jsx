import { useEffect, useState } from 'react';
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
      <h1>Top Trainers</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user._id}>
              <td>
                {user.name}
              </td>
              <td>
                {user.score[0].value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
