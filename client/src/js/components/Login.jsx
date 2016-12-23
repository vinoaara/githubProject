import React from 'react';
import {browserHistory} from 'react-router';
import Navbar from '../components/Navbar';
export default class Login extends React.Component{
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

sup(){
 browserHistory.push('/signup');
}



  check(){
  var login={
    username:this.state.username,
    password:this.state.password
  }
    console.log("login clicked");
    $.ajax({
      url:"http://localhost:8342/users/login",
      type: 'POST',
      data : login,
      success: function(data){
      console.log("allow login");
     browserHistory.push('/home');
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
         <h1>Log-in</h1><br />
         </div>
      <div>
        <input type="text" name="user" placeholder="Username" onChange={this.user.bind(this)}/><br/>
        <input type="password" name="pass" placeholder="Password" onChange={this.pass.bind(this)}/><br/>
        <input type="button" name="login" className="login login-submit" value="Login" onClick={this.check.bind(this)} />&nbsp;
        <input type="button" name="SignUp" className="login login-submit" value="SignUp" onClick={this.sup} />
      </div>
      
    </div>

	)
	}
}