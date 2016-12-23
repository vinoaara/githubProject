import React from 'react';
import {browserHistory} from 'react-router';
export default class signup extends React.Component{
  constructor(){
  	super();
    this.state={
      "username":"default",
      password:"default"
    }
  }
user(euser){
  this.setState({"username":euser.target.value});
  console.log(this.state.username);
}
pass(epass){
  this.setState({password:epass.target.value});
}
  check(){
  var signup={
    username:this.state.username,
    password:this.state.password
  }
    console.log("login clicked");
    $.ajax({
      url:"http://localhost:8342/users/add",
      type: 'POST',
      data : signup,
      success: function(data){
      console.log("allow login");
     browserHistory.push('/');
       }.bind(this),
      error:function(err)
      {
      console.log("error add ajax");
        console.log(err+"-00000000----");
      }.bind(this)
    });
  }

render(){
 return (
      <div className="login-card">
         <div>
         <h1>Sign Up</h1><br />
         </div>
      <div>
        <input type="text" name="user" placeholder="Username" onChange={this.user.bind(this)}/><br/>
        <input type="password" name="pass" placeholder="Password" onChange={this.pass.bind(this)}/><br/>
        <input type="button" name="Submit" className="login login-submit" value="Submit" onClick={this.check.bind(this)} />
      </div>
      
    </div>

	)
	}
}