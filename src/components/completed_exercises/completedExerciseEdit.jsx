import React, { Component } from 'react';
import Joi from 'joi-browser';
import { getCompletedExercise, updateCompletedExercise } from '../../services/completedExerciseService.js';
import { getExercises } from '../../services/exerciseService.js';

class CompletedExerciseEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed_exercise: {
        _id: "",
        exercise_id: "",
        exercise_type: "",
        sets: 0,
        reps: 0,
        load: 0,
        unilateral: false,
        mum: false
      },
      exercises: [],
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  exercise_types = [
    {name: 'bodyweight', id: 1},
    {name: 'free weight', id: 2},
    {name: 'cable', id: 3},
    {name: 'machine', id: 4}
  ];

  schema = {
    _id: Joi.string(),
    workout_id: Joi.string().required().label("Workout"),
    exercise_id: Joi.string().required().label("Exercise"),
    exercise_type: Joi.string().label("Exercise Type"),
    sets: Joi.number().required().min(1).label("Sets"),
    reps: Joi.number().required().min(1).label("Reps"),
    load: Joi.number().min(0).label("Added Load"),
    unilateral: Joi.boolean().label("Unilateral"),
    mum: Joi.boolean().label("Made up missed reps")
  };

  async componentDidMount() {
    const { data } = await getCompletedExercise(this.props.match.params.id);
    const completed_exercise = {
      _id: data._id,
      workout_id: data.workout_id,
      exercise_id: data.exercise_id,
      exercise_type: data.exercise_type,
      sets: data.sets,
      reps: data.reps,
      load: data.load,
      unilateral: data.unilateral,
      mum: data.mum
    };
    const { data: exercises } = await getExercises();
    this.setState({ completed_exercise, exercises });
  }

  validate() {
    const completed_exercise = this.state.completed_exercise;
    const options = { abortEarly: false };
    const { error: errors } = Joi.validate(completed_exercise, this.schema, options);
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
    const target = event.currentTarget;

    const value = target.type === 'checkbox' ? target.checked : target.value;
    const errorMessage = this.validateProperty(target);
    if (errorMessage) {
      errors[target.name] = errorMessage;
    } else {
      delete errors[target.name];
    }

    const completed_exercise = { ...this.state.completed_exercise };
    completed_exercise[target.name] = value;

    this.setState({ completed_exercise, errors });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }

    try {
      await updateCompletedExercise(this.state.completed_exercise);
      this.props.history.push("/workouts/" + this.state.completed_exercise.workout_id + "/show");
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
            <h4>Edit Completed Exercise</h4>
            <div className="form-group">
              <label htmlFor="inputGroupExerciseId">Exercise</label>
              <select
                value={this.state.completed_exercise.exercise_id}
                name="exercise_id"
                className="form-control"
                id="inputGroupExerciseId"
                onChange={this.handleChange}
                >
                <option value=""/>
                {this.state.exercises.map(exercise => (
                  <option key={exercise._id} value={exercise._id}>
                    {exercise.name}
                  </option>
                ))}
              </select>
              {this.state.errors.exercise_id && <div className="alert alert-danger">{this.state.errors.exercise_id}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="inputGroupExerciseType">Exercise Types</label>
              <select
                value={this.state.completed_exercise.exercise_type}
                name="exercise_type"
                className="form-control"
                id="inputGroupExerciseType"
                onChange={this.handleChange}
                >
                <option value=""/>
                {this.exercise_types.map(type => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
              {this.state.errors.exercise_type && <div className="alert alert-danger">{this.state.errors.exercise_type}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputSets">Sets</label>
              <input
                name="sets"
                type="number"
                className="form-control"
                id="exampleInputSets"
                value={this.state.completed_exercise.sets}
                onChange={this.handleChange}
              />
              {this.state.errors.sets && <div className="alert alert-danger">{this.state.errors.sets}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputReps">Reps</label>
              <input
                name="reps"
                type="number"
                className="form-control"
                id="exampleInputReps"
                value={this.state.completed_exercise.reps}
                onChange={this.handleChange}
              />
              {this.state.errors.reps && <div className="alert alert-danger">{this.state.errors.reps}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputLoad">Load</label>
              <input
                name="load"
                type="number"
                className="form-control"
                id="exampleInputLoad"
                value={this.state.completed_exercise.load}
                onChange={this.handleChange}
              />
              {this.state.errors.load && <div className="alert alert-danger">{this.state.errors.load}</div>}
            </div>
            <div className="form-group form-check">
              <input
                name="unilateral"
                type="checkbox"
                checked={this.state.completed_exercise.unilateral}
                className="form-check-input"
                htmlFor="exampleCheck1"
                value={this.state.completed_exercise.unilateral}
                onChange={this.handleChange}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">Unilateral?</label>
              {this.state.errors.unilateral && <div className="alert alert-danger">{this.state.errors.unilateral}</div>}
            </div>
            <div className="form-group form-check">
              <input
                name="mum"
                type="checkbox"
                checked={this.state.completed_exercise.mum}
                className="form-check-input"
                id="exampleCheck2"
                value={this.state.completed_exercise.mum}
                onChange={this.handleChange}
              />
              <label className="form-check-label" htmlFor="exampleCheck2">MUM?</label>
              {this.state.errors.mum && <div className="alert alert-danger">{this.state.errors.mum}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CompletedExerciseEdit;
