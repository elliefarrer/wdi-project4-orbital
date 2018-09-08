import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import querystring from 'query-string';

// libraries
import Auth from '../../lib/Auth';

export default class ChatsIndex extends React.Component {
  state = {};

  componentDidMount = () => {
    axios.get(`/api/users/${Auth.currentUserId()}/swipes`, {
      params: {
        status: 'right'
      }
    })
      .then(res => this.setState({ swipes: res.data }));

    axios.get(`/api/users/${Auth.currentUserId()}/chats`)
      .then(res => this.setState({ chats: res.data }));
  }

  //TODO: write a function to get the correct user, whether it's userOne or userTwo. Then call it below.

  //TODO: write a function to get the most recent message and cut it to the first c.50 characters

  //IDEA: add on users model, in swipes, a boolean of for mutual. Set it automatically to false. Then findById the swipee's swipes object. If our user is in there && status === right then change both of them to mutual=true. Else nothing. Then, on unmatch, findById the other person and change theirs to mutual=false. Or just delete their swipe too

  //TODO: next get the swipes working on the index and show page. Use a lib file for this and import. Store left/right on event.target.value and stick that onto the body

  render() {
    console.log('Swipes are', this.state.swipes);
    console.log('Chats are', this.state.chats);
    return (
      <section>
        {this.state.swipes && this.state.swipes.map(swipe =>
          <Link key={swipe._id} to={`/users/${swipe.userId._id}`}>
            <img src={swipe.userId.profilePic} alt={swipe.userId.firstName} />
            <p>{swipe.userId.firstName}</p>
          </Link>
        )}

        {this.state.chats && this.state.chats.map(chat =>
          <div key={chat._id}>
            <img src={chat.userOne.profilePic} alt={chat.userOne.firstName} />
            <p>{chat.userOne.firstName}</p>
          </div>
        )}
      </section>
    );
  }
}
