/**
 * Created by Slavik on 9/13/2015.
 */
angular.module('contact.services',[]).config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With']}).factory('contactList',['$http','$q',function($http,$q){
    var contacts=[];

    return {
        add: function(con) {
            contacts.push(con);
            return $http.post('/add',con).then(function(res){
                if (res.data!="ok")
                contacts.pop();
                return res.data});
        },
        list: function(){
                var q=$q.defer();
                q.notify(contacts);
                $http.get('/list').then(function(data){contacts=data.data;
                q.resolve(contacts);
                });
                return q.promise;
        },
        edit: function(editable,edt){
            return $http.post('/edit',[editable,edt]).then(function(res){
                if(res.data=="ok")
                    contacts.splice(contacts.indexOf(editable),1,edt);
                return res.data});
        },
        delete: function(contact){
               return $http.post('/delete',contact).then(function(res){
                   if (res.data=="ok")
                   contacts.splice(contacts.indexOf(contact),1);
                   return res.data});
        }
    }
}]);