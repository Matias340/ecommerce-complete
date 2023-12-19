import { API_URL } from "../config";
import axios from "./axios";

export const registerRequest = async (user) =>
  axios.post(`${API_URL}/auth/registro`, user);

export const loginRequest = async (user) =>
  axios.post(`${API_URL}/auth/login`, user);

export const verifyTokenRequest = async () =>
  axios.get(`${API_URL}/auth/verify`);

export const passwordRequest = async () =>
  axios.get(`${API_URL}/auth/olvide-password`);
