import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getExercises, deleteExercise } from '../../services/exerciseService.js';
import { getMuscles } from '../../services/muscleService.js';
import { getCurrentUser } from '../../services/authService';
import MuscleMap from '../reusable/muscleMap';
import Spinner from '../reusable/spinner';
import { compareNames } from '../../utilities/sortUtility.js';

class ExerciseIndex extends Component {
  state = {
    exercises: [],
    muscles: [],
    current_muscle: {}
  };

  async componentDidMount() {
    const { data: exercises } = await getExercises();
    exercises.sort(compareNames);
    const { data: muscles } = await getMuscles();
    let muscle_names = [];

    for (let i = 0; i < muscles.length; i++) {
      muscle_names[muscles[i]._id] = muscles[i].name;
    }

    for (let exercise of exercises) {
      exercise.muscle_name = muscle_names[exercise.muscle_id];
    }

    this.setState({ exercises, muscles });
  }

  async handleDelete(selected_exercise) {
    if (!getCurrentUser().admin) {
      alert("Access Denied, Admin Only");
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

  generateExercises() {
    let exercises = this.state.exercises;
    const muscle_name = this.state.current_muscle.name;
    if (muscle_name) {
      exercises = exercises.filter(exercise => exercise.muscle_name === muscle_name);
    }
    return exercises;
  }

  handleMuscleSelect = (muscle_name) => {
    const muscles = this.state.muscles;
    const muscle = muscles.find(muscle => muscle.name === muscle_name);
    this.setState({ current_muscle: muscle });
  };

  render() {
    return (
      <Spinner ready={!!this.state.exercises.length}>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h1>Exercises</h1>
              <h4>Selected Muscle: {this.state.current_muscle.name}</h4>
              <MuscleMap
                current_muscles={[this.state.current_muscle.name]}
                onMuscleSelect={this.handleMuscleSelect}
              />
            </div>
            <div className="col-sm">
              <Link to="/exercises/new" className="btn btn-primary">
                New Exercise
              </Link>
              <table className="table table-sm table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Exercise</th>
                    <th scope="col">Primary Muscle</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {this.generateExercises().map(exercise => (
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
            </div>
          </div>
        </div>
      </Spinner>
    );
  }
}

export default ExerciseIndex;
