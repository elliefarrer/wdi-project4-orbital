import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import querystring from 'query-string';

import _ from 'lodash';
import moment from 'moment';

// libraries
import Auth from '../../lib/Auth';

export default class ChatsIndex extends React.Component {
  state = {
    messaged: []
  };

  getOtherUser = () => {
    const currentUserId = Auth.currentUserId();
    console.log('gou chats are', this.state.chats);
    console.log('Logged in is', currentUserId);
    if(this.state.chats) {
      this.state.chats.forEach(chat => {
        if(currentUserId === chat.userOne._id) {
          this.state.messaged.push(chat.userTwo);
        } else {
          this.state.messaged.push(chat.userOne);
        }
        console.log('Messaged on state', this.state.messaged);
      });
    }
  }

  getMostRecentMessage = () => {
    console.log('Get this to work');
  }



  componentDidMount = () => {
    axios.get(`/api/users/${Auth.currentUserId()}/swipes`)
      .then(res => this.setState({ swipes: res.data }));

    axios.get(`/api/users/${Auth.currentUserId()}/chats`)
      .then(res => this.setState({ chats: res.data }));

  }

  //TODO: write a function to get the correct user, whether it's userOne or userTwo. Then call it below.

  //TODO: write a function to get the most recent message and cut it to the first c.50 characters



  render() {
    console.log('Swipes are', this.state.swipes);
    console.log('Chats are', this.state.chats);

    //BUG: sometimes messages load for a second time, must be due to asynchronicity
    const messagedUsers = this.getOtherUser(this.state.chats);
    console.log('Messaged users are', messagedUsers);

    console.log('Recent messages are', this.getMostRecentMessage());

    return (
      <section className="chats-index">
        <div>
          <h2>Matches</h2>
          <div className="matches">
            {this.state.swipes && this.state.swipes.map((swipe, index) =>
              <div className="match" key={index} to={`/users/${swipe.userId._id}`}>
                <img src={swipe.userId.profilePic} alt={swipe.userId.firstName} />
                <Link to={`/users/${swipe.userId._id}`}>
                  <i className="fas fa-info-circle"></i>
                </Link>
                <p>{swipe.userId.firstName}</p>
              </div>
            )}
          </div>
        </div>

        <h2>Chats</h2>
        <div className="chats-section">
          {this.state.messaged && this.state.messaged.map(user =>
            <div className="chat-container" key={user._id}>
              <div className="column-1of2">
                <img src={user.profilePic} alt={user.firstName} />
              </div>
              <div className="column-2of2">
                <h3>{user.firstName}</h3>
              </div>
              <hr />
            </div>
          )}
        </div>
      </section>
    );
  }
}
