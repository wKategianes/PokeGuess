import { useState, useEffect } from 'react';
import * as userAPI from '../../utilities/users-api';
import TopTrainer from '../../components/TopTrainer/TopTrainer';
import './TopTrainerPage.css';

export default function TopTrainerPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const fetchedUsers = await userAPI.getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="top-trainer-page">
      <TopTrainer users={users} />
    </div>
  );
}

