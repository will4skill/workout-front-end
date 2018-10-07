import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getWorkouts, deleteWorkout } from '../../services/workoutService.js';
import { reformatDate } from '../../utilities/dateUtility.js';
import "./workout.css";
import Pagination from "../reusable/pagination";

class WorkoutIndex extends Component {
  state = {
    workouts: [],
    current_page: 1,
    sort_direction: "desc"
  };

  async componentDidMount() {
    const { data: workouts } = await getWorkouts();
    workouts.sort(this.compareDates);
    this.setState({ workouts });
  }

  compareDates(a, b) {
    return new Date(b.date) - new Date(a.date);
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

  handlePageChange = (page_number, page_size) => {
    const length = this.state.workouts.length;
    const number_of_pages = Math.ceil(length / page_size);
    if (page_number <= 0 ||  page_number > number_of_pages) {
      return;
    }
    this.setState({ current_page: page_number });
  };

  toggleSort = () => {
    const old_direction = this.state.sort_direction;
    const workouts = [ ...this.state.workouts ];
    workouts.reverse();
    let sort_direction;
    sort_direction = old_direction === "desc" ? "asc" : "desc";

    this.setState({ workouts, sort_direction });
  }

  generatePage(page, page_size) {
    let workouts = [ ...this.state.workouts ];
    const start_index = (page-1)*page_size;
    const end_index = start_index + page_size;
    const workout_slice = workouts.slice(start_index,end_index);
    return workout_slice;
  }

  render() {
    const page_size = 5;
    const { sort_direction, current_page } = this.state;

    return (
      <React.Fragment>
        <Link to="/workouts/new" className="btn btn-primary">
          New Workout
        </Link>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Workout ID</th>
              <th scope="col" onClick={this.toggleSort} className="sort">
                {"Date "}
                <i className={"fa fa-sort-" + sort_direction}></i>
              </th>
              <th scope="col">Exercises</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.generatePage(current_page, page_size).map(workout => (
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

        <Pagination
          page_size={page_size}
          item_count={this.state.workouts.length}
          current_page={this.state.current_page}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default WorkoutIndex;
