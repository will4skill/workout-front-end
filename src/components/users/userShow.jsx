import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getWorkouts, deleteWorkout } from '../../services/workoutService.js';
import { getUser } from '../../services/userService.js';
import { reformatDate } from '../../utilities/dateUtility.js';
import "./user.css";

class UserShow extends Component {
  state = {
    user: {},
    workouts: [],
    current_page: 1,
    sort_direction: "desc"
  };

  async componentDidMount() {
    const { data: workouts } = await getWorkouts();
    workouts.sort(this.compareDates);
    const { data: user } = await getUser();
    this.setState({ workouts, user });
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

  generatePage(page, page_size) {
    let workouts = [ ...this.state.workouts ];
    const start_index = (page-1)*page_size;
    const end_index = start_index + page_size;
    const workout_slice = workouts.slice(start_index,end_index);
    return workout_slice;
  }

  pageNumbers(page_size) {
    const length = this.state.workouts.length;
    const number_of_pages = Math.ceil(length / page_size);
    let page_number_array = [];

    for (let i = 1; i <= number_of_pages; i++) {
      page_number_array[i-1] = i;
    }
    return page_number_array;
  }

  handlePageChange(page_number, page_size) {
    const length = this.state.workouts.length;
    const number_of_pages = Math.ceil(length / page_size);
    if (page_number <= 0 ||  page_number > number_of_pages) {
      return;
    }
    this.setState({ current_page: page_number });
  }

  toggleSort = () => {
    const old_direction = this.state.sort_direction;
    const workouts = [ ...this.state.workouts ];
    workouts.reverse();
    let sort_direction;
    sort_direction = old_direction === "desc" ? "asc" : "desc";

    this.setState({ workouts, sort_direction });
  }

  render() {
    const pg_size = 5;
    const pg_num_array = this.pageNumbers(pg_size);
    const sort_direction = this.state.sort_direction;

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
              <th
                scope="col"
                onClick={this.toggleSort}
                className="sort"
              >
                {"Date "}
                <i className={"fa fa-sort-" + this.state.sort_direction}></i>
              </th>
              <th scope="col">Exercises</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.generatePage(this.state.current_page, pg_size).map(workout => (
              <tr key={workout._id}>
                <td>{workout._id}</td>
                <td>{reformatDate(workout.date)}</td>
                <td>
                  <Link to={"/workouts/" + workout._id + "/show"}>
                    {workout.exercises.length}
                  </Link>
                </td>
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
        {(pg_size <= this.state.workouts.length) &&
          <nav>
            <ul className="pagination">
              <li
                className ={this.state.current_page === 1 ?
                  "page-item disabled" : "page-item" }
                onClick={() => this.handlePageChange(this.state.current_page - 1, pg_size)}
                >
                <a className="page-link">
                  <span>&laquo;</span>
                </a>
              </li>
              {pg_num_array.map(page_number => (
                <li
                  className={this.state.current_page === page_number ?
                    "page-item active" : "page-item" }
                  key={page_number}
                  onClick={() => this.handlePageChange(page_number, pg_size)}
                >
                  <a className="page-link">{page_number}</a>
                </li>
              ))}
              <li
                className ={this.state.current_page === pg_num_array.length ?
                  "page-item disabled" : "page-item" }
                onClick={() => this.handlePageChange(this.state.current_page + 1, pg_size)}
                >
                <a className="page-link">
                  <span>&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>}
      </React.Fragment>
    );
  }
}

export default UserShow;
