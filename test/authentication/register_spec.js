/* global api, beforeEach, describe, expect, it, xit */

const User = require('../../models/user');

const existingUserData = {
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
  bio: 'Professional from south London, looking for something serious and to settledown. Into cooking and keeping fit. If you don\'t like cats, we won\'t get on. I havetwo fur babies and want more!'
};

const newUserData = {
  firstName: 'Matt',
  email: 'matt@platyp.com',
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
  bio: 'Professional from south London, looking for something serious and to settledown. Into cooking and keeping fit. If you don\'t like cats, we won\'t get on. I havetwo fur babies and want more!'
};

describe('POST /register', () => {

  beforeEach(done => {
    User.remove({})
      .then(() => User.create(existingUserData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api.post('/api/register')
      .send(newUserData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should add user to database', done => {
    api.post('/api/register')
      .send(newUserData)
      .then(() => User.find())
      .then(User => {
        expect(User.length).to.eq(2);
        done();
      });
  });

});
