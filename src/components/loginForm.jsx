import React, { Component } from "react";

class LoginForm extends Component {

  //to access a DOM element, we need to give it a reference, we create a ref object 
  username = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    const username = this.username.current.value; //returns the actual DOM element
    console.log("submitted form", username);
  };
  render() {
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}> 
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              autoFocus
              ref={this.username}
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="text" className="form-control" />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
