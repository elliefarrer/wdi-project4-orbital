/* global api, beforeEach, describe, expect, it, xit */

const User = require('../../models/user');
const Chat = require('../../models/chat');

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

const messageData = {
  userOne: '5b90faba6164a88ac1374928',
  userTwo: '5b90fb567ac316da4df12cf3',
  messages: [
    {
      sentBy: '5b90faba6164a88ac1374928',
      content: 'Hi, how are you? Been up to much today',
      timestamps: '2018-09-06 17:15'
    },
    {
      sentBy: '5b90fb567ac316da4df12cf3',
      content: 'Not much, just building the app you\'re using right now and reading allyour data :)',
      timestamps: '2018-09-06 17:24'
    }
  ]
};

describe('GET /users/:userId/chats', () => {
  // let token;
  let userId;

  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(() => Chat.create(messageData))
      .then(user => {
        userId = user._id;
        done();
      });

  });

  it('should return a 200 response', done => {
    api.get(`/api/users/${userId}/chats`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array', done => {
    api.get(`/api/users/${userId}/chats`)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return an array of objects', done => {
    api.get(`/api/users/${userId}/chats`)
      .end((err, res) => {
        res.body.forEach(chat => expect(chat).to.be.an('object'));
        done();
      });
  });

});
