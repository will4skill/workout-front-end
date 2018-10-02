import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getWorkout } from '../../services/workoutService.js';
import { deleteCompletedExercise } from '../../services/completedExerciseService.js';

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

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Exercise</th>
              <th scope="col">Load</th>
              <th scope="col">Sets</th>
              <th scope="col">Reps</th>
              <th scope="col">Type</th>
              <th scope="col">Unilateral?</th>
              <th scope="col">MUM?</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.workout.completed_exercises.map(completed_exercise => (
              <tr key={completed_exercise._id}>
                <td>{completed_exercise.exercise_id.name}</td>
                <td>{completed_exercise.load}</td>
                <td>{completed_exercise.sets}</td>
                <td>{completed_exercise.reps}</td>
                <td>{completed_exercise.exercise_type}</td>
                <td>{completed_exercise.unilateral.toString()}</td>
                <td>{completed_exercise.mum.toString()}</td>
                <td>
                  <Link to={"/completed_exercise/" + completed_exercise._id + "/edit"}
                    className="btn btn-info btn-sm">
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(completed_exercise)}
                    className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default WorkoutShow;
