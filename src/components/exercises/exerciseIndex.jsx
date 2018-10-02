import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getExercises, deleteExercise } from '../../services/exerciseService.js';
import { getMuscles } from '../../services/muscleService.js';
import { getCurrentUser } from '../../services/authService';

class ExerciseIndex extends Component {
  state = {
    exercises: []
  };

  async componentDidMount() {
    const { data: exercises } = await getExercises();
    const { data: muscles } = await getMuscles();
    let muscle_names = [];

    for (let i = 0; i < muscles.length; i++) {
      muscle_names[muscles[i]._id] = muscles[i].name;
    }

    for (let exercise of exercises) {
      exercise.muscle_name = muscle_names[exercise.muscle_id];
    }

    this.setState({ exercises });
  }

  async handleDelete(selected_exercise) {
    if (!getCurrentUser().admin) {
      alert("Access Denied");
      return;
    }
    const old_exercises = this.state.exercises;
    const new_exercises = old_exercises.filter(exercise => {
      return exercise._id !== selected_exercise._id;
    });
    this.setState({ exercises: new_exercises });

    try {
      await deleteExercise(selected_exercise._id);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This exercise has already been deleted.");
      }
      this.setState({ exercises: old_exercises });
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Exercises</h1>
        <Link to="/exercises/new" className="btn btn-primary">
          New Exercise
        </Link>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Exercise</th>
              <th scope="col">Primary Muscle</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.exercises.map(exercise => (
              <tr key={exercise._id}>
                <td>{exercise.name}</td>
                <td>{exercise.muscle_name}</td>
                <td>
                  <Link
                    to={exercise._id + "/edit"}
                    className="btn btn-info btn-sm">
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(exercise)}
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

export default ExerciseIndex;
