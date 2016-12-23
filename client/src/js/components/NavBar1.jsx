var React = require('react');
var {Link} = require('react-router');
var {browserHistory}=require('react-router');
export default class NavBar extends React.Component{

logout(){
console.log("logout");
   $.ajax({
      url:"http://localhost:8342/users/logout",
      type: 'GET',
      success: function(data){
      console.log("logout ajax");
      browserHistory.push('/Login');
       }.bind(this),
      error:function(err)
      {
        console.log(err+"-00000000----");
      }.bind(this)
    });

}






render() {
 return(
 <div >
   <nav className="navbar navbar-default navbar-fixed-top navbar-inverse">
     <div className="container-fluid">
       <ul className="nav navbar-nav">
           <li><Link to="/home"> <span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
           <li><Link to="/search">search Repo</Link></li>
           <li><Link to="/contact">Contact Us</Link></li>
           <li><Link to="/about">About Us</Link></li> 
           </ul>
            
      </div>
     </nav>
     {this.props.children}
   </div>
 );
}
}

