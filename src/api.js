import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = (username, password) => 
  api.post('login/', { username, password });

export const register = (username, email, password) => 
  api.post('register/', { username, email, password });

export const getChildren = () => api.get('children/');
export const addChild = (name) => api.post('children/', { name });

export const getReservations = () => api.get('reservations/');
export const addReservation = (childId, time) => 
  api.post('reservations/', { child: childId, time });

export const getOccupancy = () => api.get('occupancy/');

export default api;