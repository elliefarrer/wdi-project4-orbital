import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import moment from 'moment';

// Components
import BackButton from '../common/BackButton';
import Location from '../common/Location';
import SwipeButtons from '../common/SwipeButtons';

// libraries
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

export default class UsersShow extends React.Component {
  state = {
    apikey: 'DmK3IjydVb4R9lDw3X08xjNBNVV0WOks',
    nominatimPostcode: '',
    distance: '',
    newPhoto: false
  }

  componentDidMount = () => {
    axios.get(`/api/users/${this.props.match.params.userId}`, Auth.bearerHeader())
      .then(res => this.setState({ user: res.data }));
  }


  getPostcode = postcodeToSearch => {
    if(this.state.user) {
      axios.get(`https://nominatim.openstreetmap.org/search/${postcodeToSearch}?format=json`)
        .then(res => this.setState({ nominatimPostcode: res.data }));
    }
  }

  getDistance = (startpoint, endpoint) => {
    if(this.state.user) {
      axios.get('https://www.mapquestapi.com/directions/v2/optimizedroute', {
        params: {
          key: this.state.apikey,
          from: startpoint,
          to: endpoint
        }
      })
        .then(res => this.setState({ distance: res.data }));
    }
  }

  handleSwipe = event => {
    event.preventDefault();
    const swipeData = {
      userId: event.target.name,
      status: event.target.value,
      timestamps: Date.now()
    };
    axios.post(`/api/users/${Auth.currentUserId()}/swipes`, swipeData, Auth.bearerHeader())
      .then(res => this.setState({ currentUser: res.data }))
      .then(() => this.props.history.push('/users'))
      .catch(err => console.log(err));
  }

  logOut = () => {
    Auth.removeToken();
    Flash.setMessage('neutral', 'Goodbye! Hope to see you again soon...');
    this.props.history.push('/');
  }

  deleteProfile = () => {
    axios.delete(`/api/users/${this.props.match.params.userId}`, Auth.bearerHeader())
      .then(() => this.props.history.push('/'));
    Auth.removeToken();
    Flash.setMessage('neutral', 'Sorry to see you go! Hope to see you back again one day...');
  }

  toggleNewPhoto = () => {
    const newPhoto = !this.state.newPhoto;
    this.setState({ newPhoto });
  }

  handlePhotoChange = event => {
    console.log('Event fired', event.target.name, event.target.value);
    const { target: { name, value }} = event;
    this.setState({ [name]: value });
  }

  handlePhotoSubmit = event => {
    event.preventDefault();
    console.log('State is', this.state);
    const photoData = {
      url: this.state.newPhotoUpload
    };
    axios.post(`/api/users/${Auth.currentUserId()}/photos`, photoData, Auth.bearerHeader())
      .then(res => this.setState({ user: res.data, newPhoto: false, newPhotoUpload: '' }))
      .catch(err => console.log(err));
  }

  //IDEA: look at how this is constructed, with the photoId being passed in on click, to try and fix textarea bug
  deletePhoto = photoId => {
    return () => {
      axios.delete(`/api/users/${Auth.currentUserId()}/photos/${photoId}`, Auth.bearerHeader())
        .then(res => this.setState({ user: res.data }))
        .catch(err => console.log(err));
    };
  }
  render() {
    if(this.state.user && !this.state.nominatimPostcode) {
      this.getPostcode(this.state.user.postcode);
    }

    if(this.state.user && !this.state.distance) {
      this.getDistance(Auth.currentPostcode(), this.state.user.postcode);
    }

    const user = this.state.user;
    console.log('State is', this.state);

    return (
      <section>
        {this.state.user &&
          <div>
            <img src={user.profilePic[0]} alt={user.firstName} />

            {/* BUTTONS */}
            {this.props.match.url.split('/')[2] !== Auth.currentUserId() &&
            <div>
              <BackButton link={'/users'}/>
              <SwipeButtons
                handleSwipe={this.handleSwipe}
                user={this.state.user}
              />
            </div>
            }

            {/* ADD PHOTO */}
            {this.props.match.url.split('/')[2] === Auth.currentUserId() &&
            <p onClick={this.toggleNewPhoto}><i className="fas fa-plus-circle"></i></p>
            }
            {this.state.newPhoto &&
              <form onSubmit={this.handlePhotoSubmit}>
                <div className="field">
                  <input name="newPhotoUpload" type="text" placeholder="Add a photo (URL)" value={this.state.newPhotoUpload || ''} onChange={this.handlePhotoChange}/>
                  <button>Submit</button>
                </div>
              </form>
            }

            {user.extraPhotos && user.extraPhotos.map((photo, index) =>
              <div key={index}>
                <img src={photo.url} />
                <p onClick={this.deletePhoto(photo._id)}><i className="fas fa-trash-alt"></i></p>
              </div>
            )}


            <h2>{user.firstName}, {moment().diff(user.dateOfBirth, 'years')}</h2>
            <p>{user.occupation}</p>
            {this.state.nominatimPostcode && this.state.distance &&
              <Location
                user={this.props.match.url.split('/')[2]}
                postcode={this.state.nominatimPostcode}
                distance={this.state.distance}
              />
            }

            <p>{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}, looking for a:</p>
            <ul>
              {user.sexuality.map((option, index) =>
                <li key={index}>{option}</li>
              )}
            </ul>

            <h2>About {user.firstName}</h2>
            <p>{user.bio}</p>
            <p>Languages:</p>
            <ul>
              {user.languages.map((language, index) =>
                <li key={index}>{language}</li>
              )}
            </ul>

            {this.props.match.url.split('/')[2] === Auth.currentUserId() &&
              <div>
                <Link to={`/users/${Auth.currentUserId()}/edit`}>Edit Profile</Link>
                <a onClick={this.logOut}>Log out {Auth.currentFirstName()}</a>
                <a onClick={this.deleteProfile}>Delete Profile</a>
              </div>
            }
          </div>
        }

      </section>
    );
  }
}
