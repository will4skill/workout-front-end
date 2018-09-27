import jwtDecode from 'jwt-decode';
import http from './httpService';

http.setJwt(getJwt());

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
