import { Component } from 'react';
import { signUp } from '../../utilities/users-service';
import './SignUpForm.css';

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: '',
    showSignUp: this.props.showSignUp
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const {name, email, password} = this.state;
      const formData = {name, email, password};
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div className="container">
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name </label>
              <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email </label>
              <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="confirm">Confirm</label>
              <input type="password" name="confirm" id="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            </div>
          </form>
          <div className="form-group">
            <button className="login-btn" type="submit">LOG IN</button>
          </div>
          {this.state.showSignUp && (
  <div className="form-group">
    <button type="submit" disabled={disable}>SIGN UP</button>
  </div>
)}
        </div>
        <div className="form-group error-container">
          <p className="error-message">{this.state.error}</p>
        </div>
      </div>
    );
  }
}
