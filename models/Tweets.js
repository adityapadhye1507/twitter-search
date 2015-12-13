var mongoose = require('mongoose');

var TweetsSchema = new mongoose.Schema({
  id: Number,
  fromUser: String,
  fromUserId: String,
  fromUserName: String,
  twitterTweetId: String,
  languageCode: String,
  profileImage: String,
  source: String,
  text: String,
  latitude: Number,
  longittude: Number,
  createdAt: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

mongoose.model('Tweet', TweetsSchema);