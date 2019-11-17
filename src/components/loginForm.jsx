import React, { Component } from "react";
import Input from "./common/input";
import Form from './common/form';
import Joi from "joi-browser";
class LoginForm extends Form {
  //to access a DOM element, we need to give it a reference, we create a ref object
  // username = React.createRef();
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  // componentDidMount() {
  //   this.username.current.focus();
  // }
  

  

  doSubmit=()=>{
    console.log("Submitted");
  }

  
  render() {
    let { data, errors } = this.state;
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={data.username}
            label="Username"
            error={errors.username}
            onChange={this.handleChange}
          ></Input>
          {this.renderInput()}

          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
