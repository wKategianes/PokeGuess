import { useState, useEffect } from 'react';
import TopTrainer from '../../components/TopTrainer/TopTrainer';
import './TopTrainerPage.css';

export default function TopTrainerPage({users}) {

  return (
    <div className="top-trainer-page">
      <TopTrainer users={users} />
    </div>
  );
}
