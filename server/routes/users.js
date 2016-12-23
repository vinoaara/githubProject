var express = require('express');
var router = express.Router();
var user=require('../models/users');

var passport = require('passport');

function isLoggedIn(req,res,next){
if(req.isAuthenticated()){
return next();
}
else{
  res.json("authenticate failed")
  }
}

router.get('/logout',function(req,res){
req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {

    console.log("inside logout route");
    res.send("logout success");
  }
});
});



router.post("/add",function(req,res) {
 if(req.body) {
 var uservar=new user();
   //console.log(uservar);
 uservar.username=req.body.username;
 uservar.password=req.body.password;
 uservar.save(function(err){
 if(err) {
   res.send(err);
 } 
 else  {
 res.send("Data inserted");
 }
   });
 }
 });


router.post("/login",passport.authenticate('local'),function(req,res){

  console.log("welcome"+Object.keys(req));
  res.send("inside post login");
});
router.delete("/delete",function(req,res){
    var request=req.body.username;
    if(request)
    {
      user.remove({username:request},function(err){
        if(err) {
          res.send(err);
        }
        else  {
        res.send("The user was deleted");
        }
      });
    }
  });

router.get('/',function(req, res, next) {
    user.find({},function(err,alluser){
      if(err) {
        res.send(err);
        console.log('error ocuured');
      }
      else {
       var user={};
        alluser.forEach(function(users,ind){
          user[users._id]=users;
          
        });
      }
    });
  });
module.exports = router;
  