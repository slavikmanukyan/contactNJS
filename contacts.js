/**
 * Created by Slavik on 9/16/2015.
 */
var contacts=[{
    name: "Slavik Manukyan",
    phone: "096-82-37-61"
}];

exports.add=function(cont,callback){
    process.nextTick(function(){
        contacts.push(cont);
        callback();
    });
}

exports.getList=function(){
    return contacts;
}

exports.delete=function(cont,callback){
    process.nextTick(function(){
        contacts.splice(contacts.indexOf(cont),1);
        callback();
    });
}

exports.edit=function(editable,callback){
    process.nextTick(function() {
        contacts.splice(contacts.indexOf(editable[0]), 1, editable[1]);
        callback();
    });
}