import { API_URL } from "../config";
import axios from "./axios";

export const registerRequest = async (user) =>
  axios.post('http://localhost:5000/api/auth/registro', user);

export const loginRequest = async (user) =>
  axios.post('http://localhost:5000/api/auth/login', user);

export const verifyTokenRequest = async () =>
  axios.get(`${API_URL}/auth/verify`);

export const passwordRequest = async () =>
  axios.get(`${API_URL}/auth/olvide-password`);
