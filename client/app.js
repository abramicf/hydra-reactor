var app = angular.module('hydraApp', []);
app.factory('User', function($http) {
//storage object, which will be equal to 'data' from an initial get request once the user signs in
  var userData = {
    user_id: '1234567',
    trips: [{
      trip_id: '123',
      tripName: 'Hawaii Vacation',
      activities: [
      {
        activity_id: '32hhwhaseh',
        description: 'Eat Delicious Pizza',
        category: 'Food'
      }, {
        activity_id: 'bhwh2hdhsh',
        description: 'Go Dancing',
        category: 'Nightlife'
      }, {
        activity_id: 'bh3hw2shae',
        description: 'Surf',
        category: 'Exercise'
      }
      ]
    },
    {
      trip_id: '456',
      tripName: 'Vegas Vacaction',
      activities: []
    }
    ]
  };  //THIS IS DUMMY DATA - OUR LOCAL DATA WILL ERASE EVERY TIME WE NEED TO REFRESH PAGE WITH A CHANGE TO THE CODE, SO DUMMY DATA IN THE CODE KEEPS IT PERSISTENT.
  var trip;




  //get request to pull in user info
  var newSignUp = function(email, password) {
    console.log('newSignUp is getting invoked!');
    var req = {
      method: 'POST',
      url: '/api/signup',
      data: {
        "email": email,
        "password": password
      }
    };
    $http(req)
      // the following will be called asynchronously when the response is available
      .then(function successCallback(response) {
        userData = response.data;
        localStorage.setItem('auth', response.data.tokens[0].token)
      }, function errorCallback(error) {
        console.log('error!');
      });

  };

  var signIn = function(email, password){
    console.log('signIn is getting invoked!');
    var req = {
      method: 'POST',
      url: '/api/signin',
      data: {email, password}
    };
    $http(req)
      // the following will be called asynchronously when the response is available
      .then(function successCallback(response) {
        userData = response.data;
        localStorage.setItem('auth', response.data.tokens[0].token)
        console.log(userData);
      }, function errorCallback(error) {
        console.log('error!');
      });
  };



var newTrip = function(user_id, tripName) {
    console.log('newTrip is getting invoked!');
    var req = {
      method: 'POST',
      url: '/api/trips',
      headers: {
        'x-auth': localStorage.getItem('auth')
      },
      data: {
        "user_id": user_id,  // Need to update with database data
        "trip": {
          "tripName": tripName
        }
      }
    };
    $http(req)
      // the following will be called asynchronously when the response is available
      .then(function successCallback(response) {
        console.log('newTrip success');
        console.dir(response);
        console.log('the returned data is:', response.data);
        userData = response.data;
        console.log(userData);
      }, function errorCallback(error) {
        console.log('error!');
      });

  };


  var newActivity = function(user_id, trip_id, description, category) {
    console.log('newActivity is getting invoked!');
    var req = {
      method: 'POST',
      url: '/api/activities',
      headers: {
        'x-auth': localStorage.getItem('auth')
      },
      data: {
        "user_id": user_id,
        "trip_id": trip_id,
        "activity": {
          "description": description,
          "category": category
        }
      }
    };
    $http(req)
      // the following will be called asynchronously when the response is available
      .then(function successCallback(response) {
        console.log('newActivity success');
        console.dir(response);
        console.log('the returned data is:', response.data);
        userData = response.data;
        console.log(userData);
      }, function errorCallback(error) {
        console.log('error!');
      });
  };




  return {
    userData: userData,
    newSignUp: newSignUp,
    newTrip: newTrip,
    newActivity: newActivity,
    signIn: signIn
  };
});




// app.factory('Activities', function($http) {
//   // Function to post a new activity to the database
  // var postNewData = function(description, category, storage) {
  //   // Set up the request object
  //   var req = {
  //     method: 'POST',
  //     url: '/api/activities',
  //     data: {
  //       description: description,
  //       category: category
  //     }
  //   };
  //   // Pass the request object to an $http call
  //   $http(req)
  //   // the following will be called asynchronously when the response is available
  //   .then(function successCallback(response) {
  //     console.log('postNewData success');
  //     storage.push(response.data);
  //   }, function errorCallback(error) {
  //     console.log('error!');
  //   });
  // };
//   // Function to get all activities from the database
//   var getData = function() {
//     // Set up the request object
//     var req = {
//       method: 'GET',
//       url: '/api/activities'
//     };
//     // Pass the request object to an $http call
//     return $http(req)
//     // the following will be called asynchronously when the response is available
//     .then(function successCallback(response) {
//       console.log('Client getData response.data: ', response.data);
//       return response.data;
//     }, function errorCallback(error) {
//       console.log('error!');
//     });
//   };
//   // Function to delete an activity
//   var deleteActivity = function(activity) {
//     // Set up the request object
//     var req = {
//       method: 'DELETE',
//       url: '/api/activities',
//       data: activity
//     };
//     console.log('delete Activity request: ', req);
//     // Pass the request object to an $http call
//     $http(req)
//     // the following will be called asynchronously when the response is available
//     .then(function successCallback(response) {
//       console.log('Client deleteActivity response: ', response);
//     }, function errorCallback(error) {
//       console.log('error!');
//     });
//   };
//   return {
//     postNewData: postNewData,
//     getData: getData,
//     deleteActivity: deleteActivity
//   };
// });
// app.controller('activityController', ['$scope', '$http', 'Activities', function($scope, $http, Activities) {
//   $scope.description = '';
//   $scope.category = '';
//   $scope.storage = [];
//   // if there's no text in the input field, don't do the post request
//   // empty the input field after a post request
//   $scope.postNewData = Activities.postNewData;
//   $scope.getData = Activities.getData;
//   $scope.deleteActivity = Activities.deleteActivity;
//   $scope.getData().then(function(data) {
//     $scope.storage = data;
//   });
//   // The following code is needed to send a data object in an $http DELETE request.
//   // Stack overflow issue that addresses this: http://stackoverflow.com/questions/37796227/body-is-empty-when-parsing-delete-request-with-express-and-body-parser
//   $http.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };
// }]);
// use ng-repeat on the index.html page to display each item in storage


// });
