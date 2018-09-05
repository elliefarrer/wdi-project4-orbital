const User = require('../models/user');

const { dbURI } = require('../config/env');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const userData = [
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
    bio: 'Classical musician turned JavaScript developer. 5ft2, ENTP, and very proud Brit. Proud mummy of a black labrador. If you don\'t like Patisserie Valerie and the Oxford comma, we won\'t get on.'
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
    profilePic: 'sam.png',
    occupation: 'Market Researcher',
    languages: ['English', 'French', 'Urdu'],
    bio: 'From Manchester, recently moved to London for work. Looking to meet someone chilled out with a great sense of humour.'
  }
];

User.collection.drop();

User
  .create(userData)
  .then(users => console.log(`Created ${users.length} users`))
  .catch(err => console.log(`There was an error ${err}`))
  .finally(() => mongoose.connection.close());
