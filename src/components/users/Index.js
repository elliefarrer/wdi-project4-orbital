import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//IDEA: use moment to send timestamp with state on swipe
import moment from 'moment';

// Components
// import SwipeButtons from '../common/SwipeButtons';
import Footer from '../common/Footer';

// libraries
import Auth from '../../lib/Auth';


export default class UsersIndex extends React.Component {
  state = {}

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
  }

  componentDidMount = () => {
    console.log('component mounted');
    axios.get('/api/users', Auth.bearerHeader())
      .then(res => this.setState({ users: res.data }));
  }

  render() {

    return (
      <section className="users-index centered-text">
        {/* {this.state.users &&
          <div className="to-swipe">
            <div className="polaroid">
              <div className="polaroid-body">
                <img src={this.state.users[0].profilePic} alt={this.state.users[0].firstName}/>
                <Link to={`/users/${this.state.users[0]._id}`}>
                  <i className="fas fa-info-circle over-image bottom-right"></i>
                </Link>
              </div>
              <div className="polaroid-footer">
                <h2>{this.state.users[0].firstName}, {moment().diff(this.state.users[0].dateOfBirth, 'years')}</h2>
                <h4>{this.state.users[0].occupation}</h4>
              </div>
            </div>

            <div className="buttons">
              <div className="column-1of2">
                <a name={this.state.users[0]._id} value="left" onClick={this.handleSwipe}><i className="fas fa-times swipe-button swipe-left"></i></a>
              </div>
              <div className="column-2of2">
                <a name={this.state.users[0]._id} value="right" onClick={this.handleSwipe}><i className="fas fa-heart swipe-button swipe-right"></i></a>
              </div>
            </div>
          </div>
        } */}


        {this.state.users && this.state.users.map(user =>
          <div className="to-swipe" key={user._id} >
            <div className="polaroid">
              <div className="polaroid-body">
                <img src={user.profilePic} alt={user.firstName} />
                <Link to={`/users/${user._id}`}>
                  <i className="fas fa-info-circle over-image bottom-right"></i>
                </Link>
              </div>
              <div className="polaroid-footer">
                <h2>{user.firstName}, {moment().diff(user.dateOfBirth, 'years')}</h2>
                <h4>{user.occupation}</h4>
              </div>
            </div>

            <div className="buttons">
              <div className="column-1of2">
                <button className="swipe-button" name={user._id} value="left" onClick={this.handleSwipe}>✕</button>
              </div>
              <div className="column-2of2">
                <button className="swipe-button" name={user._id} value="right" onClick={this.handleSwipe}>♥︎</button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </section>
    );
  }
}
