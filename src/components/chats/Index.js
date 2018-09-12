import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import querystring from 'query-string';

import moment from 'moment';

// components
// import Dropdown from '../common/Dropdown';

// libraries
import Auth from '../../lib/Auth';
import LocalStorage from '../../lib/LocalStorage';


export default class ChatsIndex extends React.Component {
  state = {
    newChat: false,
    newDropdown: false
  };

  getOtherUser = () => {
    const currentUserId = Auth.currentUserId();
    if(this.state.chats) {
      this.state.chats.forEach(chat => {
        if(currentUserId === chat.userOne._id) {
          console.log('This runs');
          chat.userToDisplay = chat.userTwo;
        } else {
          console.log('This runs');
          chat.userToDisplay = chat.userOne;
        }
      });
    }
  }

  toggleDropdown = () => {
    const newDropdown = !this.state.newDropdown;
    this.setState({ newDropdown });
  }

  toggleNewChat = () => {
    //IDEA: can you get the other user's ID onto newChat somehow, onto the state?
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
    axios.post(`/api/users/${Auth.currentUserId()}/chats`, chatData, Auth.bearerHeader())
      .then(res => this.setState({ chat: res.data, newChat: false, newMessage: '' }))
      .catch(err => console.log(err));
  }

  handleUnmatch = userToUnmatch => {
    return () => {
      axios.delete(`/api/users/${Auth.currentUserId()}/swipes/${userToUnmatch}`, Auth.bearerHeader())
        .then(res => this.setState({ swipes: res.data }))
        // .then(() => this.props.history.push(`/users/${Auth.currentUserId()}/chats}`))
        .catch(err => console.log(err));
    };
  }

  handleChatDelete = chatToDelete => {
    return () => {
      axios.delete(`/api/users/${Auth.currentUserId()}/chats/${chatToDelete}`, Auth.bearerHeader())
        .then(res => this.setState({ chats: res.data }))
        .catch(err => console.log(err));
    };
  }

  setBackButton = () => {
    LocalStorage.setItem('lastPath', this.props.location.pathname);
  }

  componentDidMount = () => {
    axios.get(`/api/users/${Auth.currentUserId()}/swipes`, Auth.bearerHeader())
      .then(res => this.setState({ swipes: res.data }));

    axios.get(`/api/users/${Auth.currentUserId()}/chats`, Auth.bearerHeader())
      .then(res => this.setState({ chats: res.data }));
  }



  render() {
    console.log('Props are', this.props.location.pathname);

    //IDEA: for problematic textarea, change the name to the other user's ID. That way it should be possible to grab it out and do something with it to ensure only that one pops up.
    const messagedUsers = this.getOtherUser(this.state.chats);
    console.log('Messaged users are', messagedUsers);
    return (
      <section className="chats-index">
        <div>
          <h2>Matches</h2>
          <div className="matches">
            {this.state.swipes && this.state.swipes.map((swipe, index) =>
              <div className="match" key={index} to={`/users/${swipe.userId._id}`}>
                <img src={swipe.userId.profilePic} alt={swipe.userId.firstName} />
                <h5 className="match-name">{swipe.userId.firstName}</h5>

                <a onClick={this.toggleDropdown}><i className="fas fa-ellipsis-h dropdown-toggle"></i></a>

                {/* IDEA: ADD ANOTHER CONDITIONAL HERE TO CHECK FOR THE CORRECT USER ID SO ONLY ONE DROPDOWN HAPPENS */}
                {this.state.newDropdown &&
                  <div className="dropdown">
                    <div className="dropdown-option">
                      <Link to={`/users/${swipe.userId._id}`}><span>View profile</span></Link>
                    </div>
                    <div className="dropdown-option">
                      <a id={swipe.userId._id} onClick={this.toggleNewChat}><span>Message</span> </a>
                    </div>
                    <div className="dropdown-option">
                      <a onClick={this.handleUnmatch(swipe._id)}><span>Unmatch</span></a>
                    </div>
                  </div>
                }


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

            {!this.state.swipes &&
              <h2>You have no new matches. Swipe right on more people to get more!</h2>
            }
          </div>
        </div>

        <div className="chats-section">
          <h2>Chats</h2>
          {this.state.chats && this.state.chats.map(chat =>
            <div key={chat._id} className="chat-container">
              <Link className="message-show" to={`/users/${Auth.currentUserId()}/chats/${chat._id}`}>
                <div className="column-1of2">
                  <img className="thumbnail" src={chat.userToDisplay.profilePic} alt={chat.userToDisplay.firstName}   />
                </div>
                <div className="column-2of2">
                  <h3>{chat.userToDisplay.firstName}</h3>
                  <p className="last-message">{chat.messages[chat.messages.length-1].sentBy.firstName}:  {chat.messages[chat.messages.length-1].content}</p>
                  <p className="timestamps">Sent on {chat.messages[chat.messages.length-1].timestamps}</p>
                </div>
                {/* <hr /> */}
              </Link>
            </div>
          )}

          {!this.state.chats &&
            <h2>You have no current chats. Why not send a message to one of your chats, or swipe right on more people.</h2>
          }
        </div>
      </section>
    );
  }
}
