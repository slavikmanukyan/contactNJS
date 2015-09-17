'use strict';

angular.module('contact.list', ['ngRoute','contact.services'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope','contactList','$timeout','$location',function($scope,contactList,$timeout,$location) {
  var editable,hideShowEdit=function(){
            $timeout(function(){
                $scope.saveEdit=false;
                $scope.saveE={};
            },2000);
        };
  $scope.contacts=[];
  $scope.filtcontacts=[];
  $scope.saveEdit=false;

        function update(tim){
            if($location.path()!="/list" && tim){ $timeout.cancel(tim);  return}
  contactList.list().then(function(data){
    $scope.contacts=data;
      console.log($scope.contacts); console.log($scope.contacts,editable,$scope.edt);
    if ($scope.contacts.length==0) $scope.nocontacts=true; else $scope.nocontacts=false;
    var t= $timeout(function(){update(t)},5000);
      console.log(t.$$timeoutId);

  });}
        update();
  $scope.save=function(edt){
        console.log($scope.contacts);
        $scope.showedit=false;
        contactList.edit(editable,edt).then(function(res){
            $scope.saveEdit=true;
            if(res=="ok"){

                $scope.saveE={id:2,text:"Contact edited successfully"};
                angular.extend(editable,edt);
                console.log($scope.contacts,editable,edt);
                hideShowEdit();
            }
            else{
                $scope.saveE={id:1,text:"There are error on server side\n"+res};
                hideShowEdit();
            }
        },function(){
            $scope.saveEdit=true;
            $scope.saveE={id:1,text:"Connection Error"};
            hideShowEdit();
        });

      };


      $scope.edt={name:"",phone:null};
      $scope.edit=function(cont){
          $scope.showedit=true;
          $scope.edt=angular.extend({},cont);
          editable=cont;
          $scope.editable=editable;
      };
      $scope.delete=function(cont){
          contactList.delete(cont).then(function(res){
              $scope.saveEdit=true;
              if (res=="ok") {
                  if ($scope.contacts.length==0){
                      $scope.nocontacts=true;

                  }
                  $scope.saveE={id:2,text:"Contact deleted"};
                  hideShowEdit()
              }
              else{
                  $scope.saveE={id:1,text:"Contact don't deleted"};
                  hideShowEdit();
              }
          },function(){
              $scope.saveE={id:1,text:"Contact don't deleted"};
              hideShowEdit();
          });

      };
      $scope.scroll=function(){
        var a=  document.getElementsByName('editForm')[0];
        setTimeout(function(){  a.scrollIntoView();},0);
      }

}]);