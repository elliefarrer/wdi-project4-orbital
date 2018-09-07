import React from 'react';
import axios from 'axios';

// libraries
import Auth from '../../lib/Auth';


export default class AuthLogin extends React.Component {
  state = {
    passwordHidden: true,
    email: 'ellie@platyp.com',
    password: 'Pass1234'
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
        Auth.setToken(token); //TODO write this
        this.props.history.push('/users');
      })
      .catch(err => console.log('There was an error', err));
  }


  render() {
    return (
      <section>
        <h1>Orbital</h1>
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
                name="password"
                type={this.state.passwordHidden ? 'password' : 'text'}
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <button>Submit</button>
          </div>
        </form>
        <button onClick={this.togglePasswordShow}>👁</button>
      </section>
    );
  }
}
