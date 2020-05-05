const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  movietitle: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  releasedate: {
    type: Date,
    required: true,
  },
  stars: {
    type: String,
  },
  info: {
    type: String,
  },
  social: [
    {
      youtube: {
        type: String,
      },
      twitter: {
        type: String,
      },
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },
  ],
});

module.exports = Movie = mongoose.model('movies', MovieSchema);
