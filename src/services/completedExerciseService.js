import http from './httpService';

export function getCompletedExercise(exercise_id) {
  return http.get(`http://localhost:3900/api/completed_exercises/${exercise_id}`);
};

export function deleteCompletedExercise(exercise_id) {
  return http.delete(`http://localhost:3900/api/completed_exercises/${exercise_id}`);
};

export function saveCompletedExercise(completed_exercise) {
  const id = completed_exercise.workout_id;
  return http.post(`http://localhost:3900/api/workouts/${id}/completed_exercises`, completed_exercise);
};

export function updateCompletedExercise(exercise) {
  const id = exercise._id;
  const obj = { name: exercise.name, muscle_id: exercise.muscle_id };
  return http.put(`http://localhost:3900/api/exercises/${id}`, obj);
};
