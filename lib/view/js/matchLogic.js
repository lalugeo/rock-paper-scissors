/* global Materialize */
gameLogic.controller('matchController', function($scope, $window, $http) { // eslint-disable-line
  $scope.armoury = [];
  $scope.moveText = '';
  $scope.currentMove = 'player1';

  $scope.fetchArmoury = () => {
    $http.get('/svc/fetchArmoury')
      .then((response) => {
        $scope.armoury = response.data;
      })
      .catch(() => {
        Materialize.toast('Oops! something went wrong.');
      });
  };

  $scope.fetchPlayers = () => {
    $http.get('/svc/fetchPlayers')
      .then((response) => {
        $scope.player1 = response.data.player1;
        $scope.player1.hasPlayed = false;
        $scope.player2 = response.data.player2;
        $scope.player2.hasPlayed = false;
        $scope.DetermineNextMove();
      })
      .catch(() => {
        Materialize.toast('Oops! something went wrong.');
      });
  };
  $scope.DetermineNextMove = () => {
    if ($scope.player1.machine === false && $scope.player1.hasPlayed === false) {
      $scope.currentMove = 'player1';
      $scope.moveText = `${$scope.player1.name} 's move`;
    } else if ($scope.player2.machine === false && $scope.player2.hasPlayed === false) {
      $scope.currentMove = 'player2';
      $scope.moveText = `${$scope.player2.name} 's move`;
    } else {
      $window.location.href = '#/result';
    }
  };

  $scope.ChooseWeaponPlayer = (choosenWeapon) => {
    if ($scope.currentMove === 'player1') {
      $scope.player1.hasPlayed = true;
      $http.post('/svc/chooseWeapon', {
        currentMove: $scope.currentMove,
        weapon: choosenWeapon,
      })
        .then(() => {
          $scope.DetermineNextMove();
        })
        .catch(() => {
          Materialize.toast('Oops! something went wrong.');
        });
    } else {
      $scope.player2.hasPlayed = true;
      $http.post('/svc/chooseWeapon', {
        currentMove: $scope.currentMove,
        weapon: 'rock',
      })
        .then(() => {
          $scope.DetermineNextMove();
        })
        .catch(() => {
          Materialize.toast('Oops! something went wrong.');
        });
    }
  };

  $scope.fetchArmoury();
  $scope.fetchPlayers();
});
