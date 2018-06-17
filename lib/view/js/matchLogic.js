/* global angular */
const matchLogic = angular.module('rpsApp', []);

matchLogic.controller('matchController', ($scope, $http) => {
  $scope.armoury = [];

  $scope.fetchArmoury = () => {
    $http.get('/svc/initialise')
      .then((response) => {
        $scope.armoury = response.data;
      });
  };
});
