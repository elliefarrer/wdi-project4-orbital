import React from 'react';
import axios from 'axios';

// Components
import ErrorMessage from '../common/ErrorMessage';

// libraries
import Auth from '../../lib/Auth';

export default class UsersEdit extends React.Component {
  state = {
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

    password: '',
    sexuality: [],
    languages: [],

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

  handleSubmit = event => {
    console.log('Sent', event.target);
    event.preventDefault();
    // if(this.state.password !== this.state.passwordConfirmation) {
    //   const errors = this.state.errors;
    //   errors.passwordConfirmation = 'Passwords do not match';
    //   return this.state({ errors });
    // }
    axios.put(`/api/users/${Auth.currentUserId()}`, this.state, Auth.bearerHeader())
      .then(() => {
        this.props.history.push(`/users/${Auth.currentUserId()}`);
      })
      .catch(err => {
        const oldErrors = this.state.errors;
        const newErrors = err.response.data.errors;
        const errors = { ...oldErrors, ...newErrors };
        this.setState({ errors });
      });
  }

  clearArrays = () => {
    const newState = this.state;
    newState.sexuality = [];
    newState.languages = [];
  }

  handleSexualityChange = event => {
    // const newState = this.state;
    // newState.sexuality = [];
    console.log('Handle change fired', event.target.name, event.target.value);
    // const name = event.target.name;
    const value = event.target.value;
    const errors = this.state.errors;
    delete errors['sexuality'];
    this.state.sexuality.push(value);
  }

  handleLanguageChange = event => {
    // const newState = this.state;
    // newState.languages = [];
    console.log('Handle change fired', event.target.name, event.target.value);
    const value = event.target.value;
    const errors = this.state.errors;
    delete errors['languages'];
    this.state.languages.push(value);
  }

  componentDidMount() {
    console.log('match params is', this.props);
    axios.get(`/api/users/${Auth.currentUserId()}`, Auth.bearerHeader())
      .then(res => this.setState( res.data ));

    if(this.state.sexuality && this.state.languages) {
      this.clearArrays();
    }
  }

  render() {
    const state = this.state;
    return (
      <section>
        {state.firstName &&
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                value={state.firstName || ''}
                onChange={this.handleChange}
              />
            </div>
            <ErrorMessage error={this.state.errors.firstName}/>


            <div className="field">
              <input
                name="dateOfBirth"
                type="date"
                value={this.state.dateOfBirth || ''}
                onChange={this.handleChange}
              />
            </div>
            <ErrorMessage error={this.state.errors.dateOfBirth}/>

            <div className="field">
              <input
                name="postcode"
                type="text"
                placeholder="Postcode"
                value={this.state.postcode || ''}
                onChange={this.handleChange}
              />
            </div>
            <ErrorMessage error={this.state.errors.postcode}/>

            <div className="field">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <ErrorMessage error={this.state.errors.email}/>


            <div className="field">
              <label htmlFor="gender">Please select your gender</label>
              {this.state.genders.map((gender, index) =>
                <div key={index}>
                  <input type="radio" name="gender" value={gender.value} onChange={this.handleChange}/>
                  <label>{gender.label}</label>
                </div>
              )}
            </div>
            <ErrorMessage error={this.state.errors.gender}/>

            <div className="field">
              <label htmlFor="sexuality">Please select who you are interested in meeting on Orbital</label>
              {this.state.sexualityCheckboxes.map((sexuality, index) =>
                <div key={index}>
                  <input type="checkbox" name="sexuality" value={sexuality.value} onChange={this.handleSexualityChange}/>
                  <label>{sexuality.label}</label>
                </div>
              )}
            </div>
            <ErrorMessage error={this.state.errors.sexuality}/>

            <div className="field">
              <input
                name="occupation"
                type="text"
                placeholder="Occupation"
                value={this.state.occupation || ''}
                onChange={this.handleChange}
              />
            </div>
            <ErrorMessage error={this.state.errors.occupation}/>

            <div className="field">
              <input
                name="profilePic"
                type="text"
                placeholder="Profile Picture (URL)"
                value={this.state.profilePic || ''}
                onChange={this.handleChange}
              />
            </div>
            <ErrorMessage error={this.state.errors.profilePic}/>

            <div className="field">
              <label htmlFor="languages">What other languages do you speak?</label>
              {this.state.languageOptions.map((language, index) =>
                <div key={index}>
                  <input type="checkbox" name="language" value={language.value} onChange={this.handleLanguageChange}/>
                  <label>{language.label}</label>
                </div>
              )}
            </div>
            <ErrorMessage error={this.state.errors.languages}/>

            <div className="field">
              <label>{this.state.bio.length}/250</label>
              <input
                name="bio"
                type="text"
                placeholder="Bio"
                value={this.state.bio || ''}
                onChange={this.handleChange}
              />
            </div>
            <ErrorMessage error={this.state.errors.bio}/>

            <button>Edit Profile</button>

          </form>
        }
      </section>
    );
  }
}

//IDEA: create a form component in common and use it in both Register and UsersEdit
