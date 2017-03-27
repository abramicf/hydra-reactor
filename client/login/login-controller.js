

angular.module('loginModule', ['hydraApp']).controller('loginController', ['$scope', '$http', '$location', 'User', function($scope, $http, $location, User) {


  $scope.email = '';

  // $scope.password = '';
  $scope.signIn = User.signIn;
  $scope.go = function () {
    $location.path('/tripview'); // path not hash
  };

}]);




// angular.module('loginModule', [])

// .controller('loginController', function($scope, $http) {

// });