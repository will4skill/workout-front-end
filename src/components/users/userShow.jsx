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
        <h3>Username: {this.state.user.name}</h3>
        <h3>Workouts Completed: {this.state.workouts.length}</h3>
        <Link
          to="/users/me/edit" className="btn btn-info btn-lg">
          Edit User
        </Link>
      </React.Fragment>
    );
  }
}

export default UserShow;
