import http from './httpService';

export function getMuscles() {
  return http.get("http://localhost:3900/api/muscles");
};

export function saveMuscle(muscle) {
  return http.post("http://localhost:3900/api/muscles", { name: muscle });
};

export function deleteMuscle(muscle_id) {
  return http.delete(`http://localhost:3900/api/muscles/${muscle_id}`);
};
