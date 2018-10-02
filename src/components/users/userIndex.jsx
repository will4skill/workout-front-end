import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from '../../services/userService.js';

class UserIndex extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
    const { data: users } = await getUsers();
    this.setState({ users });
  }

  async handleDelete(selected_user) {
    const old_users = this.state.users;
    const new_users = old_users.filter(user => {
      return user._id !== selected_user._id;
    });
    this.setState({ users: new_users });

    try {
      await deleteUser(selected_user._id);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This user has already been deleted.");
      }
      this.setState({ users: old_users });
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Users</h1>
        <Link to="/users/new" className="btn btn-primary">
          New User
        </Link>
        <ul className="list-group">
          {this.state.users.map(user => (
            <li key={user._id} className="list-group-item">
              {user.name} ||| {user.email} ||| admin: {user.admin}
              <button
                onClick={() => this.handleDelete(user)}
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

export default UserIndex;
