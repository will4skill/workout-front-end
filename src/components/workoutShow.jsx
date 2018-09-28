import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getWorkout } from '../services/workoutService.js';
import { deleteCompletedExercise } from '../services/completedExerciseService.js';

class WorkoutShow extends Component {
  state = {
    workout: {
      _id: "",
      date: "",
      completed_exercises: []
    }
  };
  workout_id = this.props.match.params.id;

  async componentDidMount() {
    try {
      const { data } = await getWorkout(this.workout_id);
      const workout = {
        _id: data._id,
        date: data.date,
        completed_exercises: data.exercises
      };

      this.setState({ workout });
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  async handleDelete(selected_completed_exercise) {
    const old_completed_exercises = this.state.workout.completed_exercises;
    const new_completed_exercises = old_completed_exercises.filter(completed_exercise => {
      return completed_exercise._id !== selected_completed_exercise._id;
    });

    const workout = { ...this.state.workout };
    workout.completed_exercises = new_completed_exercises;
    this.setState({ workout });

    try {
      await deleteCompletedExercise(selected_completed_exercise._id);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This exercise has already been deleted.");
      }
      workout.completed_exercises = old_completed_exercises
      this.setState({ workout });
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Workout ID: {this.workout_id}</h1>
        <Link
          to={"/workouts/" + this.workout_id + "/completed_exercise/new"}
          className="btn btn-primary">
          New Exercise
        </Link>
        <ul className="list-group">
          {this.state.workout.completed_exercises.map(completed_exercise => (
            <li key={completed_exercise._id} className="list-group-item">
              {completed_exercise.exercise_id.name} ||
              Sets: {completed_exercise.sets} ||
              Reps: {completed_exercise.reps} ||
              Load: {completed_exercise.load}
              <Link
                to={"/completed_exercise/" + completed_exercise._id + "/edit"}
                className="btn btn-info btn-sm">
                Edit
              </Link>
              <button
                onClick={() => this.handleDelete(completed_exercise)}
                className="btn btn-danger btn-sm">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default WorkoutShow;
