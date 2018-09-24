import http from './httpService';

export function getMuscles() {
  return http.get("http://localhost:3900/api/muscles");
};

export function getMuscle(muscle_id) {
  return http.get(`http://localhost:3900/api/muscles/${muscle_id}`);
};

export function saveMuscle(muscle) {
  return http.post("http://localhost:3900/api/muscles", { name: muscle });
};

export function deleteMuscle(muscle_id) {
  return http.delete(`http://localhost:3900/api/muscles/${muscle_id}`);
};

export function updateMuscle(muscle) {
  const id = muscle._id;
  const name = muscle.name
  return http.put(`http://localhost:3900/api/muscles/${id}`, { name: name });
};
