/* global api, expect, describe, it, beforeEach, xit */

const User = require('../../models/user');

const userData = {
  firstName: 'Liam',
  email: 'liam@platyp.com',
  password: 'Pass1234',
  passwordConfirmation: 'Pass1234',
  dateOfBirth: '1995-03-03',
  postcode: 'SE1 4BU',
  gender: 'male',
  sexuality: 'straight',
  minAgeRange: 23,
  maxAgeRange: 31,
  profilePic: 'https://i.imgur.com/xXcqsMw.png',
  occupation: 'Project Manager',
  languages: [ 'English', 'Mandarin' ],
  bio: 'Professional from south London, looking for something serious and to settledown. Into cooking and keeping fit. If you don\'t like cats, we won\'t get on. I havetwo fur babies and want more!'
};

describe('DELETE /users/:userId', () => {
  let userId;

  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        userId = user._id;
        done();
      });
  });

  it('should return a 204 with a token', done => {
    api.delete(`/api/users/${userId}`)
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });

  it('should delete the user', done => {
    api.delete(`/api/users/${userId}`)
      .then(() => User.find())
      .then(users => {
        expect(users.length).to.eq(0);
        done();
      });
  });

});
