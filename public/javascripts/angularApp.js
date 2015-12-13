var app = angular.module('twitterSearch', ['ui.router','angularUtils.directives.dirPagination']);

//application config
app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: './partial/home.html',
      controller: 'MainCtrl'
  }).state('search', {
      url: '/search',
      templateUrl: './partial/search.html',
      controller: 'SearchCtrl'
  }).state('results', {
      url: '/results',
      templateUrl: './partial/results.html',
      controller: 'ResultsCtrl'
  }).state('details', {
      url: '/details/:id',
      cache : false,
      templateUrl: './partial/details.html',
      controller: 'DetailsCtrl'
  });
    
  $urlRouterProvider.otherwise('home');
}]);

//Query Service
app.service('queryService', function() {
  var results = [];

    var setResults = function(data){
        results = data;
    };

  var getResults = function(){
      return results;
  };

  return {
    setResults: setResults,
    getResults: getResults
  };

});


//Main Controller
app.controller('MainCtrl', ['$scope','$http',
function($scope, $http){

    var data = {};
    $scope.connectDb = function(){
        $http.post('/connect', data)
            .success(function(data){
            alert(data.message);
        });
    }
}]);

// Search Controller
app.controller('SearchCtrl', ['$scope','$http','$location','queryService',
  function($scope, $http, $location, queryService){

      // Take query parameters and incorporate into a JSON queryBody
    $scope.queryTweets = function(){
                
        // Assemble Query Body
        queryBody = {
            keyword : $scope.queryData.keyword,
            fromUserId : $scope.queryData.fromUserId,
            fromUserName : $scope.queryData.fromUserName,
            startTime : $scope.queryData.startTime,
            endTime : $scope.queryData.endTime
        };
        
        // Post the queryBody to the /query POST route to retrieve the filtered results
        $http.post('/query', queryBody)

            // Store the filtered results in queryResults
            .success(function(results){

                queryService.setResults(results);
                $location.path('/results');
            })
            .error(function(results){
                console.log('Error ' + results);
            })
    };
  }
]);

//Results Controller
app.controller('ResultsCtrl', ['$scope','queryService',
function($scope, queryService){
    
/*    $scope.config = {
    itemsPerPage: 15,
    fillLastPage: true
  }*/
    
    console.log("In results controller");
    $scope.results = queryService.getResults();
    console.log($scope.results);
    
}]);

//Details Controller
app.controller('DetailsCtrl', ['$scope','$http','$stateParams','$state','queryService',
function($scope, $http, $stateParams, $state, queryService){

//Populate the details page   
    console.log("In Details controller");
    var tweetId = $stateParams.id;    
    var queryBody = {id: tweetId};
    
$scope.tweet = $http.post('/details', queryBody)    
    .success(function(result){
    $scope.tweet= result.tweet;
    $scope.commentText = result.commentText;
    console.log("Tweet after calling router:"+$scope.tweet.fromUserName);
    $scope.initMap();
     })
    .error(function(result){
            console.log('Error ' + result);
    });    
    
//Initialize google map    
$scope.initMap = function() {

// Uses the selected lat, long as starting point
    var myLatLng = {lat: Number($scope.tweet.latitude), lng: Number($scope.tweet.longitude)};

    // If map has not been created...
    if (!$scope.map){

        // Create a new map and place in the index.html page
        $scope.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: myLatLng
        });
    }

    //place a marker
    var marker = new google.maps.Marker({
           position: myLatLng,
           map: $scope.map,
           title: "Tweet Location"
    }); 
}

//function to add a comment
$scope.addComment = function(){
  if($scope.details.comment === '') { return; }

    var tweetId = $scope.tweet._id
    var newComment = {body: $scope.details.comment,
                  tweet: tweetId};
    console.log("Tweet longitude in addComment, before all ops:"+$scope.tweet.longitude);
    
    var data = {tweet: $scope.tweet,
               comment: newComment};
    
    //call to add comment into db
    $http.post('/tweets/' + tweetId + '/comments', data)
          .success(function(result) {
    console.log("Comment added in db");
    $scope.commentText.push(result.comment.body);    
  });
    
    $scope.details.comment = '';
};


}]);
