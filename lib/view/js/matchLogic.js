
// const matchLogic = angular.module('rpsApp', ['ngRoute']);

gameLogic.controller('matchController', function($scope, $http) { // eslint-disable-line
  $scope.armoury = [];

  $scope.fetchArmoury = () => {
    $http.get('/svc/fetchArmoury')
      .then((response) => {
        $scope.armoury = response.data;
      });
  };

  $scope.fetchPlayers = () => {
    $http.get('/svc/fetchPlayers')
      .then((response) => {
        $scope.player1 = response.data.player1;
        $scope.player2 = response.data.player2;
      });
  };

  $scope.fetchArmoury();
  $scope.fetchPlayers();

  $scope.moveText = `${$scope.player1.name} 's move'`;
});
