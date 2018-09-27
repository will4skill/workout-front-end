import React, { Component } from 'react';
import { saveWorkout } from '../services/workoutService.js';
import { loginWithJwt } from '../services/authService';

const BaseJoi = require('joi-browser');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

class WorkoutNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workout: {
        date: "",
      },
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    date: Joi.date().format('MM-DD-YYYY').label('Workout Date')
  };

  validate() {
    const { error: errors } = Joi.validate(this.state.workout, this.schema, { abortEarly: false });
    if (!errors) return null;

    const found_errors = {};
    for (let error of errors.details) {
      found_errors[error.path[0]] = error.message;
    }
    return found_errors;
  }

  validateProperty({ name, value }) {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }

  handleChange(event) {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(event.currentTarget);
    if (errorMessage) {
      errors[event.currentTarget.name] = errorMessage;
    } else {
      delete errors[event.currentTarget.name];
    }

    const workout = { ...this.state.workout };
    workout[event.currentTarget.name] = event.currentTarget.value;

    this.setState({ workout, errors });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) { return; }

    const response = await saveWorkout(this.state.workout);
    this.props.history.push('/users/me/show');
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="sr-only" htmlFor="inlineFormInputName">Name</label>
            <input
              name="date"
              type="text"
              className="form-control"
              id="inlineFormInputName"
              value={this.state.workout.date}
              onChange={this.handleChange}
            />
            {this.state.errors.date && <div className="alert alert-danger">{this.state.errors.date}</div>}
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default WorkoutNew;
