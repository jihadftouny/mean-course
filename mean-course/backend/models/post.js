// post models
const mongoose = require('mongoose');

//creating a bluprint to how the data will look like
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema); //name and schema you will use, and export

