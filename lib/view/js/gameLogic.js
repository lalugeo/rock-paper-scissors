/* global angular */
const gameLogic = angular.module('rpsApp', ['ngRoute']);

gameLogic.config(($routeProvider) => {
  $routeProvider
    .when('/', {
      templateUrl: 'game',
      controller: 'gameController',
    })
    .when('/match', {
      templateUrl: 'match',
      controller: 'matchController',
    })
    .otherwise({ redirectTo: '/' });
});

gameLogic.controller('gameController', function($scope, $window, $http) { // eslint-disable-line
  $scope.gameType = 'Basic';
  $scope.gameLevel = '1';

  $scope.player1 = {
    type: 'human',
    name: 'john doe',
    name_history: 'john doe',
    icon: 'person',
  };
  $scope.player2 = {
    type: 'machine',
    name: 'machine',
    name_history: 'jane doe',
    icon: 'laptop_mac',
  };

  $scope.setPlayer1Type = (type) => {
    if (type === 'human') {
      $scope.setPlayer1Human();
    } else {
      $scope.setPlayer1Machine();
    }
  };

  $scope.setPlayer1Machine = () => {
    const tmpName = $scope.player1.name;
    $scope.player1 = {
      type: 'machine',
      name: 'machine',
      name_history: tmpName,
      icon: 'laptop_mac',
    };
  };

  $scope.setPlayer1Human = () => {
    const currentName = $scope.player1.name;
    $scope.player1 = {
      type: 'human',
      name: (currentName === 'machine') ? $scope.player1.name_history : 'john doe',
      name_history: 'john doe',
      icon: 'person',
    };
  };

  $scope.setPlayer2Type = (type) => {
    if (type === 'human') {
      $scope.setPlayer2Human();
    } else {
      $scope.setPlayer2Machine();
    }
  };

  $scope.setPlayer2Machine = () => {
    const tmpName = $scope.player2.name;
    $scope.player2 = {
      type: 'machine',
      name: 'machine',
      name_history: tmpName,
      icon: 'laptop_mac',
    };
  };

  $scope.setPlayer2Human = () => {
    const currentName = $scope.player2.name;
    $scope.player2 = {
      type: 'human',
      name: (currentName === 'machine') ? $scope.player2.name_history : 'john doe',
      name_history: 'john doe',
      icon: 'person',
    };
  };

  $scope.setGameType = (gameType) => {
    $scope.gameType = gameType;
  };

  $scope.setGameLevel = (gameLevel) => {
    $scope.gameLevel = gameLevel;
  };

  $scope.startMatch = () => {
    $http.post('/svc/initialise', {
      player1: $scope.player1,
      player2: $scope.player2,
      gameType: $scope.gameType,
      gameLevel: Number($scope.gameLevel),
    })
      .then(() => {
        $window.location.href = '#/match';
      });
  };
});
