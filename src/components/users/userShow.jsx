import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getWorkouts, deleteWorkout } from '../../services/workoutService.js';
import { getUser } from '../../services/userService.js';
import { reformatDate } from '../../utilities/dateUtility.js';

class UserShow extends Component {
  state = {
    user: {},
    workouts: []
  };

  async componentDidMount() {
    const { data: workouts } = await getWorkouts();
    const { data: user } = await getUser();
    this.setState({ workouts, user });
  }

  async handleDelete(selected_workout) {
    const old_workouts = this.state.workouts;
    const new_workouts = old_workouts.filter(workout => {
      return workout._id !== selected_workout._id;
    });
    this.setState({ workouts: new_workouts });

    try {
      await deleteWorkout(selected_workout._id);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This workout has already been deleted.");
      }
      this.setState({ workouts: old_workouts });
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Username: {this.state.user.name}</h1>
        <Link to="/workouts/new" className="btn btn-primary">
          New Workout
        </Link>
        <Link
          to="/users/me/edit" className="btn btn-info btn-sm">
          Edit User
        </Link>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Date</th>
              <th scope="col">Exercises</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.workouts.map(workout => (
              <tr key={workout._id}>
                <td>
                  <Link to={"/workouts/" + workout._id + "/show"}>
                    {workout._id}
                  </Link>
                </td>
                <td>{reformatDate(workout.date)}</td>
                <td>{workout.exercises.length}</td>
                <td>
                  <Link to={"/workouts/" + workout._id + "/edit"}
                    className="btn btn-info btn-sm">
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(workout)}
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

export default UserShow;
