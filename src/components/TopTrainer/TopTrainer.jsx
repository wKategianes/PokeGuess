import './TopTrainer.css';

export default function TopTrainer({ users }) {
  const sortedUsers = [...users].sort((a, b) => b.score[0].value - a.score[0].value);

  console.log(users, "This is the users prop being passed into the TopTrainer component")

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
              <td>{user.name}</td>
              <td>{user.score[0].value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}