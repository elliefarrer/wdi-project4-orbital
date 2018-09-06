/* global api, beforeEach, describe, expect, it, xit */

const User = require('../../models/user');
// const jwt = require('jsonwebtoken');
// const { secret } = require('../../config/env');

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

const updateData = {
  firstName: 'AA',
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

const faultyData = {
  firstName: 'A',
  email: 'liamplatyp.com',
  password: 'Pass',
  passwordConfirmation: 'Pass',
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

const invalidData = {
  firstName: 'AA',
  email: 'liam@platyp.com',
  password: 'Pass1234',
  passwordConfirmation: 'Pass1234',
  dateOfBirth: '2002-03-03',
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

const invalidPwData = {
  firstName: 'AA',
  email: 'liam@platyp.com',
  password: 'Pass1234',
  passwordConfirmation: 'Pass123456',
  dateOfBirth: '1982-03-03',
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

  it('should return a 200 reponse', done => {
    api.put(`/api/users/${userId}`)
      .send(updateData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.put(`/api/users/${userId}`)
      .send(updateData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.put(`/api/users/${userId}`)
      .send(updateData)
      .end((err, res) => {
        expect(res.body.id).to.eq(userData.id);
        expect(res.body.id).to.eq(updateData.id);
        done();
      });
  });

  it('should return the updated data', done => {
    api.put(`/api/users/${userId}`)
      .send(updateData)
      .end((err, res) => {
        expect(res.body.firstName).to.eq(updateData.firstName);
        done();
      });
  });

  it('should keep the user IDs the same', done => {
    api.put(`/api/user/${userId}`)
      .send(updateData)
      .end(err => {
        expect(userData.id).to.eq(updateData.id);
        done();
      });
  });

  it('should return a 422 response if conditions are not met', done => {
    api.put(`/api/users/${userId}`)
      .send(faultyData)
      .end((err, res) => {
        expect(res.status).to.eq(422);
        done();
      });
  });

  it('should return a 422 response if user is too young', done => {
    api.put(`/api/users/${userId}`)
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.eq(422);
        done();
      });
  });

  it('should return a 422 if password and password confirm do not match', done => {
    api.put(`/api/users/${userId}`)
      .send(invalidPwData)
      .end((err, res) => {
        expect(res.status).to.eq(422);
        done();
      });

  });

});
