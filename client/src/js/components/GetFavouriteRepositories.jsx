var React=require('react');

var FavouriteRepoDisplay=require('./FavouriteRepoDisplay');
var GetFavouriteRepositories=React.createClass({

	getInitialState(){
		return({SelectOptions:[], value:'select', FavouriteRepoObj:[]});
	},
	componentDidMount(){
		$.ajax({
			url:"http://localhost:8342/repos/GetCategoryOptions",
			type:'GET',
			dataType:'JSON',
			success:function(data){
				console.log(data);
				this.setState({SelectOptions:data});

			}.bind(this),
			error:function(err){
				console.log(err);
			}.bind(this)
		});
	},
	GetCategoryFavourites(event){
	console.log("++++++++++++++++++++++++++++++++++++++++++++++++++inside getfav"+event.target.value)
		var categoryObj={};
		categoryObj.category=event.target.value;
		this.setState({value:event.target.value});
		$.ajax({
			url:"http://localhost:8342/repos/GetCategoryFavourites",
			type:'POST',
			data:categoryObj,
			dataType:'JSON',
			success:function(data){
				console.log(data);
				this.setState({FavouriteRepoObj:data});
			}.bind(this),
			error:function(err){
				console.log(err);
			}.bind(this)
		});
	},

// An ajax call made to the route to uodate the description field in the database and re-rendering the page content

	updateRepository(repoID, Description){
		var UpdateObj={};
		UpdateObj.repoID=repoID;
		UpdateObj.Description=Description;
		$.ajax({
			url:"http://localhost:8342/repos/UpdateRepository",
			type:'PUT',
			data:UpdateObj,
			success:function(data){
				console.log(data);
				var index=this.state.FavouriteRepoObj.findIndex(function(element){
					//console.log(element);
					return (element.repoID===UpdateObj.repoID);
				});
				if(index!=-1){
					//console.log("executing");
					this.state.FavouriteRepoObj[index].Description=Description;
					this.setState({FavouriteRepoObj:this.state.FavouriteRepoObj});
					//console.log(this.state.FavouriteRepoObj);
				}
				else{
					console.log("not executing");
				}
			}.bind(this),
			error:function(err){
				console.log("error");
				console.log(err);
			}.bind(this)
		});
	},

	//Deleting a particular repository from the database and re-rendering the page content.

	DeleteRepository:function(repoID,repoCategory){
		alert(repoID, repoCategory);
		var DeleteRepoObj={};
		DeleteRepoObj.repoID=repoID;
		$.ajax({
			url:"http://localhost:8342/repos/DeleteRepository",
			type:'DELETE',
			data:DeleteRepoObj,
			success:function(data){
				console.log(data);
				var index=this.state.FavouriteRepoObj.findIndex(function(element){
					return element.repoID===DeleteRepoObj.repoID;
				});
				if(index!=-1){
					this.state.FavouriteRepoObj.splice(index, 1);
					

						if(this.state.FavouriteRepoObj.length==0){

                        var i=this.state.SelectOptions.findIndex(function(element){

                            return element===repoCategory;

                        });

                        if(i!=-1){

                            //console.log('Entering category state');

                        this.state.SelectOptions.splice(i, 1);

                        this.setState({FavouriteRepoObj:this.state.FavouriteRepoObj, SelectOptions:this.state.SelectOptions});

                        alert("Sorry You have deleted all repositories of the selected Category, Please Add Repos");

                        }

                    }

                    else{

                    this.setState({FavouriteRepoObj:this.state.FavouriteRepoObj});

                    }

                }

            }.bind(this),

            error:function(err){

                console.log(err);

            }.bind(this)

        });

    },
	render(){
		console.log(this.state.SelectOptions.length);
		var SelectListArr=this.state.SelectOptions.map(function(option){
			console.log('entering++++selectlist');
			return(<option value={option}>{option}</option>);
		});

		var FavouriteRepoDisplayArr=this.state.FavouriteRepoObj.map(function(Repo){
			console.log('entering+-----after selection');
			return(<FavouriteRepoDisplay RepoObj={Repo} updateCall={this.updateRepository} onDelete={this.DeleteRepository}></FavouriteRepoDisplay>);
		}.bind(this));

		console.log(SelectListArr+"~~~~~~~");
		return(
			<div style={{marginTop:'100'}}>
			<div style={{textAlign:'center'}}>
			<h3>Please Select your Category: </h3>&emsp;
				<select id='myList' className="selectpicker btn btn-info btn-group-lg" onChange={this.GetCategoryFavourites}>
					<option value="Select">Select</option>
					{SelectListArr}
				</select>
				</div>
				<hr></hr>
				{FavouriteRepoDisplayArr}
			</div>
			);
	}
});

module.exports=GetFavouriteRepositories;
