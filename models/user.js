'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  uid: { type: String, required: true },
  username: { type: String },
  name: { type: String },
  email: { type: String, required: true, lowercase: true, unique: true },
  token: { type: String },
  imageUrl: { type: String },
  loggedinAt: { type: Date },
  facebook: {}
});

User.index({ email: 1 }, { unique: true });
User.virtual('id').get(function() {
  return this._id.toString();
});

mongoose.model('User', User);
