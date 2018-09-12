import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//IDEA: use moment to send timestamp with state on swipe
import moment from 'moment';

// Components
// import SwipeButtons from '../common/SwipeButtons';
// import Footer from '../common/Footer';

// libraries
import Auth from '../../lib/Auth';
import LocalStorage from '../../lib/LocalStorage';


export default class UsersIndex extends React.Component {
  state = {
    usersArrayIndex: LocalStorage.getItem('usersArrayIndex') || 0
  }

  handleSwipe = event => {
    console.log('Swiped', event.target.name, event.target.value);
    event.preventDefault();
    const swipeData = {
      userId: event.target.name,
      status: event.target.value,
      timestamps: Date.now()
    };
    axios.post(`/api/users/${Auth.currentUserId()}/swipes`, swipeData, Auth.bearerHeader())
      .then(res => this.setState({ currentUser: res.data }))
      .catch(err => console.log(err));

    this.changeUser();
  }

  changeUser = () => {
    const newState = this.state;
    this.setState({ usersArrayIndex: newState.usersArrayIndex + 1 });
  }

  setBackButton = () => {
    console.log('This works', this.state.usersArrayIndex);
    LocalStorage.setItem('usersArrayIndex', this.state.usersArrayIndex);
  }

  componentDidMount = () => {
    console.log('component mounted');
    axios.get('/api/users', Auth.bearerHeader())
      .then(res => this.setState({ users: res.data }));
  }

  render() {

    return (
      <section className="users-index centered-text">
        {this.state.users && this.state.usersArrayIndex < this.state.users.length &&
          <div className="to-swipe">
            <div className="polaroid">
              <div className="polaroid-body">
                <img src={this.state.users[this.state.usersArrayIndex].profilePic} alt={this.state.users[this.state.usersArrayIndex].firstName}/>
                <Link onClick={this.setBackButton} to={`/users/${this.state.users[this.state.usersArrayIndex]._id}`}>
                  <i className="fas fa-info-circle over-image bottom-right"></i>
                </Link>
              </div>
              <div className="polaroid-footer">
                <h2>{this.state.users[this.state.usersArrayIndex].firstName}, {moment().diff(this.state.users[this.state.usersArrayIndex].dateOfBirth, 'years')}</h2>
                <h4>{this.state.users[this.state.usersArrayIndex].occupation}</h4>
              </div>
            </div>



            <div className="buttons">
              <div className="column-1of2">
                <button className="swipe-button" name={this.state.users[this.state.usersArrayIndex]._id} value="left" onClick={this.handleSwipe}>✕</button>
              </div>
              <div className="column-2of2">
                <button className="swipe-button" name={this.state.users[this.state.usersArrayIndex]._id} value="right" onClick={this.handleSwipe}>♥︎</button>
              </div>
            </div>
          </div>

        }

        {this.state.users && this.state.usersArrayIndex === this.state.users.length &&
          <div className="polaroid">
            <div className="polaroid-body">
              <h2 className="end-of-swipes">Sorry! There are no more people here. Maybe try again later?</h2>
            </div>
          </div>
        }

        {/* <Footer /> */}
      </section>
    );
  }
}
