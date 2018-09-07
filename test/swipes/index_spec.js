/* global api, beforeEach, describe, expect, it, xit */

const User = require('../../models/user');

const userData = {
  firstName: 'Liam',
  email: 'liam@platyp.com',
  password: 'Pass1234',
  passwordConfirmation: 'Pass1234',
  dateOfBirth: '1989-03-03',
  postcode: 'SE1 4BU',
  gender: 'male',
  sexuality: 'straight',
  minAgeRange: 23,
  maxAgeRange: 31,
  profilePic: 'https://i.imgur.com/xXcqsMw.png',
  occupation: 'Project Manager',
  languages: [ 'English', 'Mandarin' ],
  bio: 'Professional from south London, looking for something serious and to settledown. Into cooking and keeping fit. If you don\'t like cats, we won\'t get on. I havetwo fur babies and want more!',
  swipes: [
    { userId: '5b90faba6164a88ac1374928', status: 'right' }
  ]
};

describe('GET /users/:userId/swipes', () => {
  // let token;
  let userId;

  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        userId = user._id;
        done();
      });
  });

  it('should return a 200 response', done => {
    api.get(`/api/users/${userId}/swipes`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array', done => {
    api.get(`/api/users/${userId}/swipes`)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return an array of objects', done => {
    api.get(`/api/users/${userId}/swipes`)
      .end((err, res) => {
        res.body.forEach(user => expect(user).to.be.an('object'));
        done();
      });
  });


});
