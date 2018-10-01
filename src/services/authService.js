import jwtDecode from 'jwt-decode';
import http from './httpService';

http.setJwt(getJwt());

export async function login(email, password) {
  const obj = { email, password };
  const url = "http://localhost:3900/api/auth"
  const { data: jwt } = await http.post(http.post(url, obj));
  localStorage.setItem("token", jwt);
}

export function logout() {
  localStorage.removeItem("token");
}

export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (execption) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem("token");
}
