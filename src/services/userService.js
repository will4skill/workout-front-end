import http from './httpService';

export function getUsers() {
  return http.get("http://localhost:3900/api/users");
};

export function getUser() {
  return http.get("http://localhost:3900/api/users/me");
};

export function saveUser(user) {
  const obj = {
    name: user.name,
    email: user.email,
    password: user.password
  };
  return http.post("http://localhost:3900/api/users", obj);
};

export function deleteUser(user_id) {
  return http.delete(`http://localhost:3900/api/users/${user_id}`);
};

export function updateUser(user) {
  const obj = {
    name: user.name,
    email: user.email
  };
  return http.put("http://localhost:3900/api/users/me", obj);
};
