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
        <Link
          to="/muscles/new"
          className="btn btn-primary"
        >
          New Muscle
        </Link>
        <ul className="list-group">
          {this.state.muscles.map(muscle => (
            <li key={muscle._id} className="list-group-item">
              {muscle.name}
              <Link
                to={muscle._id + "/edit"}
                className="btn btn-info btn-sm">
                Edit
              </Link>
              <button
                onClick={() => this.handleDelete(muscle)}
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

export default MuscleIndex;
