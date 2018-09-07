/* global api, beforeEach, describe, expect, it, xit */

const User = require('../../models/user');
const { secret } = require('../../config/env');
const jwt = require('jsonwebtoken');

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

const loginData = {
  email: 'liam@platyp.com',
  password: 'Pass1234'
};

const faultyLoginData = {
  email: 'liam@platyp.com',
  password: 'Pass12345'
};

describe('POST /login', () => {
  let token;

  beforeEach(done => {
    User.remove({})
      .then(() => User.create(existingUserData))
      .then(user => {
        token = jwt.sign({ sub: user.id }, secret, {expiresIn: '1hr'});
        done();
      });
  });

  it('should return a 200 response', done => {
    api.post('/api/login')
      .send(loginData)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return a 401 response if password does not match', done => {
    api.post('/api/login')
      .send(faultyLoginData)
      .set('Authorization', `Bearer ${token}`)
      .send((err, res) => {
        expect(res.status).to.eq(401);
      });
    done();
  });

});
