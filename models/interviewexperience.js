const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExperienceSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  Company: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Date: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  }
}
);

module.exports = mongoose.model('Experience', ExperienceSchema);
