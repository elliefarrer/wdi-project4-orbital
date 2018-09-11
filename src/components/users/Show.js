import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import moment from 'moment';

// Components
import Location from './common/Location';

// libraries
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

export default class UsersShow extends React.Component {
  state = {
    apikey: 'DmK3IjydVb4R9lDw3X08xjNBNVV0WOks',
    nominatimPostcode: '',
    distance: ''
  }

  componentDidMount = () => {
    axios.get(`/api/users/${this.props.match.params.userId}`, Auth.bearerHeader())
      .then(res => this.setState({ user: res.data }));
  }


  getPostcode = postcodeToSearch => {
    if(this.state.user) {
      axios.get(`https://nominatim.openstreetmap.org/search/${postcodeToSearch}?format=json`)
        .then(res => this.setState({ nominatimPostcode: res.data }));
    }
  }

  getDistance = (startpoint, endpoint) => {
    if(this.state.user) {
      axios.get('https://www.mapquestapi.com/directions/v2/optimizedroute', {
        params: {
          key: this.state.apikey,
          from: startpoint,
          to: endpoint
        }
      })
        .then(res => this.setState({ distance: res.data }));
    }
  }

  handleSwipe = event => {
    event.preventDefault();
    const swipeData = {
      userId: event.target.name,
      status: event.target.value,
      timestamps: Date.now()
    };
    axios.post(`/api/users/${Auth.currentUserId()}/swipes`, swipeData, Auth.bearerHeader())
      .then(res => this.setState({ currentUser: res.data }))
      .then(() => this.props.history.push('/users'))
      .catch(err => console.log(err));
  }

  logOut = () => {
    Auth.removeToken();
    Flash.setMessage('neutral', 'Goodbye! Hope to see you again soon...');
    this.props.history.push('/');
  }

  deleteProfile = () => {
    axios.delete(`/api/users/${this.props.match.params.userId}`, Auth.bearerHeader())
      .then(() => this.props.history.push('/'));
    Auth.removeToken();
    Flash.setMessage('neutral', 'Sorry to see you go! Hope to see you back again one day...');
  }

  render() {
    if(this.state.user && !this.state.nominatimPostcode) {
      this.getPostcode(this.state.user.postcode);
    }

    if(this.state.user && !this.state.distance) {
      this.getDistance(Auth.currentPostcode(), this.state.user.postcode);
    }

    const user = this.state.user;
    console.log('State is', this.state);

    console.log('Last place visited was', this.props);

    //IDEA: to get route to go back to, stick the current on the button to go into props for the next one. Then do a .contains()/.includes function

    return (
      <section>
        {this.state.user &&
          <div>
            <img src={user.profilePic} alt={user.firstName} />

            <Link to="/users"><i className="fas fa-angle-double-up"></i></Link>

            <div className="buttons">
              <div className="column-1of2">
                <button name={user._id} value="left" onClick={this.handleSwipe}>✖️</button>
              </div>
              <div className="column-2of2">
                <button name={user._id} value="right" onClick={this.handleSwipe}>💖</button>
              </div>
            </div>

            <h2>{user.firstName}, {moment().diff(user.dateOfBirth, 'years')}</h2>
            <p>{user.occupation}</p>
            {this.state.nominatimPostcode && this.state.distance &&
              <Location
                getPostcode={this.getPostcode}
                currentFirstName={Auth.currentFirstName()}
                currentPostcode={Auth.currentPostcode()}
                userOptions={this.state.user}
                postcode={this.state.nominatimPostcode}
                distance={this.state.distance}
              />
            }

            <p>{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}, looking for a {user.sexuality}</p>

            <h2>About {user.firstName}</h2>
            <p>{user.bio}</p>
            <p>Languages:
              {user.languages.map((language, index) =>
                <span key={index}>{language}</span>
              )}
            </p>

            {Auth.isAuthenticated() &&
              <div>
                <Link to={`/users/${Auth.currentUserId()}/edit`}>Edit Profile</Link>
                <a onClick={this.logOut}>Log out {Auth.currentFirstName()}</a>
                <a onClick={this.deleteProfile}>Delete Profile</a>
              </div>
            }
          </div>
        }

      </section>
    );
  }
}
