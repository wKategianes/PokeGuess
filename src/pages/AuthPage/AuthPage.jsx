import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(true);
  return (
    <main className='auth-main-container'>
      { showSignUp ?
          <SignUpForm setUser={setUser} showSignUp={showSignUp} />
          :
          <LoginForm setUser={setUser} />
        }
        {/* <button onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</button> */}
    </main>
  );
}