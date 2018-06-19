
// const matchLogic = angular.module('rpsApp', ['ngRoute']);

gameLogic.controller('matchController', function($scope, $http) { // eslint-disable-line
  $scope.armoury = [];

  $scope.fetchArmoury = () => {
    $http.get('/svc/fetchArmoury')
      .then((response) => {
        $scope.armoury = response.data;
      });
  };

  $scope.fetchArmoury();
});
