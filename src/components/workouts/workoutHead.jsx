import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { reformatDate } from '../../utilities/dateUtility.js';

const WorkoutBody = ({ workout, onWorkoutSelect, onWorkoutDelete }) => {
  const btn = "btn btn-";
  const fa = "fa fa-";
  const url_prefix = `/workouts/${workout._id}`;
  return (
    <div
      className="card-header"
      type="button"
      onClick={() => onWorkoutSelect(workout)}>
      <h5>
        <Link to={`${url_prefix}/show`}>{reformatDate(workout.date)}</Link>
        <span className="badge badge-pill badge-primary">
          {workout.exercises.length}
        </span>
        <Link to={`${url_prefix}/edit`} className={`${btn}info`}>
          <i className={`${fa}pencil-square-o`}></i>
        </Link>
        <Link to={`${url_prefix}/completed_exercise/new`} className={`${btn}success`}>
          <i className={`${fa}plus`}></i>
        </Link>
        <button onClick={() => onWorkoutDelete(workout)} className={`${btn}danger`}>
          <i className={`${fa}trash`}></i>
        </button>
      </h5>
    </div>
  );
};

WorkoutBody.propTypes = {
  workout: PropTypes.object.isRequired,
  onWorkoutSelect: PropTypes.func.isRequired,
  onWorkoutDelete: PropTypes.func.isRequired,
};

export default WorkoutBody;
