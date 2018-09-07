import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import moment from 'moment';

// libraries
// import Auth from '../../lib/Auth';

//IDEA: can I filter by sexuality and age range in back end? Or use a query string here to filter? Can you add params to axios like with $http in Angular?
export default class UsersIndex extends React.Component {
  state = {}

  componentDidMount = () => {
    console.log('component mounted');
    axios.get('/api/users')
      .then(res => this.setState({ users: res.data }));
  }

  render() {
    console.log('State is', this.state);
    return (
      <section className="users-index centered-text">
        {this.state.users && this.state.users.map(user =>
          <Link key={user._id} to={`/users/${user._id}`}>
            <div className="polaroid">
              <img className="polaroid-body" src={user.profilePic} alt={user.firstName} />
              <div className="polaroid-footer">
                <h2>{user.firstName}, {moment().diff(user.dateOfBirth, 'years')}</h2>
                <h4>{user.occupation}</h4>
                <h4>{user.postcode}</h4>
              </div>
            </div>

            <div className="buttons">
              <div className="column-1of2">
                <button>✖️</button>
              </div>
              <div className="column-2of2">
                <button>💖</button>
              </div>
            </div>
          </Link>
        )}

      </section>
    );
  }
}
