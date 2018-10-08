import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userService.js';
import { getWorkouts } from '../../services/workoutService.js';

class UserShow extends Component {
  state = {
    user: {},
    workouts: []
  };

  async componentDidMount() {
    const { data: user } = await getUser();
    const { data: workouts } = await getWorkouts();
    this.setState({ user, workouts });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Username: {this.state.user.name}</h1>
        <h1>Workouts Completed: {this.state.workouts.length}</h1>
        <Link
          to="/users/me/edit" className="btn btn-info btn-sm">
          Edit User
        </Link>
      </React.Fragment>
    );
  }
}

export default UserShow;
