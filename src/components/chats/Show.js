import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Auth from '../../lib/Auth';

export default class ChatsShow extends React.Component {
  state = {}

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

  componentDidMount = () => {
    axios.get(`/api/users/${Auth.currentUserId()}/chats/${this.props.match.params.chatId}`)
      .then(res => this.setState({ chat: res.data }));

    this.getOtherUser();
  }

  render() {
    const messagedUser = this.getOtherUser(this.state.chats);
    console.log('Messaged user is', messagedUser);
    console.log('State is', this.state);
    return (
      <section className="chat-show">
        {this.state.chat &&
          <div>
            <Link to={`/users/${this.state.chat.userToDisplay._id}`}>
              <img src={this.state.chat.userToDisplay.profilePic} alt={this.state.chat.userToDisplay.firstName} />
              <p>{this.state.chat.userToDisplay.firstName}</p>
            </Link>
            <hr />
            {this.state.chat.messages.map(message =>
              <div key={message._id}>
                <div>
                  <img className="thumbnail" src={message.sentBy.profilePic} alt={message.sentBy.firstName} />
                </div>
                <div className="message-bubble">
                  <p>{message.content}</p>
                  <p>{message.timestamps}</p>
                </div>
              </div>
            )}
          </div>
        }
      </section>
    );
  }
}
