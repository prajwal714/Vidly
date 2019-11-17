import React, { Component } from 'react';
import Input from './input';
import Joi from 'joi-browser';
class Form extends Component {
    state = { 
        data: {},
        errors: {}
     }

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        // console.log(result);

        if (!error) return null;

        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    };
    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        // console.log(errors);
        this.setState({ errors: errors || {} });

        if (errors) return;

        //const username = this.username.current.value; //returns the actual DOM element
        this.doSubmit();
    };
    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data });
    };
    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    renderInput({name,label,type="text"})
    {

        return <Input
            name={name}
            value={this.state.data[name]}
            label={label}
            error={this.state.errors[name]}
            onChange={this.handleChange}
        ></Input>
    }
    renderButton(name)
    {
        return (<button className="btn btn-primary">
            {name}
          </button>);
    }
}
 
export default Form;