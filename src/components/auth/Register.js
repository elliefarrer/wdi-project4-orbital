import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

// Components
import ErrorMessage from '../common/ErrorMessage';

// libraries
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';


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

    sexualityCheckboxes: [
      {label: 'Men', value: 'man'},
      {label: 'Women', value: 'woman'},
      {label: 'Transgender', value: 'transgender'},
      {label: 'Non-Binary', value: 'non-binary'},
      {label: 'Other', value: 'other'}
    ],

    languageOptions: [
      {label: 'Welsh', value: 'Welsh'},
      {label: 'French', value: 'French'},
      {label: 'Spanish', value: 'Spanish'},
      {label: 'Portuguese', value: 'Portuguese'},
      {label: 'Italian', value: 'Italian'},
      {label: 'German', value: 'German'},
      {label: 'Dutch', value: 'Dutch'},
      {label: 'Polish', value: 'Polish'},
      {label: 'Russian', value: 'Russian'},
      {label: 'Greek', value: 'Greek'},
      {label: 'Turkish', value: 'Turkish'},
      {label: 'Hebrew', value: 'Hebrew'},
      {label: 'Arabic', value: 'Arabic'},
      {label: 'Mandarin', value: 'Mandarin'},
      {label: 'Japanese', value: 'Japanese'},
      {label: 'Hindi', value: 'Hindi'},
      {label: 'Urdu', value: 'Urdu'}
    ],

    firstName: 'Molly',
    dateOfBirth: '1998-09-09',
    email: 'molly@platyp.com',
    password: 'Pass1234',
    passwordConfirmation: 'Pass1234',
    postcode: 'E1 1DB',
    sexuality: [],
    minAgeRange: 21,
    maxAgeRange: 24,
    profilePic: 'https://i.imgur.com/Bp9yrkl.png',
    occupation: 'Student',
    languages: [],
    bio: 'History student at QMUL, originally from Essex. Part time model but I love pizza more than anything!',
    extraPhotos: [],

    errors: {

    }
  }


  handleChange = event => {
    console.log('Handle change fired', event.target.name, event.target.value);
    const { target: { name, value }} = event;
    const errors = this.state.errors;
    delete errors[name];
    this.setState({ [name]: value });
  }

  handleSexualityChange = event => {
    console.log('Handle change fired', event.target.name, event.target.value);
    // const name = event.target.name;
    const value = event.target.value;
    const errors = this.state.errors;
    delete errors['sexuality'];
    this.state.sexuality.push(value);
  }

  handleLanguageChange = event => {
    console.log('Handle change fired', event.target.name, event.target.value);
    const value = event.target.value;
    const errors = this.state.errors;
    delete errors['languages'];
    this.state.languages.push(value);
  }

  handleExtraPhotoChange = event => {
    console.log('Handle change fired', event.target.name, event.target.value);
    const value = event.target.value;
    const errors = this.state.errors;
    delete errors['extraPhotos'];
    this.state.extraPhotos.push(value);
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
    if(this.state.password !== this.state.passwordConfirmation) {
      const errors = this.state.errors;
      errors.passwordConfirmation = 'Passwords do not match';
      return this.state({ errors });
    }
    axios.post('/api/register', this.state)
      .then(res => {
        const token = res.data.token;
        Auth.setToken(token);
        Flash.setMessage('neutral', `Welcome to Orbital, ${Auth.currentFirstName()}!`);
        this.props.history.push('/users');
      })
      .catch(err => {
        const oldErrors = this.state.errors;
        const newErrors = err.response.data.errors;
        const errors = { ...oldErrors, ...newErrors };
        this.setState({ errors });
      });
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
          <ErrorMessage error={this.state.errors.firstName} />

          <div className="field">
            <input
              name="dateOfBirth"
              type="date"
              value={this.state.dateOfBirth}
              onChange={this.handleChange}
            />
          </div>
          <ErrorMessage error={this.state.errors.dateOfBirth} />

          <div className="field">
            <input
              name="postcode"
              type="text"
              placeholder="Postcode"
              value={this.state.postcode}
              onChange={this.handleChange}
            />
          </div>
          <ErrorMessage error={this.state.errors.postcode} />

          <div className="field">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <ErrorMessage error={this.state.errors.email} />

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
          <ErrorMessage error={this.state.errors.password} />

          <div className="field">
            <input
              name="passwordConfirmation"
              type={this.state.passwordHidden ? 'password' : 'text'}
              placeholder="Confirm Password"
              value={this.state.passwordConfirmation}
              onChange={this.handleChange}
            />
          </div>
          <ErrorMessage error={this.state.errors.passwordConfirmation} />

          <div className="field">
            <label htmlFor="gender">Please select your gender</label>
            {this.state.genders.map((gender, index) =>
              <div key={index}>
                <input type="radio" name="gender" value={gender.value} onChange={this.handleChange}/>
                <label>{gender.label}</label>
              </div>
            )}
          </div>
          <ErrorMessage error={this.state.errors.gender} />

          <div className="field">
            <label htmlFor="sexuality">Please select who you are interested in meeting on Orbital</label>
            {this.state.sexualityCheckboxes.map((sexuality, index) =>
              <div key={index}>
                <input type="checkbox" name="sexuality" value={sexuality.value || ''} onChange={this.handleSexualityChange}/>
                <label>{sexuality.label}</label>
              </div>
            )}
          </div>
          <ErrorMessage error={this.state.errors.sexuality} />

          <div className="field">
            <input
              name="occupation"
              type="text"
              placeholder="Occupation"
              value={this.state.occupation}
              onChange={this.handleChange}
            />
          </div>
          <ErrorMessage error={this.state.errors.occupation} />

          <div className="field">
            <input
              name="profilePic"
              type="text"
              placeholder="Profile Picture (URL)"
              value={this.state.profilePic}
              onChange={this.handleChange}
            />
          </div>
          <ErrorMessage error={this.state.errors.profilePic} />

          <div className="field">
            <label htmlFor="languages">What other languages do you speak?</label>
            {this.state.languageOptions.map((language, index) =>
              <div key={index}>
                <input type="checkbox" name="language" value={language.value || ''} onChange={this.handleLanguageChange}/>
                <label>{language.label}</label>
              </div>
            )}
          </div>
          <ErrorMessage error={this.state.errors.languages} />

          <div className="field">
            <label>{this.state.bio.length}/250</label>
            <input
              name="bio"
              type="text"
              placeholder="Bio"
              value={this.state.bio}
              onChange={this.handleChange}
            />
          </div>
          <ErrorMessage error={this.state.errors.bio} />

          <div className="field">
            <label htmlFor="extraPhotos">Add up to 4 more photos (URL)</label>
            <input
              name="extraPhotos"
              type="text"
              placeholder="Photo (URL)"
              value={this.state.extraPhotos[0] || ''}
              onChange={this.handleExtraPhotoChange}
            />

            <input
              name="extraPhotos"
              type="text"
              placeholder="Photo (URL)"
              value={this.state.extraPhotos[1] || ''}
              onChange={this.handleExtraPhotoChange}
            />

            <input
              name="extraPhotos"
              type="text"
              placeholder="Photo (URL)"
              value={this.state.extraPhotos[2] || ''}
              onChange={this.handleExtraPhotoChange}
            />

            <input
              name="extraPhotos"
              type="text"
              placeholder="Photo (URL)"
              value={this.state.extraPhotos[3] || ''}
              onChange={this.handleExtraPhotoChange}
            />
          </div>

          <button>Sign Up</button>

        </form>
        <button onClick={this.togglePasswordShow}>👁</button>
      </section>
    );
  }
}
