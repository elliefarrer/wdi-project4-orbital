import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

// libraries
import Auth from '../../lib/Auth';


export default class AuthRegister extends React.Component {
  state = {
    passwordHidden: true,
    genders: [
      {label: 'Man', value: 'man'},
      {label: 'Woman', value: 'woman'},
      {label: 'Transgender', value: 'transgender'},
      {label: 'Non-Binary', value: 'non-binary'},
      {label: 'Other', value: 'other'},
      {label: 'Prefer Not To Say', value: 'prefer not to say'}
    ],
    firstName: 'Molly',
    dateOfBirth: '1998-09-09',
    email: 'molly@platyp.com',
    password: 'Pass1234',
    passwordConfirmation: 'Pass1234',
    postcode: 'E1 1DB',
    sexuality: ['men', 'women'],
    minAgeRange: 21,
    maxAgeRange: 24,
    profilePic: 'https://i.imgur.com/Bp9yrkl.png',
    occupation: 'Student',
    languages: ['Welsh', 'German'],
    bio: 'History student at QMUL, originally from Essex. Part time model but I love pizza more than anything!'
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
    console.log('Sent', event.target);
    event.preventDefault();
    axios.post('/api/register', this.state)
      .then(res => {
        const token = res.data.token;
        Auth.setToken(token);
        this.props.history.push('/users');
      })
      .catch(err => console.log('There was an error', err));
  }

  render() {
    return (
      <section>
        <form onSubmit={this.handleSubmit}>

          <div className="field">
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.handleChange}/>
          </div>

          <div className="field">
            <input
              name="dateOfBirth"
              type="date"
              value={this.state.dateOfBirth}
              onChange={this.handleChange}
            />
          </div>

          <div className="field">
            <input
              name="postcode"
              type="text"
              placeholder="Postcode"
              value={this.state.postcode}
              onChange={this.handleChange}
            />
          </div>

          <div className="field">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="field">
            <input
              name="password"
              type={this.state.passwordHidden ? 'password' : 'text'}
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <p>Your password must be at least 8 characters long, and contain at least one lower case letter, upper case letter, and number.</p>
          </div>

          <div className="field">
            <input
              name="passwordConfirmation"
              type={this.state.passwordHidden ? 'password' : 'text'}
              placeholder="Confirm Password"
              value={this.state.passwordConfirmation}
              onChange={this.handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="gender">Please select your gender</label>
            {this.state.genders.map((gender, index) =>
              <div key={index}>
                <input type="radio" name="gender" value={gender.value} onChange={this.handleChange}/>
                <label>{gender.label}</label>
              </div>
            )}
          </div>

          <div className="field">
            <label htmlFor="sexuality">Please select who you are interested in meeting on Orbital</label>
            <input name="sexuality" type="checkbox" value="men" onChange={this.handleChange} /> Men
            <input name="sexuality" type="checkbox" value="women" onChange={this.handleChange} /> Women
            <input name="sexuality" type="checkbox" value="transgender" onChange={this.handleChange} /> Transgender People
            <input name="sexuality" type="checkbox" value="non-binary" onChange={this.handleChange} /> Non-Binary People
            <input name="sexuality" type="checkbox" value="other" onChange={this.handleSChange} /> Other
          </div>

          <div className="field">
            <input
              name="minAgeRange"
              type="number"
              min="18"
              placeholder="min age"
              value={this.state.minAgeRange}
              onChange={this.handleChange}
            />
          </div>

          <div className="field">
            <input
              name="maxAgeRange"
              type="number"
              min="19"
              placeholder="max age"
              value={this.state.maxAgeRange}
              onChange={this.handleChange}
            />
          </div>

          <div className="field">
            <input
              name="occupation"
              type="text"
              placeholder="Occupation"
              value={this.state.occupation}
              onChange={this.handleChange}
            />
          </div>

          <div className="field">
            <input
              name="profilePic"
              type="text"
              placeholder="Profile Picture (URL)"
              value={this.state.profilePic}
              onChange={this.handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="languages">What other languages do you speak?</label>
            <input name="languages" type="checkbox" value="Welsh" onChange={this.handleChange} /> Welsh
            <input name="languages" type="checkbox" value="French" onChange={this.handleChange} /> French
            <input name="languages" type="checkbox" value="Spanish" onChange={this.handleChange} /> Spanish
            <input name="languages" type="checkbox" value="Portuguese" onChange={this.handleChange} /> Portuguese
            <input name="languages" type="checkbox" value="Italian" onChange={this.handleChange} /> Italian
            <input name="languages" type="checkbox" value="German" onChange={this.handleChange} /> German
          </div>

          <div className="field">
            <input
              name="bio"
              type="text"
              placeholder="Bio"
              value={this.state.bio}
              onChange={this.handleChange}
            />
          </div>

          <button>Sign Up</button>

        </form>
        <button onClick={this.togglePasswordShow}>👁</button>
      </section>
    );
  }
}
