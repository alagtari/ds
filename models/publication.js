const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: new Date.now },
  content: { type: String, required: true },
  
});

module.exports = mongoose.model('Publication', publicationSchema);



