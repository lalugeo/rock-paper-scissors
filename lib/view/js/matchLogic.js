/* global angular */
const matchLogic = angular.module('gameApp', ['ngRoute']);

matchLogic.controller('matchController', ($scope, $http) => {
  $scope.armoury = [];

  $scope.fetchArmoury = () => {
    $http.get('/svc/fetchArmoury')
      .then((response) => {
        $scope.armoury = response.data;
      });
  };

  $scope.fetchArmoury();
});
