import React, { Component } from "react";
import Input from './common/input';
class LoginForm extends Component {

  //to access a DOM element, we need to give it a reference, we create a ref object 
  username = React.createRef();
  state={
    account: {
      username: "",
      password: ""
    },
    errors:{

    }
  }

  // componentDidMount() {
  //   this.username.current.focus();
  // }
  validate=()=>{
    const errors={};
    const {account}=this.state;

    if(account.username.trim()==='')
    errors.username="Username is required";

    if(account.password.trim()==="")
    errors.password="Password is required";

    return Object.keys(errors).length ===0 ? null:errors;

    
  }

  handleSubmit = e => {
    e.preventDefault();

    const errors=this.validate();
    console.log(errors);
    this.setState({errors: errors || {}});

    if(errors) return;

    //const username = this.username.current.value; //returns the actual DOM element
    console.log("submitted form");
  };

  handleChange=({currentTarget: input})=>{
    const account={...this.state.account};
    account[input.name]=input.value;
    this.setState({account});
  }
  render() {
    let {account,errors}=this.state;
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            error={errors.username}
            onChange={this.handleChange}
          ></Input>
          <Input
            name="password"
            value={account.password}
            label="password"
            error={errors.password}

            onChange={this.handleChange}
          ></Input>

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
