import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import moment from 'moment';

// libraries
import Auth from '../../lib/Auth';

export default class UsersShow extends React.Component {
  state = {}

  componentDidMount = () => {
    axios.get(`/api/users/${this.props.match.params.userId}`)
      .then(res => this.setState({ user: res.data }));
  }

  handleSwipe = event => {
    event.preventDefault();
    const swipeData = {
      userId: event.target.name,
      status: event.target.value,
      timestamps: Date.now()
    };
    axios.post(`/api/users/${Auth.currentUserId()}/swipes`, swipeData)
      .then(res => this.setState({ currentUser: res.data }))
      .then(() => this.props.history.push('/users'))
      .catch(err => console.log(err));
  }

  logOut = () => {
    Auth.removeToken();
    this.props.history.push('/');
  }

  deleteProfile = () => {
    axios.delete(`/api/users/${this.props.match.params.userId}`, Auth.bearerHeader())
      .then(() => this.props.history.push('/'));
    Auth.removeToken();
  }

  render() {
    const user = this.state.user;
    return (
      <section>
        {this.state.user &&
          <div>
            <img src={user.profilePic} alt={user.firstName} />

            {/* make this link look like a button */}
            <Link to="/users">Back</Link>

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
            <p>{user.postcode}</p>
            <p>{user.sexuality} {user.gender}</p>

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
