const User = require('../models/user');
const Chat = require('../models/chat');

const { dbURI } = require('../config/env');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

User.collection.drop();
Chat.collection.drop();

const userIds = ['5b90faba6164a88ac1374928', '5b90fb567ac316da4df12cf3', '5b90fb667ac316da4df12cf4', '5b90fb777ac316da4df12cf5', '5b90fb7f7ac316da4df12cf6', '5b90fb8c7ac316da4df12cf7', '5b90fb947ac316da4df12cf8', '5b90fb9e7ac316da4df12cf9', '5b90fba57ac316da4df12cfa','5b90fbae7ac316da4df12cfb', '5b90fbb77ac316da4df12cfc'];

const userData = [
  {
    _id: userIds[0],
    firstName: 'Ellie',
    email: 'ellie@platyp.com',
    password: 'Pass1234',
    passwordConfirmation: 'Pass1234',
    dateOfBirth: '1995-02-22',
    postcode: 'HP5 2RY',
    gender: 'female',
    sexuality: 'straight',
    minAgeRange: 24,
    maxAgeRange: 32,
    profilePic: 'https://i.imgur.com/cgUj7q6.png',
    occupation: 'Junior Web Developer',
    languages: [ 'English', 'French', 'Italian', 'Dutch' ],
    bio: 'Classical musician turned JavaScript developer. 5ft2, ENTP, and very proud Brit. Proud mummy of a black labrador. If you don\'t like Patisserie Valerie and the Oxford comma, we won\'t get on.',
    swipes: [
      { userId: userIds[1], status: 'right' },
      { userId: userIds[2], status: 'right' },
      { userId: userIds[3], status: 'left' },
      { userId: userIds[4], status: 'left' }
    ]
  },
  {
    _id: userIds[1],
    firstName: 'Sam',
    email: 'sam@platyp.com',
    password: 'Pass1234',
    passwordConfirmation: 'Pass1234',
    dateOfBirth: '1993-04-02',
    postcode: 'E3 2AX',
    gender: 'male',
    sexuality: 'straight',
    minAgeRange: 21,
    maxAgeRange: 26,
    profilePic: 'https://i.imgur.com/qUpD4GT.png',
    occupation: 'Market Researcher',
    languages: ['English', 'French', 'Urdu'],
    bio: 'From Manchester, recently moved to London for work. Looking to meet someone chilled out with a great sense of humour.',
    swipes: [
      { userId: userIds[0], status: 'right' }
    ]
  },
  {
    _id: userIds[2],
    firstName: 'Harry',
    email: 'harry@platyp.com',
    password: 'Pass1234',
    passwordConfirmation: 'Pass1234',
    dateOfBirth: '1994-11-18',
    postcode: 'BR8 7PT',
    gender: 'male',
    sexuality: 'bisexual',
    minAgeRange: 20,
    maxAgeRange: 24,
    profilePic: 'harry.png',
    occupation: 'Scaffolder',
    languages: [ 'English' ],
    bio: 'Some of my mates use this so thought I\'d give it a go. Just looking for someone to have a laugh with. Not sure what else to say so swipe right and message to find out.',
    swipes: [
      { userId: userIds[0], status: 'right' }
    ]
  },
  {
    _id: userIds[3],
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
  },
  {
    _id: userIds[4],
    firstName: 'Paul',
    email: 'paul@platyp.com',
    password: 'Pass1234',
    passwordConfirmation: 'Pass1234',
    dateOfBirth: '1987-06-07',
    postcode: 'SL0 0EE',
    gender: 'male',
    sexuality: 'straight',
    minAgeRange: 22,
    maxAgeRange: 31,
    profilePic: 'paul.png',
    occupation: 'Crypto Currency Miner',
    languages: [ 'English' ],
    bio: 'Greetings, m\'lady. I am a gentleman who treats a lady like a gentleman should. I am a nice guy, why can\'t I get a reply? Sorry I\'m obese, live with my mum, and spend my life on the computer mining XRP 😒',
    swipes: [
      { userId: userIds[0], status: 'right' }
    ]
  },
  {
    _id: userIds[5],
    firstName: 'Alejandro',
    email: 'alejandro@platyp.com',
    password: 'Pass1234',
    passwordConfirmation: 'Pass1234',
    dateOfBirth: '1991-12-09',
    postcode: 'E1 1DB',
    gender: 'male',
    sexuality: 'bisexual',
    minAgeRange: 20,
    maxAgeRange: 30,
    profilePic: 'https://i.imgur.com/TxQDSMZ.png',
    occupation: 'Marketing Intern',
    languages: [ 'English', 'Spanish' ],
    bio: 'Don\'t call my name, dont\'t call my name, Alejandro. I\'m not your babe, I\'mnot your babe, Fernando. Not much of a Lady Gaga fan.'
  },
  {
    _id: userIds[6],
    firstName: 'Vasco',
    email: 'vasco@email.com',
    password: 'Pass1234',
    passwordConfirmation: 'Pass1234',
    dateOfBirth: '1999-08-10',
    postcode: 'EC1Y 4SB',
    gender: 'male',
    sexuality: 'bisexual',
    minAgeRange: 18,
    maxAgeRange: 26,
    profilePic: 'https://i.imgur.com/KB0u7wa.png',
    occupation: 'Student',
    languages: [ 'English', 'Portuguese', 'Spanish', 'French' ],
    bio: 'I\'m a Portuguese bassoonist, studying in Moorgate. Swipe right if you know who Stravinsky is. Not sure what I\'m looking for on here, just want to meet people and see where it leads.'
  }
];

const chatData = [
  {
    userOne: '',
    userTwo: '',
    messages: [
      {
        sentBy: '',
        content: 'Hi there, how are you doing?',
        timestamps: '2018-09-06 17:11'
      },
      {
        sentBy: '',
        content: 'I\'m good thank you! Yourself?',
        timestamps: '2018-09-06 17:20'
      },
      {
        sentBy: '',
        content: 'Good thanks! What a riveting conversation this is',
        timestamps: '2018-09-06 17:22'
      }
    ]
  },

  {
    userOne: '',
    userTwo: '',
    messages: [
      {
        sentBy: '',
        content: 'Hi, how are you? Been up to much today',
        timestamps: '2018-09-06 17:15'
      },
      {
        sentBy: '',
        content: 'Not much, just building the app you\'re using right now and reading all your data :)',
        timestamps: '2018-09-06 17:24'
      }
    ]
  }
];

User
  .create(userData)
  .then(users => {
    console.log(`Created ${users.length} users`);
    chatData[0].userOne = users[0]._id;
    chatData[0].userTwo = users[1]._id;
    chatData[1].userOne = users[0]._id;
    chatData[1].userTwo = users[2]._id;

    chatData[0].messages[0].sentBy = users[0]._id;
    chatData[0].messages[1].sentBy = users[1]._id;
    chatData[0].messages[2].sentBy = users[0]._id;
    chatData[1].messages[0].sentBy = users[2]._id;
    chatData[1].messages[1].sentBy = users[0]._id;
    return Chat.create(chatData);
  })
  .then(chats => console.log(`Created ${chats.length} chats`))
  .catch(err => console.log('There was an error', err))
  .finally(() => mongoose.connection.close());
