const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const moment = require('moment');


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /(?=.*[@])(?=.*[.])/
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    match: /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  postcode: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: [ 'man', 'woman', 'transgender', 'non-binary', 'other', 'prefer not to say' ]
  },
  sexuality: [{
    type: String,
    required: true,
    enum: [ 'men', 'women', 'transgender', 'non-binary', 'other' ]
  }],
  minAgeRange: {
    type: Number,
    min: 18
  },
  maxAgeRange: {
    type: Number,
    min: 19
  },
  profilePic: {
    type: String,
    required: true,
    match: /(?=.*[.jpg]$)(?=.*[.jpeg]$)(?=.*[.png]$)/
  },
  occupation: String,
  languages: [{
    type: String
  }],
  bio: {
    type: String,
    required: true,
    minlength: 100,
    maxlength: 250
  },
  // timeStamps: String,
  swipes: [
    {
      userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
      status: { type: String, enum: ['right', 'left'] },
      mutual: { type: Boolean, default: false },
      messaged: { type: Boolean, default: false },
      timestamps: { type: String, default: moment().format('YYYY-MM-dd HH:mm') }
      //TODO: change default back to 'no swipe' when tested/figured out how to do this a better way
    }
  ]
});

// no swipe = neither user has swiped the other either right or left
// left swipe = one or both users has swiped the other left
// pending = one user has swiped the other right, waiting for the other to swipe
// match = both users have swiped each other right so can now message

userSchema.plugin(require('mongoose-unique-validator'));


///////////// VIRTUALS /////////////////
// calculate user's age
userSchema.virtual('age')
  .get(function() {
    return moment().diff(this.dateOfBirth, 'years');
  });

userSchema.virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });


//////////////// LIFECYCLE HOOKS ///////////////
userSchema.pre('validate', function(next) {
  if(this.isModified('password')) {
    if(!this._passwordConfirmation || this._passwordConfirmation !== this.password) {
      console.log('Passwords do not match');
      this.invalidate('Password confirmation', 'does not match');
    }
  }

  // invalidate if user is under 18
  // console.log('Age is', this.age);
  if(this.age < 18) {
    console.log('Age is under 18');
    this.invalidate('Age', 'is under 18');
  }

  // invalidate if min age rage equals match, or is higher than max
  if(this.minAgeRange >= this.maxAgeRange) {
    console.log('Min age range is too high');
    this.invalidate('Min age range', 'matches or is higher than max age range');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  next();
});


/////////////// METHODS /////////////////
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

////////// MATT'S THOUGHTS
// User
//   name: String
//   matches: [{ userId, status: String, enum: 'sent', 'pending', 'accepted', 'unmatched', 'left'], timeStemp: date }]
