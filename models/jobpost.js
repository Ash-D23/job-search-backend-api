const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobpostSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    Company: {
      type: String,
      required: true
    },
    Date: {
      type: String,
      required: true
    },
    Description: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: false
    },
    creator: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('JobPost', JobpostSchema);
