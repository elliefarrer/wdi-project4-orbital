/* global api, expect, describe, it, beforeEach, xit */

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

describe('DELETE /users/:userId/swipes/:swipeId', () => {
  let userId;
  let swipeId;

  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        userId = user._id;
        swipeId = user.swipes[0]._id;
        done();
      });
  });

  it('should return a 204 response', done => {
    api.delete(`/api/users/${userId}/swipes/${swipeId}`)
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });

});
