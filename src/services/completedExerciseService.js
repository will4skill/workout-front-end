import http from './httpService';

export function getCompletedExercise(id) {
  return http.get(`http://localhost:3900/api/completed_exercises/${id}`);
};

export function deleteCompletedExercise(id) {
  return http.delete(`http://localhost:3900/api/completed_exercises/${id}`);
};

export function saveCompletedExercise(completed_exercise) {
  const id = completed_exercise.workout_id;
  return http.post(`http://localhost:3900/api/workouts/${id}/completed_exercises`, completed_exercise);
};

export function updateCompletedExercise(completed_exercise) {
  const id = completed_exercise._id;
  return http.put(`http://localhost:3900/api/completed_exercises/${id}`, completed_exercise);
};
