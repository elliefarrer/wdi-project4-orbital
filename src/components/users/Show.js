import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import moment from 'moment';

// Components
import BackButton from '../common/BackButton';
import Location from '../common/Location';
// import SwipeButtons from '../common/SwipeButtons';
import Footer from '../common/Footer';

// libraries
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import LocalStorage from '../../lib/LocalStorage';

export default class UsersShow extends React.Component {
  state = {
    apikey: 'pTiMIjTIOVqycoP0rcPHuxGP0b7Y3Mbj',
    nominatimPostcode: '',
    distance: '',
    newPhoto: false,

    carouselIndex: -1,
    triggerChangeImage: false
  }

  componentDidMount = () => {
    axios.get(`/api/users/${this.props.match.params.userId}`, Auth.bearerHeader())
      .then(res => this.setState({ user: res.data, carouselImage: res.data.profilePic }));
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
    LocalStorage.removeAll();
    Flash.setMessage('flash', 'Goodbye! Hope to see you again soon...');
    this.props.history.push('/');
  }

  deleteProfile = () => {
    axios.delete(`/api/users/${this.props.match.params.userId}`, Auth.bearerHeader())
      .then(() => this.props.history.push('/'));
    Auth.removeToken();
    Flash.setMessage('flash', 'Sorry to see you go! Hope to see you back again one day...');
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
    console.log('It runs');
    return () => {
      axios.delete(`/api/users/${Auth.currentUserId()}/photos/${photoId}`, Auth.bearerHeader())
        .then(res => this.setState({ user: res.data, carouselIndex: -1, carouselImage: this.state.user.profilePic }))
        // .then(() => this.props.history.push(`/users/${Auth.currentUserId()}`))
        .catch(err => console.log(err));
    };
  }

  ///////////////// CAROUSEL //////////////////////

  moveIndex = event => {
    const newState = this.state;
    if(parseInt(event.target.name) === 1) {
      this.setState({ carouselIndex: newState.carouselIndex + 1, triggerChangeImage: true });
    } else {
      this.setState({ carouselIndex: newState.carouselIndex - 1, triggerChangeImage: true });
    }
    setTimeout(() => {
      return this.changeImage();
    }, 50);
  }

  changeImage = () => {
    const newState = this.state;
    if(parseInt(newState.carouselIndex) > -1) {
      console.log('First one runs');
      return this.setState({ carouselImage: newState.user.extraPhotos[newState.carouselIndex].url });
    } else if (parseInt(newState.carouselIndex) === -1) {
      console.log('Second one runs');
      return this.setState({ carouselImage: newState.user.profilePic });
    } else {
      console.log('Total fail');
    }
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
      <section className="users-show">
        {this.state.user &&
          <div>

            {/* CAROUSEL */}
            {user.extraPhotos &&
              <div className="carousel-container">
                <div className="carousel-img">
                  {this.state.user.extraPhotos && this.state.carouselImage &&
                    <div>
                      <img style={{width: '100vw'}} src={this.state.carouselImage}/>

                      {this.props.match.url.split('/')[2] === Auth.currentUserId() &&
                      <a className="over-image top-left" onClick={this.toggleNewPhoto}><i className="fas fa-plus-circle"></i></a>
                      }

                      {this.props.match.url.split('/')[2] !== Auth.currentUserId() &&
                        <BackButton link={'/users'}/>
                      }

                      {this.props.match.url.split('/')[2] === Auth.currentUserId() && this.state.carouselIndex >= 0 &&
                        <div>
                          <a className="over-image bottom-right" onClick={this.deletePhoto(user.extraPhotos[this.state.carouselIndex]._id)}><i className="fas fa-trash-alt"></i></a>
                        </div>
                      }
                    </div>
                  }

                </div>

                {this.state.carouselIndex >= 0 &&
                  <a className="prev" name="-1" onClick={this.moveIndex}>&#10094;</a>
                }
                {this.state.carouselIndex < user.extraPhotos.length-1 &&
                  <a className="next" name="1" onClick={this.moveIndex}>&#10095;</a>
                }

              </div>
            }

            {/* ADD PHOTO */}

            {this.state.newPhoto &&
              <form onSubmit={this.handlePhotoSubmit}>
                <div className="field">
                  <input className="photo-input" name="newPhotoUpload" type="text" placeholder="Add a photo (URL)" value={this.state.newPhotoUpload || ''} onChange={this.handlePhotoChange}/>
                  <button className="photo-submit">Submit</button>
                </div>
              </form>
            }

            <div className="about-user">
              <div className="basic-info">
                <h2>{user.firstName}, {moment().diff(user.dateOfBirth, 'years')}</h2>
                <h4 className="occupation">{user.occupation}</h4>
                {this.state.nominatimPostcode && this.state.distance &&
                  <Location
                    user={this.props.match.url.split('/')[2]}
                    postcode={this.state.nominatimPostcode}
                    distance={this.state.distance}
                  />
                }
              </div>

              <p>{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}, looking for a </p>
              <ul>
                {user.sexuality.map((option, index) =>
                  <li key={index}>{option}, </li>
                )}
              </ul>

              <div className="bio">
                <h3>About {user.firstName}</h3>
                <p>{user.bio}</p><br />
                <p>Languages:</p>
                <ul>
                  {user.languages.map((language, index) =>
                    <li key={index}> {language},</li>
                  )}
                </ul>
              </div>

              {this.props.match.url.split('/')[2] === Auth.currentUserId() &&
              <div className="buttons">
                <div className="columns-1of2">
                  <Link className="button" to={`/users/${Auth.currentUserId()}/edit`}>Edit Profile</Link>
                </div>
                <div className="columns-2of2">
                  <a className="button" onClick={this.logOut}>Log out {Auth.currentFirstName()}</a>
                </div>
                <br />
                <div className="delete-container">
                  <a className="delete-link" onClick={this.deleteProfile}>Delete Profile</a>
                </div>
              </div>
              }
            </div>
          </div>
        }

        <Footer />
      </section>
    );
  }
}
