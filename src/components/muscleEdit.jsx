import React, { Component } from 'react';
import Joi from 'joi-browser';
import { updateMuscle, getMuscle } from '../services/muscleService.js';

class MuscleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muscle: {
        name: ""
      },
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    value: Joi.string().required().min(3).label('Muscle Name')
  };

  async componentDidMount() {
    const muscle_id = this.props.match.params.id;
    try {
      const { data } = await getMuscle(muscle_id);
      this.setState({ muscle: data });
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  validate() {
    const { error: errors } = Joi.validate({ value: this.state.muscle.name }, this.schema, { abortEarly: false });
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
    const muscle = { ...this.state.muscle };
    const errorMessage = this.validateProperty(event.currentTarget.value);
    if (errorMessage) {
      errors.value = errorMessage;
    } else {
      delete errors.value;
    }
    muscle.name  =  event.target.value;
    this.setState({ muscle: muscle, errors });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }

    await updateMuscle(this.state.muscle);
    this.props.history.push('/muscles/index');
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="inlineFormInputName">Name</label>
            <input
              type="text"
              className="form-control"
              id="inlineFormInputName"
              value={this.state.muscle.name}
              onChange={this.handleChange}
            />
            {this.state.errors.value && <div className="alert alert-danger">{this.state.errors.value}</div>}
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default MuscleEdit;
