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

  logOut = () => {
    Auth.removeToken();
    this.props.history.push('/');
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

            <Link to={`/users/${Auth.currentUserId()}/edit`}>Edit Profile</Link>
            {Auth.isAuthenticated() &&
              <a onClick={this.logOut}>Log out {Auth.currentFirstName()}</a>
            }
          </div>
        }

      </section>
    );
  }
}
