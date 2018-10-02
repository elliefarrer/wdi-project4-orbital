/* global after, before, beforeEach, describe, it, xit */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import UsersIndex from '../../../src/components/users/Index';

const userData = [
  {
    _id: '5b90fb567ac316da4df12cf3',
    firstName: 'Sam',
    email: 'sam@platyp.com',
    password: 'Pass1234',
    passwordConfirmation: 'Pass1234',
    dateOfBirth: '1993-04-02',
    postcode: 'E3 2AX',
    gender: 'man',
    sexuality: ['woman'],
    minAgeRange: 21,
    maxAgeRange: 26,
    profilePic: 'https://i.imgur.com/qUpD4GT.png',
    occupation: 'Market Researcher',
    languages: ['English', 'French', 'Urdu'],
    bio: 'From Manchester, recently moved to London for work. Looking to meet someone chilled out with a great sense of humour.',
    swipes: [
      { userId: '5b90faba6164a88ac1374928', status: 'right', mutual: true, messaged: true }
    ]
  },
  {
    _id: '5b90fb667ac316da4df12cf4',
    firstName: 'Harry',
    email: 'harry@platyp.com',
    password: 'Pass1234',
    passwordConfirmation: 'Pass1234',
    dateOfBirth: '1994-11-18',
    postcode: 'BR8 7PT',
    gender: 'man',
    sexuality: ['man', 'woman'],
    minAgeRange: 20,
    maxAgeRange: 24,
    profilePic: 'https://i.imgur.com/tBSRAsB.png',
    occupation: 'Scaffolder',
    languages: [ 'English' ],
    bio: 'Some of my mates use this so thought I\'d give it a go. Just looking for someone to have a laugh with. Not sure what else to say so swipe right and message to find out.',
    swipes: [
      { userId: '5b90faba6164a88ac1374928', status: 'right', mutual: true, messaged: true }
    ]
  },
  {
    _id: '5b90fb777ac316da4df12cf5',
    firstName: 'Liam',
    email: 'liam@platyp.com',
    password: 'Pass1234',
    passwordConfirmation: 'Pass1234',
    dateOfBirth: '1989-03-03',
    postcode: 'SE1 4BU',
    gender: 'man',
    sexuality: ['woman'],
    minAgeRange: 23,
    maxAgeRange: 31,
    profilePic: 'https://i.imgur.com/xXcqsMw.png',
    occupation: 'Project Manager',
    languages: [ 'English', 'Mandarin' ],
    bio: 'Professional from south London, looking for something serious and to settle down. Into cooking and keeping fit. If you don\'t like cats, we won\'t get on. I have two fur babies and want more!'
  }
];

describe('UsersIndex tests', () => {
  let promise = null;
  let wrapper = null;

  before(done => {
    promise = Promise.resolve({ data: userData });
    sinon.stub(axios, 'get').returns(promise);
    done();
  });

  after(done => {
    axios.get.restore();
    done();
  });

  beforeEach(done => {
    wrapper = mount(
      <MemoryRouter>
        <UsersIndex />
      </MemoryRouter>
    );
    done();
  });

  it('should display three users', done => {
    promise.then(() => {
      wrapper.update();
      expect(wrapper.find('.polaroid').length).to.eq(3);
      done();
    });
  });

  it('should have links to the correct show pages', done => {
    promise.then(() => {
      wrapper.update();
      for(let i = 0; i < 3; i++) {
        expect(wrapper.find({ Link: `/users/${userData[i]._id}` }).length).to.eq(1);
      }
      done();
    });
  });


});
