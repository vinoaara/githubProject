var React=require('react');

var DisplayRepositoryBox=require('./DisplayRepositoryBox');
var DisplayComponent=React.createClass({

	render(){
		var RepoObject=this.props.RepoObj;
		var searchChoice=this.props.searchChoice;

		var RepoDisplayArray=RepoObject.map(function(element){
			return (
				<DisplayRepositoryBox RepositoryObject={element} searchOption={searchChoice}></DisplayRepositoryBox>
				);
			});
			if(searchChoice==="UserName"){
				return (
				<div className="container">
				<div className="row">
				<div className="col-offset-6 col-lg-6">
				<center><img src={this.props.RepoObj[0].owner.avatar_url} alt="User's Picture Here" height="300" width="300"></img></center>
				</div>
				</div>
				<br></br>
				<div className="row">
				<div className="col-offset-6 col-lg-6">
				<center><a href={this.props.RepoObj[0].owner.html_url} className="btn btn-primary" target="_blank"> View User Repository <span className="glyphicon glyphicon-new-window"></span> </a></center>
				</div>
				</div>	
				<hr></hr>
				<h1 style={{textAlign:'center'}}> All Repositories of {this.props.RepoObj[0].owner.login} </h1>
				{RepoDisplayArray}
				</div>
				);
			}
			else{
				return(
				<div>
				{RepoDisplayArray}
				</div>
				);
			}
		}
	});

	module.exports=DisplayComponent;