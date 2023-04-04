import { useState } from 'react';
import { signUp } from '../../utilities/users-service';
import './SignUpForm.css';

export default function SignUpForm({ setUser, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await signUp(formData);
      setUser(user);
      onClose();
    } catch {
      setError('Sign Up Failed - Try Again');
    }
  }

  const disable = formData.password !== formData.confirm;

  return (
    <div className="container">
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name </label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email </label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm">Confirm</label>
            <input type="password" name="confirm" id="confirm" value={formData.confirm} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <div className="buttonwrapper">
                <button className="login-btn" type="submit" onClick={handleSubmit} disabled={disable}>
                  SIGN UP
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="form-group error-container">
        <p className="error-message">{error}</p>
      </div>
    </div>
  );
}
