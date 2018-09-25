import http from './httpService';

export function getExercises() {
  return http.get("http://localhost:3900/api/exercises");
};

export function getExercise(exercise_id) {
  return http.get(`http://localhost:3900/api/exercises/${exercise_id}`);
};

export function saveExercise(exercise) {
  const obj = { name: exercise.name, muscle_id: exercise.muscle_id };
  return http.post("http://localhost:3900/api/exercises", obj);
};

export function deleteExercise(exercise_id) {
  return http.delete(`http://localhost:3900/api/exercises/${exercise_id}`);
};

export function updateExercise(exercise) {
  const id = exercise._id;
  const obj = { name: exercise.name, muscle_id: exercise.muscle_id };
  return http.put(`http://localhost:3900/api/exercises/${id}`, obj);
};
