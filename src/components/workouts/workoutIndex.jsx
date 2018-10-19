import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getWorkouts, deleteWorkout } from '../../services/workoutService.js';
import { deleteCompletedExercise } from '../../services/completedExerciseService.js';
import { getMuscles } from '../../services/muscleService.js';
import { reformatDate } from '../../utilities/dateUtility.js';
import { compareDates } from '../../utilities/sortUtility.js';
import "./workout.css";
import Pagination from '../reusable/pagination';
import Spinner from '../reusable/spinner';
import MuscleMap from '../reusable/muscleMap';

class WorkoutIndex extends Component {
  state = {
    workouts: [],
    current_page: 1,
    sort_direction: "desc",
    current_workout: {},
    muscles: []
  };

  async componentDidMount() {
    const { data: muscles } = await getMuscles();
    const { data: workouts } = await getWorkouts();
    workouts.sort(compareDates);
    this.setState({ workouts, muscles });
  }

  async handleWorkoutDelete(selected_workout) {
    const response = window.confirm("Are you sure you want to delete this workout?.");
    if (response === false) {
      return;
    }

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

  async handleExerciseDelete(workout_index, selected_completed_exercise) {
    const response = window.confirm("Are you sure you want to delete this exercise?.");
    if (response === false) {
      return;
    }
    const old_completed_exercises = this.state.workouts[workout_index].exercises;

    const new_completed_exercises = old_completed_exercises.filter(completed_exercise => {
      return completed_exercise._id !== selected_completed_exercise._id;
    });

    const workouts = [ ...this.state.workouts ];
    workouts[workout_index].exercises = new_completed_exercises;
    this.setState({ workouts });

    try {
      await deleteCompletedExercise(selected_completed_exercise._id);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This exercise has already been deleted.");
      }
      workouts[workout_index].exercises = old_completed_exercises
      this.setState({ workouts });
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

  handleWorkoutSelect(workout) {
    if (workout === this.state.current_workout) {
      workout = {};
    }
    this.setState({ current_workout: workout });
  }

  getSelectedMuscles() {
    let muscle_ids = [];

    if (this.state.current_workout.exercises === undefined) {
      return [];
    }
    const completed_exercises = this.state.current_workout.exercises;

    const muscles = this.state.muscles;
    let muscle_names = {};
    let selected_muscles = [];

    for (let completed_exercise of completed_exercises) {
      muscle_ids.push(completed_exercise.exercise_id.muscle_id);
    }
    for (let muscle of muscles){
      muscle_names[muscle._id] = muscle.name;
    }
    for (let muscle_id of muscle_ids) {
      let name = muscle_names[muscle_id];
      selected_muscles.push(name);
    }
    return selected_muscles;
  }

  render() {
    const page_size = 5;
    const { sort_direction, current_page } = this.state;

    return (
      <Spinner ready={!!this.state.workouts.length}>
        <MuscleMap
          current_muscles={this.getSelectedMuscles()}
          onMuscleSelect={() => {}}
        />
        <Link to="/workouts/new" className="btn btn-primary">
          New Workout
        </Link>
        <button onClick={this.toggleSort} className="sort">
          {"Sort by date "}
          <i className={"fa fa-sort-" + sort_direction}></i>
        </button>

        {this.generatePage(current_page, page_size).map((workout,index) => (
          <div className="accordion" key={workout._id}>
            <div className="card">
              <div
                className="card-header"
                id="headingOne"
                type="button"
                data-target="#collapseOne"
                onClick={() => this.handleWorkoutSelect(workout)}
              >
                <h5 className="mb-0">
                  <Link to={"/workouts/" + workout._id + "/show"}>
                    {reformatDate(workout.date)}
                  </Link>
                  <span className="badge badge-pill badge-primary">
                    {workout.exercises.length}
                  </span>
                  <Link to={"/workouts/" + workout._id + "/edit"}
                    className="btn btn-info">
                    <i className="fa fa-pencil-square-o"></i>
                    {/* <i className="fa fa-cog"></i> */}
                  </Link>
                  <Link to={"/workouts/" + workout._id + "/completed-exercise/new"}
                    className="btn btn-success">
                    <i className="fa fa-plus"></i>
                  </Link>
                  <button
                    onClick={() => this.handleWorkoutDelete(workout)}
                    className="btn btn-danger">
                    <i className="fa fa-trash"></i>
                  </button>
                </h5>
              </div>
              {workout.exercises.map(exercise => (
                <div key={exercise._id} id="collapseOne" className={workout === this.state.current_workout ? "custom-show" : "custom-hide-2"}>
                  <div className="card-body">
                    {exercise.exercise_id.name}: {exercise.sets}x{exercise.reps} {exercise.load}lbs {exercise.exercise_type}
                    {exercise.unilateral ? <span className="badge badge-secondary">U</span> : ""}
                    {exercise.mum ? <span className="badge badge-secondary">M</span> : ""}
                    <Link to={"/completed_exercise/" + exercise._id + "/edit"}
                      className="btn btn-info btn-sm">
                      <i className="fa fa-pencil-square-o"></i>
                      {/* <i className="fa fa-cog"></i> */}
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleExerciseDelete(index, exercise)}
                      >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <Pagination
          page_size={page_size}
          item_count={this.state.workouts.length}
          current_page={this.state.current_page}
          onPageChange={this.handlePageChange}
        />
      </Spinner>
    );
  }
}

export default WorkoutIndex;
