import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// libraries
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';


export default class AuthLogin extends React.Component {
  state = {
    passwordHidden: true,
    email: '',
    password: ''
  }


  handleChange = event => {
    console.log('Handle change fired', event.target.name, event.target.value);
    const { target: { name, value }} = event;
    this.setState({ [name]: value });
  }

  // toggle password type between password and text, to reveal it
  togglePasswordShow = () => {
    event.preventDefault();
    const passwordHidden = !this.state.passwordHidden;
    this.setState({ passwordHidden });
  }

  handleSubmit = event => {
    event.preventDefault();
    axios.post('/api/login', this.state)
      .then(res => {
        const token = res.data.token;
        Auth.setToken(token);
        Flash.setMessage('neutral', res.data.message);
        this.props.history.push('/users');
      })
      .catch(err => {
        console.log('Error is', err.response);
        Flash.setMessage('anger', 'We couldn\'t find your login details. Please try again');
        this.props.history.push(this.props.location.pathname);
      });
  }


  render() {
    return (
      <section className="login-section">
        <h1 className="welcome"><span className="curly">O</span>rbital</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <div className="field">
              <input
                className="password-input"
                name="password"
                type={this.state.passwordHidden ? 'password' : 'text'}
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-button-container">
              <button className="button login-button">Login</button>
            </div>
          </div>
        </form>
        <div className="other-button-container">

          <Link className="button register-button" to="/register">Sign Up</Link>
        </div>
      </section>
    );
  }
}
