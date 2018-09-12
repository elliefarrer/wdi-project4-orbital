import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import querystring from 'query-string';

import moment from 'moment';

// components
// import Dropdown from '../common/Dropdown';

// libraries
import Auth from '../../lib/Auth';


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
          chat.userToDisplay = chat.userTwo;
        } else {
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

  componentDidMount = () => {
    axios.get(`/api/users/${Auth.currentUserId()}/swipes`, Auth.bearerHeader())
      .then(res => this.setState({ swipes: res.data }));

    axios.get(`/api/users/${Auth.currentUserId()}/chats`, Auth.bearerHeader())
      .then(res => this.setState({ chats: res.data }));
  }



  render() {
    //BUG: sometimes messages load for a second time, must be due to asynchronicity
    const messagedUsers = this.getOtherUser(this.state.chats);
    console.log('Messaged users are', messagedUsers);
    console.log('swipes are', this.state.swipes);

    //IDEA: for problematic textarea, change the name to the other user's ID. That way it should be possible to grab it out and do something with it to ensure only that one pops up.
    return (
      <section className="chats-index">
        <div>
          <h2>Matches</h2>
          <div className="matches">
            {this.state.swipes && this.state.swipes.map((swipe, index) =>
              <div className="match" key={index} to={`/users/${swipe.userId._id}`}>
                <img src={swipe.userId.profilePic} alt={swipe.userId.firstName} />

                <a onClick={this.toggleDropdown}><i className="fas fa-ellipsis-h"></i></a>

                {/* IDEA: ADD ANOTHER CONDITIONAL HERE TO CHECK FOR THE CORRECT USER ID SO ONLY ONE DROPDOWN HAPPENS */}
                {this.state.newDropdown &&
                  // <Dropdown
                  //   toggleNewChat={this.toggleNewChat}
                  //   handleUnmatch={this.handleUnmatch}
                  //   swipe={this.swipe}
                  // />
                  <div className="dropdown">
                    <div className="dropdown-option">
                      <Link to={`/users/${swipe.userId._id}`}><i className="fas fa-info-circle"></i> <span>View profile</span></Link>
                    </div>
                    <div className="dropdown-option">
                      <a id={swipe.userId._id} onClick={this.toggleNewChat}><i className="fas fa-comments" ></i> <span>Message</span> </a>
                    </div>
                    <div className="dropdown-option">
                      <a onClick={this.handleUnmatch(swipe._id)}><i className="fas fa-times"></i> <span>Unmatch</span></a>
                    </div>
                  </div>
                }

                {/* <Link to={`/users/${swipe.userId._id}`}>

                </Link>

                <p>{swipe.userId.firstName}</p>
                <a onClick={this.handleUnmatch(swipe._id)}>Unmatch</a> */}

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
          {this.state.chats && this.state.chats.map(chat =>
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
