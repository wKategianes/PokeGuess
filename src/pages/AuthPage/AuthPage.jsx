import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useState } from 'react';
import './AuthPage.css';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignUpClick = () => setShowSignUp(true);
  const handleSignUpFormClose = () => setShowSignUp(false);

  return (
    <main className='auth-main-container'>
      <div className="container">
        {showSignUp ? (
          <SignUpForm setUser={setUser} onClose={handleSignUpFormClose} />
        ) : (
          <LoginForm setUser={setUser} onSignUpClick={handleSignUpClick} />
        )}
      </div>
    </main>
  );
}
