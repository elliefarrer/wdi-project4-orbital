import React from 'react';
import axios from 'axios';

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
    password: ''
  }

  handleChange = event => {
    console.log('Handle change fired', event.target.value);
    const { target: { name, value }} = event;
    this.setState({ [name]: value });
  }

  handleSubmit = event => {
    console.log('Sent', event.target);
    event.preventDefault();
    axios.put(`/api/users/${Auth.currentUserId()}`, this.state)
      .then(() => {
        this.props.history.push(`/users/${Auth.currentUserId()}`);
      })
      .catch(err => console.log('There was an error', err));
  }

  componentDidMount() {
    console.log('match params is', this.props);
    axios.get(`/api/users/${Auth.currentUserId()}`)
      .then(res => this.setState( res.data ));
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
                value={state.firstName}
                onChange={this.handleChange}
              />
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

            <button>Edit Profile</button>

          </form>
        }
      </section>
    );
  }
}

//IDEA: create a form component in common and use it in both Register and UsersEdit
