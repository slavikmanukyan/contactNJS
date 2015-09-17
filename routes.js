/**
 * Created by Slavik on 9/16/2015.
 */
var express = require('express');
var contacts=require('./contacts');
var bodyParser=require('body-parser');
var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post("/delete",function(req,res){
   contacts.delete(req.body,function(){
       res.send('ok');
   },function(){
       res.send('error');
   });

});
router.post("/edit",function(req,res){
    contacts.edit(req.body,function(){
        res.send('ok');
    },function(){
        res.send('error');
    },function(){
        res.send('error');
    });
});

router.post("/add", function(req, res) {
    contacts.add(req.body,function(){
        res.send("ok");
    },function(){
        res.send('error');
    });
});

router.get("/list",function(req,res){
    res.send(contacts.getList());
});


module.exports = router;