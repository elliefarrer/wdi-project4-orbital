import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import querystring from 'query-string';

import _ from 'lodash';
import moment from 'moment';

// libraries
import Auth from '../../lib/Auth';

// TODO: also, to fix timestamp bug (v. important for messaging), look at what you did in project 2 with pre validation and do the same there

//IDEA: save instagram and spotify usernames to seeds. Better to get user to put these in on the relevant parts of the showpage (a user edit). Otherwise have these on Register and UsersEdit

export default class ChatsIndex extends React.Component {
  state = {
    newChat: false
  };

  getOtherUser = () => {
    const currentUserId = Auth.currentUserId();
    if(this.state.chats) {
      this.state.chats.forEach(chat => {
        if(currentUserId === chat.userOne._id) {
          chat.userToDisplay = chat.userTwo;
        } else {
          chat.userToDisplay = chat.userOne;
        }
      });
    }
  }

  toggleNewChat = () => {
    const newChat = !this.state.newChat;
    this.setState({ newChat });
  }

  handleChange = event => {
    // console.log('event target id', event.target.id);
    const { target: { name, value }} = event;
    this.setState({ [name]: value, userTwo: event.target.id });
    console.log('state is now', this.state);
  }

  handleSubmit = event => {
    event.preventDefault();
    const chatData = {
      userOne: Auth.currentUserId(),
      userTwo: this.state.userTwo,
      messages: [
        {
          sentBy: {
            _id: Auth.currentUserId(),
            firstName: Auth.currentFirstName(),
            profilePic: Auth.currentProfilePic()
          },
          content: this.state.newMessage,
          timestamps: moment().format('YYYY-MM-DD HH:mm')
        }
      ]
    };
    console.log('chat data is', chatData);
    axios.post(`/api/users/${Auth.currentUserId()}/chats`, chatData)
      .then(res => this.setState({ chat: res.data, newChat: false, newMessage: '' }))
      .catch(err => console.log(err));
  }

  // from Rob: check that identical data is coming back with this.setState as to the axios request. If not, fiddle in the back end.
  handleUnmatch = userToUnmatch => {
    return () => {
      axios.delete(`/api/users/${Auth.currentUserId()}/swipes/${userToUnmatch}`)
        .then(res => this.setState({ swipes: res.data }))
        // .then(() => this.props.history.push(`/users/${Auth.currentUserId()}/chats}`))
        .catch(err => console.log(err));
    };
  }

  handleChatDelete = chatToDelete => {
    return () => {
      axios.delete(`/api/users/${Auth.currentUserId()}/chats/${chatToDelete}`)
        .then(res => this.setState({ chats: res.data }))
        .catch(err => console.log(err));
    };
  }

  orderChats = (chats) => {
    const timestamps = chats.map(chat => chat.messages[chat.messages.length-1].timestamps);
    console.log('timestamps are', timestamps);
    return _.sortBy(timestamps).reverse();
  }

  componentDidMount = () => {
    axios.get(`/api/users/${Auth.currentUserId()}/swipes`)
      .then(res => this.setState({ swipes: res.data }));

    axios.get(`/api/users/${Auth.currentUserId()}/chats`)
      .then(res => this.setState({ chats: res.data }));
  }



  render() {
    //BUG: sometimes messages load for a second time, must be due to asynchronicity
    const messagedUsers = this.getOtherUser(this.state.chats);
    console.log('Messaged users are', messagedUsers);
    console.log('swipes are', this.state.swipes);
    let sortedChats;

    if(this.state.chats) {
      sortedChats = this.orderChats(this.state.chats);
      console.log('sorted chats are', sortedChats);
    }

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
                <i id={swipe.userId._id} className="fas fa-comments" onClick={this.toggleNewChat}></i>
                <p>{swipe.userId.firstName}</p>
                <a onClick={this.handleUnmatch(swipe._id)}>Unmatch</a>

                {this.state.newChat &&
                  <form onSubmit={this.handleSubmit}>
                    <div className="field">
                      <textarea id={swipe.userId._id} name="newMessage" type="text" placeholder="Type a message..." value={this.state.newMessage || ''} onChange={this.handleChange}></textarea>
                      <button id={swipe.userId._id}>Send</button>
                    </div>
                  </form>
                }
              </div>
            )}
          </div>
        </div>

        <h2>Chats</h2>
        <div className="chats-section">
          {sortedChats && this.state.chats.map(chat =>
            <div key={chat._id}>
              <Link className="chat-container"  to={`/users/${Auth.currentUserId()}/chats/${chat._id}`}>
                <div className="column-1of2">
                  {/* <p>{chat}</p> */}
                  <img src={chat.userToDisplay.profilePic} alt={chat.userToDisplay.firstName}   />
                </div>
                <div className="column-2of2">
                  <h3>{chat.userToDisplay.firstName}</h3>
                  <p>{chat.messages[chat.messages.length-1].sentBy.firstName}:  {chat.messages[chat.messages.length-1].content}</p>
                  <p>Sent on {chat.messages[chat.messages.length-1].timestamps}</p>
                </div>
                <hr />
              </Link>
              <a onClick={this.handleChatDelete(chat._id)}>Unmatch</a>
            </div>
          )}
        </div>
      </section>
    );
  }
}
