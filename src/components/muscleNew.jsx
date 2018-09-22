import React, { Component } from 'react';
import Joi from 'joi-browser';
//import { saveMuscle } from '../services/muscleService.js';

class MuscleNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    value: Joi.string().required().min(3).label('Muscle Name').email()
  };

  validate() {
    const { error: errors } = Joi.validate({ value: this.state.value }, this.schema, { abortEarly: false });
    if (!errors) return null;

    const found_errors = {};
    for (let error of errors.details) {
      found_errors[error.path[0]] += error.message;
    }
    return found_errors;
  }

  validateProperty(input) {
    const { error } = Joi.validate({ value: input }, this.schema);
    return error ? error.details[0].message : null;
  }

  handleChange(event) {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(event.currentTarget.value);
    if (errorMessage) {
      errors.value = errorMessage;
    } else {
      delete errors.value;
    }

    this.setState({ value: event.target.value, errors });
  }

  handleSubmit(event) {
    event.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }

    // await saveMuscle(this.state.value)
    this.props.history.push('/muscles/index');
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row align-items-center">
            <div className="col-sm-3 my-1">
              <label
                className="sr-only" htmlFor="inlineFormInputName">Name</label>
              <input
                type="text"
                className="form-control"
                id="inlineFormInputName"
                value={this.state.value}
                onChange={this.handleChange}
              />
              {this.state.errors.value && <div className="alert alert-danger">{this.state.errors.value}</div>}
            </div>
            <div className="col-auto my-1">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default MuscleNew;
