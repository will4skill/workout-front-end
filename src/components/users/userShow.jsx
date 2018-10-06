import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userService.js';

class UserShow extends Component {
  state = {
    user: {}
  };

  async componentDidMount() {
    const { data: user } = await getUser();
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Username: {this.state.user.name}</h1>
        <Link
          to="/users/me/edit" className="btn btn-info btn-sm">
          Edit User
        </Link>
      </React.Fragment>
    );
  }
}

export default UserShow;
