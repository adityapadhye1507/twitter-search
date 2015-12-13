var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  tweet: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }
});

mongoose.model('Comment', CommentSchema);