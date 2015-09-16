'use strict';

angular.module('contact', [
  'ngRoute',
  'contact.create',
  'contact.list',

]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/list'});
}]).controller('activeCtrl',function($scope,$location){
      $scope.active=function(route){
        return route==$location.path();
      }
    });
