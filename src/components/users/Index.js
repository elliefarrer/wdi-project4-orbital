import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//IDEA: use moment to send timestamp with state on swipe
import moment from 'moment';

// libraries
import Auth from '../../lib/Auth';

//IDEA: can I filter by sexuality and age range in back end? Or use a query string here to filter? Can you add params to axios like with $http in Angular?
export default class UsersIndex extends React.Component {
  state = {}

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
                <h4>{user.postcode}</h4>
              </div>
            </div>

            <div className="buttons">
              <div className="column-1of2">
                <button name={user._id} value="left" onClick={this.handleSwipe}>✖️</button>
              </div>
              <div className="column-2of2">
                <button name={user._id} value="right" onClick={this.handleSwipe}>💖</button>
              </div>
            </div>
          </div>
        )}

      </section>
    );
  }
}
