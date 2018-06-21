/* global Materialize */
gameLogic.controller('resultController', function($scope, $window, $http) { // eslint-disable-line
  $scope.result = 'Loading .. ';
  $scope.winner = 'Loading .. ';

  $scope.fetchPlayers = () => {
    $http.get('/svc/fetchResult')
      .then((response) => {
        $scope.winner = response.data.winner;
        $scope.result = response.data.result;
      })
      .catch(() => {
        Materialize.toast('Oops! something went wrong.');
      });
  };

  $scope.fetchPlayers();
});
