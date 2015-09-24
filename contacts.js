/**
 * Created by Slavik on 9/16/2015.
 */
var contacts=[{
    name: "Slavik Manukyan",
    phone: "096-82-37-61"
}];
function isEqual(a, b) {

    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}

function indexOf(array,obj){
    var index=0;
    for (var i in array){

        if (isEqual(array[i],obj)) return index;
        index++;
    }
    return -1;
}
exports.add=function(cont,callback,error){
    process.nextTick(function(){
        if(indexOf(contacts,cont)==-1) {
            contacts.push(cont);
            callback();
        }
        else{
            error();
        }
    });
}

exports.getList=function(){
    return contacts;
}

exports.delete=function(cont,callback,error){
    process.nextTick(function(){
   

        var i=indexOf(contacts,cont);
        if (i!=-1) {
            contacts.splice(i, 1);
            callback();
        }
        else{
            error();
        }
    });
}

exports.edit=function(editable,callback,error){
    process.nextTick(function() {

        var i=indexOf(contacts,editable[0]);
        if (i!=-1) {
            contacts.splice(i, 1, editable[1]);
            callback();
        }
        else{
            error();
        }
    });
}