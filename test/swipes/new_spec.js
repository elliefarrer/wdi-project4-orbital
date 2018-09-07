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

const newSwipe = [
  {
    swipes: [
      { userId: '5b90fb8c7ac316da4df12cf7', status: 'right' },
      { userId: '5b90fb8c7ac316da4df12cf6', status: 'right' }
    ]
  }
];

describe('POST /users/:userId/swipes', () => {
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
    api.post(`/api/users/${userId}/swipes`)
      .send(newSwipe)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array', done => {
    api.post(`/api/users/${userId}/swipes`)
      .send(newSwipe)
      .end((err, res) => {
        expect(res.body.swipes).to.be.an('array');
        done();
      });
  });

});
