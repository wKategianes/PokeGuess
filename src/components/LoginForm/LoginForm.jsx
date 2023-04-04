import { useState } from 'react';
import * as usersService from '../../utilities/users-service';

export default function LoginForm({ setUser, onSignUpClick }) {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Name</label>
          <input
            type="text"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
      <div className="form-group">
        <button onClick={onSignUpClick}>Sign Up</button>
      </div>
    </div>
  );
}
