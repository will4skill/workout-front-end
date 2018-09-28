import http from './httpService';

export function getCompletedExercise(exercise_id) {
  return http.get(`http://localhost:3900/api/completed_exercises/${exercise_id}`);
};

export function deleteCompletedExercise(exercise_id) {
  return http.delete(`http://localhost:3900/api/completed_exercises/${exercise_id}`);
};

// export function updateExercise(exercise) {
//   const id = exercise._id;
//   const obj = { name: exercise.name, muscle_id: exercise.muscle_id };
//   return http.put(`http://localhost:3900/api/exercises/${id}`, obj);
// };
