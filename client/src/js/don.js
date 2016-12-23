<button onClick={this.statechange.bind(this)}>click me</button>
		<ChildComponent status={this.state.header} method={this.childchange.bind(this)} />
		<SiblingComponent status2={this.state.header}/>




                        <input type="text" className="form-control" placeholder="type comments" aria-describedby="basic-addon2" onChange={this.fun.bind(this)}/>
                          <button type="button" className="btn btn-primary" onClick={this.Tocomment.bind(this)}>Commend</button>




Tocomment(){
  var comments=this.state.comm;
       console.log(comments+"-=========");
       var newsObject = {};
       newsObject.title=this.props.data.title;
       newsObject.comments = this.state.comm;
 $.ajax({
        url:"http://localhost:8278/news/update/",
        type: 'PUT',
        data: newsObject,
        success: function(message)
              {
                 console.log(newsObject.comments);
                   console.log(newsObject.title);

               }.bind(this),
              error: function(err)
              {
                console.log(err);
              }.bind(this)
            });
}                          








fun(e){
console.log(e.target.value);
  this.setState({"comm":e.target.value});
}









 <div className='col-xs-10'>
                  <textarea className="form-control custom-control" rows="3" onChange={this.getcommenttext.bind(this)} placeholder="Enter Comments to update..." ></textarea>     
                  <button type="button" className="btn btn-primary" onClick={this.Toupdate.bind(this)}  title="click to update commend">Comment</button>
                  </div> 














