import 'file?name=[name].[ext]!../index.html';
import 'file?name=[name].[ext]!../css/style.css';



import React from 'react';
import ReactDOM from 'react-dom';
var {browserHistory,hashHistory, Route, Router, IndexRoute}
  = require('react-router');

import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import NavBar from './components/NavBar.jsx';
import Login from './components/Login.jsx';
var ParentComponent=require('./Components/ParentComponent');
import FavView from './components/GetFavouriteRepositories.jsx';
var GetFavouriteRepositories=require('./Components/GetFavouriteRepositories');
import NavBar1 from './components/NavBar1.jsx'
import signup from './components/signup.jsx';
class MainComponent extends React.Component{

render(){

return (
<div>


<br/><br/><br/><br/>
</div>
)
}
}
ReactDOM.render(
<Router history={browserHistory}>

				<Route path="/" component={NavBar1}>
				 <IndexRoute  component={Login} />
				 </Route>
		         <Route path = "/signup" component={signup} />
             	 <Route path="/home" component={NavBar} >		            
				 	 <IndexRoute component={MainComponent}/>
		             <Route path="/search" component={ParentComponent}></Route>
		             <Route path="/about" component={About}/>
		             <Route path="/contact" component={Contact}/>
		             <Route path = "/Login" component={Login} />
		             <Route path="/getFavourites" component={GetFavouriteRepositories}></Route>
		             <Route path="/view" component={FavView}/>
				</Route>	

</Router>,document.getElementById('content'));