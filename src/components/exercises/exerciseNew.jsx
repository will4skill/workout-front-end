import React, { Component } from 'react';
import Joi from 'joi-browser';
import { saveExercise } from '../../services/exerciseService.js';
import { getMuscles } from '../../services/muscleService.js';

class ExerciseNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercise: {
        name: "",
        muscle_id: ""
      },
      muscles: [],
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    name: Joi.string().required().min(3).label('Exercise Name'),
    muscle_id: Joi.string().required().label("Muscle")
  };

  async componentDidMount() {
    const { data: muscles } = await getMuscles();
    this.setState({ muscles });
  }

  validate() {
    const { error: errors } = Joi.validate(this.state.exercise, this.schema, { abortEarly: false });
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

    const exercise = { ...this.state.exercise };
    exercise[event.currentTarget.name] = event.currentTarget.value;

    this.setState({ exercise, errors });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }

    try {
      await saveExercise(this.state.exercise);
      this.props.history.push('/exercises/index');
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
            <h4>New Exercise</h4>
            <div className="form-group">
              <label htmlFor="inlineFormInputName">Name</label>
              <input
                name="name"
                type="text"
                className="form-control"
                id="inlineFormInputName"
                value={this.state.exercise.name}
                onChange={this.handleChange}
              />
              {this.state.errors.name && <div className="alert alert-danger">{this.state.errors.name}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="inputGroupSelect01">Muscle</label>
              <select
                name="muscle_id"
                className="form-control"
                id="inputGroupSelect01"
                onChange={this.handleChange}
                >
                <option value=""/>
                {this.state.muscles.map(muscle => (
                  <option key={muscle._id} value={muscle._id}>
                    {muscle.name}
                  </option>
                ))}
              </select>
              {this.state.errors.muscle_id && <div className="alert alert-danger">{this.state.errors.muscle_id}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ExerciseNew;
