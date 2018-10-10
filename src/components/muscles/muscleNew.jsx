import React, { Component } from 'react';
import Joi from 'joi-browser';
import { saveMuscle } from '../../services/muscleService.js';

class MuscleNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    value: Joi.string().required().min(3).label('Muscle Name')
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

  async handleSubmit(event) {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }

    try {
      await saveMuscle(this.state.value);
      this.props.history.push('/muscles/index');
    } catch (exception) {
      if (exception.response && exception.response.status === 400) {
        alert(exception.response.data.errmsg);
      }
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <h4>New Muscle</h4>
            <div className="form-group">
                <label htmlFor="inlineFormInputName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inlineFormInputName"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              {this.state.errors.value && <div className="alert alert-danger">{this.state.errors.value}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default MuscleNew;
