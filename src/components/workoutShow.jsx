import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getWorkout } from '../services/workoutService.js';
import { deleteCompletedExercise } from '../services/completedExerciseService.js';

class WorkoutShow extends Component {
  state = {
    workout: {
      _id: "",
      date: "",
      exercises: []
    }
  };

  async componentDidMount() {
    const workout_id = this.props.match.params.id;
    try {
      const { data } = await getWorkout(workout_id);
      const workout = {
        _id: data._id,
        date: data.date,
        exercises: data.exercises
      };

      this.setState({ workout });
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  async handleDelete(selected_exercise) {
    const old_exercises = this.state.workout.exercises;
    const new_exercises = old_exercises.filter(exercise => {
      return exercise._id !== selected_exercise._id;
    });

    const workout = { ...this.state.workout };
    workout.exercises = new_exercises;
    this.setState({ workout });

    try {
      await deleteCompletedExercise(selected_exercise._id);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This exercise has already been deleted.");
      }
      workout.exercises = old_exercises
      this.setState({ workout });
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Workout ID: {this.state.workout._id}</h1>
        <Link
          to={"/workouts/" + this.props.match.params.id + "/completed_exercise/new"}
          className="btn btn-primary">
          New Exercise
        </Link>
        <ul className="list-group">
          {this.state.workout.exercises.map(exercise => (
            <li key={exercise._id} className="list-group-item">
              {exercise.exercise_id.name} ||
              Sets: {exercise.sets} ||
              Reps: {exercise.reps} ||
              Load: {exercise.load}
              <Link
                to={"/completed_exercise/" + exercise._id + "/edit"}
                className="btn btn-info btn-sm">
                Edit
              </Link>
              <button
                onClick={() => this.handleDelete(exercise)}
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
