import React, { Component } from "react";

class LoginForm extends Component {

  //to access a DOM element, we need to give it a reference, we create a ref object 
  username = React.createRef();
  state={
    account: {
      username: "",
      password: ""
    }
  }

  // componentDidMount() {
  //   this.username.current.focus();
  // }
  

  handleSubmit = e => {
    e.preventDefault();
    const username = this.username.current.value; //returns the actual DOM element
    console.log("submitted form", username);
  };

  handleChange=({currentTarget: input})=>{
    const account={...this.state.account};
    account[input.name]=input.value;
    this.setState({account});
  }
  render() {
    let {account}=this.state;
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}> 
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              autoFocus
              value={account.username}
              onChange={this.handleChange}
              ref={this.username}
              id="username"
              name="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="text" value={account.password} onChange={this.handleChange} className="form-control" />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
