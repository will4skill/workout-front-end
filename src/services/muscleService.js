import http from './httpService';

export function getMuscles() {
  return http.get("http://locahost:3900/api/muscles");
};

export function saveMuscle(muscle) {
  return http.post("http://locahost:3900/api/muscles", muscle);
};
