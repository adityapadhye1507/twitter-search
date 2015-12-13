var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Tweets = mongoose.model('Tweet');
var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter Search' });
});

router.post('/connect/', function(req, res, next){
    Tweets.find({}, function (err, tweet) {
            if (err) throw err;
            var msg = {"message":"Connected to mongoDb server!!!"};   
            res.json(msg);            
        });
});


//route to add new comment in DB
router.post('/tweets/:tweetId/comments/', function(req, res, next) {
  console.log("Saving comments in DB");
  var tweetId = req.body.tweet;    
  var comment = new Comment(req.body.comment);

  console.log("Comment before saving:"+comment);
  console.log("Tweet before saving:"+req.body.tweet);

  comment.save(function(err, comment){
    if(err){ return next(err); }
    
    console.log("Comment after saving:"+comment);
    Tweets.findOne({_id: tweetId}, function (err, tweet) {
        if (err) throw err;
        tweet.comments.push(comment._id);
        tweet.save();
      	var data = {tweet : tweet, comment: comment};
        res.json(data);
    });
    });
});


//get a single tweet data from database
router.post('/details/', function(req, res) {
    var tweetId = req.body.id;
    Tweets.findOne({_id: tweetId}, function (err, tweet) {
        if (err) throw err;
      	var commentsIdArray = tweet.comments;
        console.log("commentIdArray:"+commentsIdArray);
        var commentTextArray =[];
        Comment.find({_id:{$in: commentsIdArray}}, function(err, comments){
                console.log(comments);
                for(i=0;i<comments.length;i++){
                    commentTextArray.push(comments[i].body);
                }
                console.log("commentTextArray:"+commentTextArray);
                var data = {tweet: tweet, commentText: commentTextArray};
                res.json(data);
            })
    });
});

// Retrieves JSON records for all tweets who meet a certain set of query conditions
router.post('/query/', function(req, res){
    console.log("In router to query data");

    
        // Grab all of the query parameters from the body.
        var keyword           = req.body.keyword;
        var userId            = req.body.fromUserId;
        var userName          = req.body.fromUserName;
        var startTime         = req.body.startTime;
        var endTime           = req.body.endTime;
        console.log(req.body);
    
        
        //defining general query object
        var query = Tweets.find({});
        
        //adding query parameters according to the need
        if(!((keyword===undefined) || (keyword===""))){
            var regex = new RegExp(keyword , 'i');
            query = query.where('text',regex);
        }if(!((userId===undefined) || (userId===""))){
            //var regex = new RegExp(userId , 'i');
            query = query.where('fromUser',userId);
        }if(!((userName===undefined) || (userName===""))){
            var regex = new RegExp(userName , 'i');
            query = query.where('fromUserName',regex);
        }if(!((startTime===undefined) || (startTime===""))){
            var start = new Date(startTime);
            console.log("Start time before manipulation:"+start.toUTCString());
            start.setHours(start.getHours()-4);
            console.log("Start time after manipulation:"+start.toUTCString());
            query = query.where('createdAt').gte(start.toUTCString());
        }if(!((endTime===undefined) || (endTime===""))){
            var end = new Date(endTime);
            console.log("End time before manipulation:"+end.toUTCString());
            end.setHours(end.getHours()-4);
            console.log("End time after manipulation:"+end.toUTCString());
            query = query.where('createdAt').lte(end.toUTCString());
        }
    
        query.exec(function(err, results){
            if(err)
                res.send(err);
            else
                // If no errors, respond with a JSON of all users that meet the criteria
                console.log(results);
                res.json(results);
        });
    });


module.exports = router;
