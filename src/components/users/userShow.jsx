import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userService.js';
import { getWorkouts } from '../../services/workoutService.js';
import Spinner from '../reusable/spinner';

class UserShow extends Component {
  state = {
    user: {},
    workouts: [],
    api_response: false
  };

  async componentDidMount() {
    const { data: user } = await getUser();
    const { data: workouts } = await getWorkouts();
    this.setState({ user, workouts, api_response: true });
  }

  render() {
    return (
      <Spinner ready={this.state.api_response}>
        <h3>Username: {this.state.user.name}</h3>
        <h3>Workouts Completed: {this.state.workouts.length}</h3>
        <Link
          to="/users/me/edit" className="btn btn-info btn-lg">
          Edit User
        </Link>
      </Spinner>
    );
  }
}

export default UserShow;
