import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const WorkoutBody = ({ workout, current_workout, onExerciseDelete, index }) => {
  const btn = "btn-sm btn btn-";
  const fa = "fa fa-";
  const badge = "badge badge-secondary";

  function getCSSClass(workout, current_workout) {
    return workout === current_workout ? "custom-show" : "custom-hide-2"
  }

  function formatInfo(ex) {
    const info = `${ex.exercise_id.name}: ${ex.sets}x${ex.reps} ${ex.load}lbs`;
    const type = ex.exercise_type;
    return `${info} ${type}`;
  }
  
  return (
    <div>
      {workout.exercises.map(exercise => (
        <div key={exercise._id} className={getCSSClass(workout, current_workout)}>
          <div className="card-body">
            {formatInfo(exercise)}
            {exercise.unilateral ? <span className={badge}> U </span> : ""}
            {exercise.mum ? <span className={badge}> M</span> : ""}
            <Link
              to={`/completed_exercise/${exercise._id}/edit`}
              className={`${btn}info`}>
              <i className={`${fa}pencil-square-o`}></i>
            </Link>
            <button
              className={`${btn}danger`}
              onClick={() => onExerciseDelete(index, exercise)}
              >
              <i className={`${fa}trash`}></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

WorkoutBody.propTypes = {
  workout: PropTypes.object.isRequired,
  current_workout: PropTypes.object.isRequired,
  onExerciseDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default WorkoutBody;