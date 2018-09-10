import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import moment from 'moment';

import Auth from '../../lib/Auth';

export default class ChatsShow extends React.Component {
  state = {
    messageContainerClass: ''
  }

  getOtherUser = () => {
    const newState = this.state.chat;
    const currentUserId = Auth.currentUserId();
    console.log('gou chats are', this.state.chat);
    console.log('Logged in is', currentUserId);
    if(newState) {
      if(currentUserId === newState.userOne._id) {
        newState.userToDisplay = newState.userTwo;
      } else {
        newState.userToDisplay = newState.userOne;
      }
    }
  }

  handleChange = event => {
    // this.getOtherUser();
    console.log('Event fired', event.target.name, event.target.value);
    const { target: { name, value }} = event;
    this.setState({ [name]: value });
    console.log('State is now', this.state);
  }

  handleSubmit = event => {
    event.preventDefault();
    const chatId = this.props.match.params.chatId;
    const messageData = {
      sentBy: {
        _id: Auth.currentUserId(),
        firstName: Auth.currentFirstName(),
        profilePic: Auth.currentProfilePic()
      },
      content: this.state.newMessage,
      timestamps: moment().format('YYYY-MM-DD HH:mm')
    };
    console.log('message data is', messageData);
    axios.post(`/api/users/${Auth.currentUserId()}/chats/${chatId}`, messageData, Auth.bearerHeader())
      .then(res => this.setState({ chat: res.data, newMessage: '' }))
      .then(() => this.getOtherUser())
      .catch(err => console.log(err));
  }

  handleChatDelete = chatToDelete => {
    return () => {
      axios.delete(`/api/users/${Auth.currentUserId()}/chats/${chatToDelete}`, Auth.bearerHeader())
        .then(res => this.setState({ chats: res.data }))
        .then(() => this.props.history.push(`/users/${Auth.currentUserId()}/chats`))
        .catch(err => console.log(err));
    };
  }

  setMessageStyle = (sentById) => {
    const newState = this.state;
    newState.messageContainerClass = '';
    if (sentById === Auth.currentUserId()) {
      newState.messageContainerClass = 'current-user';
    } else {
      newState.messageContainerClass = 'other-user';
    }
  }

  componentDidMount = () => {
    axios.get(`/api/users/${Auth.currentUserId()}/chats/${this.props.match.params.chatId}`, Auth.bearerHeader())
      .then(res => this.setState({ chat: res.data }));

    this.getOtherUser();
  }

  // componentDidUpdate = () => {
  //   this.getOtherUser();
  // }

  render() {
    const messagedUser = this.getOtherUser(this.state.chats);
    console.log('Messaged user is', messagedUser);

    const currentChat = this.state.chat;
    return (
      <section className="chat-show">
        {currentChat &&
          <div>
            <Link to={`/users/${currentChat.userToDisplay._id}`}>
              <img src={currentChat.userToDisplay.profilePic} alt={currentChat.userToDisplay.firstName} />
              <p>{currentChat.userToDisplay.firstName}</p>
            </Link>
            <a onClick={this.handleChatDelete(currentChat._id)}>Unmatch</a>
            <hr />


            {currentChat.messages.map(message =>
              <div key={message._id}>

                {this.setMessageStyle(message.sentBy._id)}

                <div className={`message-container ${this.state.messageContainerClass}`}>
                  <div>
                    <img className="thumbnail" src={message.sentBy.profilePic} alt={message.sentBy.firstName} />
                    <p>{message.sentBy.firstName}</p>
                  </div>
                  <div className="message-bubble">
                    <p>{message.content}</p>
                    <p>{message.timestamps}</p>
                  </div>
                </div>
              </div>
            )}

            {/* NEW MESSAGE FORM */}
            <div className="message-form">
              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <textarea name="newMessage" type="text" placeholder="Type a message..." value={this.state.newMessage || ''} onChange={this.handleChange}></textarea>
                  <button>Send</button>
                </div>
              </form>
            </div>
          </div>
        }
      </section>
    );
  }
}
