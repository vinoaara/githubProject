var should = require("chai").should(),

assert = require ("chai").assert,
supertest = require("supertest"),
app = require("../bin/www");
var request=require('supertest');
var server = request.agent("http://localhost:8080");
var url=supertest("http://localhost:8080")



var User=require('../models/users');
var repo=require('../models/Repositories');
function userClean(){
User.remove({},function(){});
}
function newsClean(){
  repo.remove({},function(){});
}


describe("Signup", function(err){
it("Signup", function(done){
  url
  .post("/users/add")
  .send({"username":"sample","password":"wipro"})
  .expect(200)
  .end(function(err,res){
    res.text.should.be.equal("inserted");
    done();
  });

});
});








// describe("Testing the login route", function(err){
//   it("should handle the request", function(done){
//     server
//         .post("/users/login")
//         .send({"username":"sample","password":"wipro"})
//         .expect(200)
//         .end(function(err,res){
//           if (err) {
//                 throw err;
//           }
//          // assert.equal("Hello!",res.text, "res.text is not matching with Hello!");
//           res.text.should.be.equal("inside post login");
//             done();
//         });
//   });
// });
describe("Testing Add Repo", function(err){
  it("Add Movie", function(done){
    server
    .post("/repos/AddRepositories")
    .expect(200)
    .send({
      "repoID":"70770665",
      "Name" :"dell21",
      "Access":"false",
      "Stars":"0",
      "Category":"wipro"
    })
    .end(function(err,res){
      res.text.should.be.equal("Repository Added");
      done();
    });

  });
});