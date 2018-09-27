import http from './httpService';

export function getWorkouts() {
  return http.get("http://localhost:3900/api/workouts");
};

export function getWorkout(workout_id) {
  return http.get(`http://localhost:3900/api/workouts/${workout_id}`);
};

export function saveWorkout(workout) {
  return http.post("http://localhost:3900/api/workouts", { date: workout.date });
};

export function deleteWorkout(workout_id) {
  return http.delete(`http://localhost:3900/api/workouts/${workout_id}`);
};

export function updateWorkout(workout) {
  const id = workout._id;
  return http.put(`http://localhost:3900/api/workouts/${id}`, { date: workout.date });
};
