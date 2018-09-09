import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import querystring from 'query-string';

// import _ from 'lodash';
// import moment from 'moment';

// libraries
import Auth from '../../lib/Auth';

export default class ChatsIndex extends React.Component {
  state = {};

  getOtherUser = () => {
    const currentUserId = Auth.currentUserId();
    console.log('gou chats are', this.state.chats);
    console.log('Logged in is', currentUserId);
    if(this.state.chats) {
      this.state.chats.forEach(chat => {
        if(currentUserId === chat.userOne._id) {
          chat.userToDisplay = chat.userTwo;
        } else {
          chat.userToDisplay = chat.userOne;
        }
        console.log('Messaged on state', this.state.messaged);
      });
    }
  }

  getMostRecentMessage = () => {
    console.log('Get this to work');
  }

  // TODO: instead of pushing the relevant user to this.state.messaged. Push it to an array within this.state.chats. So it can be accessed along with other info about the chat. Like most recent message, timestamp, and chat ID.

  // TODO: also, to fix timestamp bug (v. important for messaging), look at what you did in project 2 with pre validation and do the same there

  //IDEA: save instagram and spotify usernames to seeds. Better to get user to put these in on the relevant parts of the showpage (a user edit). Otherwise have these on Register and UsersEdit


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
          {this.state.chats && this.state.chats.map(chat =>
            <Link className="chat-container" key={chat._id} to={`/users/${Auth.currentUserId()}/chats/${chat._id}`}>
              <div className="column-1of2">
                <img src={chat.userToDisplay.profilePic} alt={chat.userToDisplay.firstName} />
              </div>
              <div className="column-2of2">
                <h3>{chat.userToDisplay.firstName}</h3>
                <p>{chat.messages[chat.messages.length-1].sentBy.firstName}: {chat.messages[chat.messages.length-1].content}</p>
                <p>Sent on {chat.messages[chat.messages.length-1].timestamps}</p>
              </div>
              <hr />
            </Link>
          )}
        </div>
      </section>
    );
  }
}
