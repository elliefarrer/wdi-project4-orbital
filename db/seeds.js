const User = require('../models/user');

const { dbURI } = require('../config/env');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

User.collection.drop();

const userData =
  User.create([
    {
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
        { status: 'matched' }
      ]
    },
    {
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
      bio: 'From Manchester, recently moved to London for work. Looking to meet someone chilled out with a great sense of humour.'
    },
    {
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
      bio: 'Some of my mates use this so thought I\'d give it a go. Just looking for someone to have a laugh with. Not sure what else to say so swipe right and message to find out.'
    },
    {
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
      bio: 'Professional from south London, looking for something serious and to settle down. Into cooking and keeping fit. If you don\'t like cats, we won\'t get on. I have two fur babies and want more!'
    },
    {
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
      bio: 'Greetings, m\'lady. I am a gentleman who treats a lady like a gentleman should. I am a nice guy, why can\'t I get a reply? Sorry I\'m obese, live with my mum, and spend my life on the computer mining XRP 😒'
    },
    {
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
      bio: 'Don\'t call my name, dont\'t call my name, Alejandro. I\'m not your babe, I\'m not your babe, Fernando. Not much of a Lady Gaga fan.'
    },
    {
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
  ])
  .then(users => {
    console.log(`Created ${users.length} users`);
    console.log('From', users[1]._id);
    console.log('Getting an id for', users[0].swipes[0]);
    users[0].swipes[0].userId = users[1]._id;
    // users[0].swipes[1].userId = users[2]._id;
    // users[0].swipes[2].userId = users[3]._id;
    // users[0].swipes[3].userId = users[4]._id;
    // return users.create(userData);
  })
  .catch(err => console.log(`There was an error ${err}`))
  .finally(() => mongoose.connection.close());
