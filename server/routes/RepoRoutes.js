var express = require('express');
var router = express.Router();
var Repositories=require("../models/Repositories");


function isLoggedIn(req,res,next){
if(req.isAuthenticated()){
return next();
}
else{
	alert("Please Login");
  res.json("authenticate failed")
  }
}


router.post('/AddRepositories',function(req,res,next){
	console.log(req.body);
	if(req.body){
		//req.body.Description="Default Description, Please Update";
		var RepositoryVar = new Repositories(req.body);
		RepositoryVar.save(function(err){
			if(err){
				console.log(err+"**************");
			}
			else{
				console.log("Repository added");
				res.send("Repository Added");
			}
		});
	}
	else{
		console.log("error while adding");
	}
});

//Getting the different categories of Repositories stored in the database

router.get('/GetCategoryOptions',function(req,res,next){
	var List=[];
	Repositories.find({}, {Category:true, _id:false}, function(err,docs){
		if(err){
			res.send(err);
		}
		else{
			var index=0;
			docs.forEach(function(data,err){
				 index=List.findIndex(function(element){
				 	return element===data.Category;
				});
				 console.log(index);
				 if(index===-1){
				List.push(data.Category);
				console.log(List);
			}
			});
			res.send(List);
			}
	});
});

//Passing All the Repositories matching the given category as JSON

router.post('/GetCategoryFavourites',function(req,res,next){
	if(req.body){
	console.log(typeof req.body.category);
	Repositories.find({Category:req.body.category}, function(err, docs){
		if(err){
			console.log('error');
			res.send(err);
		}
		else{
			console.log(docs);
			res.json(docs);
		}
	});

	}
	else{
		console.log("GetCategoryFavourites else");
	}
});

/*router.route('/UpdateRepository').put(function(isLoggedIn,req,res,next){
	if(req.body){
		console.log(req.body);
		Repositories.update({repoID:req.body.repoID}, {Category:req.body.Category, Description:req.body.Description});
		console.log("Repository Updated");
		res.send("Repository Updated");
	}
	else{
		res.send("Please enter the required details");
	}
});*/

//Updating the Description field of the added Repository

router.put('/UpdateRepository', function(req,res,next){
	if(req.body){
		console.log(req.body);
		Repositories.update({repoID:req.body.repoID}, {'$set':{Description:req.body.Description}}, function(data,err){
			if(err){
				res.send(err);
			}
			else{
				res.send('Repository Updated');
			}
		});
		
	}
	else{
		res.send("Please enter the required details");
	}
});

//Deleting the given repository from the database using the repoID field

router.delete('/DeleteRepository',function(req,res,next){
	if(req.body){
		console.log(req.body);
		Repositories.remove({repoID:req.body.repoID}, function(err){
			if(err){
				res.send(err);
			}

			else{
				console.log('Repository Deleted');
				res.send('Repository Deleted');
			}
		});
	}
	else{
		res.send('The given repository could not be deleted');
	}
});

//An isLoggedIn function to check whether a user has logged in successfully or not.


module.exports=router;
