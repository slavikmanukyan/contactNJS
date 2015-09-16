'use strict';

angular.module('contact.create', ['ngRoute','contact.services'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/create', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','contactList','$timeout',function($scope,contactList,$timeout) {

        $scope.added=false;
        $scope.notadded=false;
        $scope.cont={};
        $scope.add=function(){
            contactList.add($scope.cont).then(function(res){
                if (res=="ok"){
                    $scope.cont={};
                    $scope.added=true;
                    $scope.createForm.$setPristine();
                    $timeout(function(){
                        $scope.added=false;
                    },2000);}
                    else{
                        $scope.notadded=true;
                        $timeout(function(){
                            $scope.notadded=false;
                        },2000);
                    }
            },function(){
                $scope.notadded=true;
                $timeout(function(){
                    $scope.notadded=false;
                },2500);
            });


        }

}]);