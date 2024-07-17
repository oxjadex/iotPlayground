import axios from "axios";

const API_URL = "http://124.54.6.98/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized, please login again.");
    }
    return Promise.reject(error);
  }
);

export const login = async (username, password) => {
  try {
    const response = await api.post("/login/", { username, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await api.post("/register/", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const getChildren = async () => {
  try {
    const response = await api.get("/children/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch children:", error);
    throw error;
  }
};

export const addChild = async (name) => {
  try {
    const response = await api.post("/children/", { name });
    return response.data;
  } catch (error) {
    console.error("Failed to add child:", error);
    throw error;
  }
};

export const getReservations = async () => {
  try {
    const response = await api.get("/reservations/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
    throw error;
  }
};

export const addReservation = async (childId, time) => {
  try {
    const response = await api.post("/reservations/", { child: childId, time });
    return response.data;
  } catch (error) {
    console.error("Failed to add reservation:", error);
    throw error;
  }
};

export const getOccupancy = async () => {
  try {
    const response = await api.get("/occupancy/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch occupancy:", error);
    throw error;
  }
};

export default api;
