/* global api, beforeEach, describe, expect, it, xit */

const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/env');

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
  bio: 'Professional from south London, looking for something serious and to settledown. Into cooking and keeping fit. If you don\'t like cats, we won\'t get on. I havetwo fur babies and want more!'
};

describe('GET /users', () => {
  let token;
  let userId;

  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '1hr' });
        done();
      });
  });

  it('should return a 401 response without a token', done => {
    api.get('/api/users')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200 response', done => {
    api.get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array', done => {
    api.get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return an array of objects', done => {
    api.get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.body.forEach(user => expect(user).to.be.an('object'));
        done();
      });
  });

  it('should return the correct data', done => {
    api.get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body.userId).to.eq(userData.id);
        done();
      });
  });

});
