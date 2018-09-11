import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//IDEA: use moment to send timestamp with state on swipe
import moment from 'moment';

// Components
import SwipeButtons from '../common/SwipeButtons';

// libraries
import Auth from '../../lib/Auth';


export default class UsersIndex extends React.Component {
  state = {
    nominatimPostcodes: []
  }

  // IDEA: create an empty postcodes array in state. Then do a forEach/map to search for all of them and push the towns to the array.
  getPostcode = postcodeToSearch => {
    if(this.state.users) {
      axios.get(`https://nominatim.openstreetmap.org/search/${postcodeToSearch}?format=json`)
        .then(res => this.setState({ nominatimPostcode: res.data }));
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
      .catch(err => console.log(err));
  }

  componentDidMount = () => {
    console.log('component mounted');
    axios.get('/api/users', Auth.bearerHeader())
      .then(res => this.setState({ users: res.data }));
  }

  render() {

    return (
      <section className="users-index centered-text">
        {this.state.users && this.state.users.map(user =>
          <div key={user._id} >
            <div className="polaroid">
              <img className="polaroid-body" src={user.profilePic} alt={user.firstName} />
              <Link to={`/users/${user._id}`}>
                <i className="fas fa-info-circle"></i>
              </Link>
              <div className="polaroid-footer">
                <h2>{user.firstName}, {moment().diff(user.dateOfBirth, 'years')}</h2>
                <h4>{user.occupation}</h4>
              </div>
            </div>

            <SwipeButtons
              handleSwipe={this.handleSwipe}
              user={this.state.users}
            />
          </div>
        )}

      </section>
    );
  }
}
