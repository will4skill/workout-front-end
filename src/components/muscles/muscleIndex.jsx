import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getMuscles, deleteMuscle } from '../../services/muscleService.js';
import { getCurrentUser } from '../../services/authService';

class MuscleIndex extends Component {
  state = {
    muscles: []
  };

  async componentDidMount() {
    const { data: muscles } = await getMuscles();
    this.setState({ muscles });
  }

  async handleDelete(selected_muscle) {
    if (!getCurrentUser().admin) {
      alert("Access Denied");
      return;
    }

    const old_muscles = this.state.muscles;
    const new_muscles = old_muscles.filter(muscle => {
      return muscle._id !== selected_muscle._id;
    });
    this.setState({ muscles: new_muscles });

    try {
      await deleteMuscle(selected_muscle._id);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This muscle has already been deleted.");
      }
      this.setState({ muscles: old_muscles });
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Muscles</h1>
        <Link to="/muscles/new" className="btn btn-primary">New Muscle</Link>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Muscle</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.muscles.map(muscle => (
              <tr key={muscle._id}>
                <td>{muscle.name}</td>
                <td>
                  <Link
                    to={muscle._id + "/edit"}
                    className="btn btn-info btn-sm">
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(muscle)}
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

export default MuscleIndex;
