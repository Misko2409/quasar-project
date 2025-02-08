import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Dodajemo JWT token u svaki zahtjev ako postoji
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Ako server vrati 401 (Unauthorized), brišemo token i preusmjeravamo korisnika na login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Funkcija za dohvaćanje korisničkog profila
export const getUserProfile = async () => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    console.error("Greška pri dohvaćanju korisničkih podataka:", error);
    return null;
  }
};

export const getPerformers = async () => {
  try {
    const response = await api.get("/performers");
    return response.data;
  } catch (error) {
    console.error("Greška pri dohvaćanju izvođača:", error);
    return [];
  }
};

// Funkcija za ažuriranje korisničkog profila
export const updateUserProfile = async (data) => {
  try {
    const response = await api.put("/user", data);
    return response.data;
  } catch (error) {
    console.error("Greška pri ažuriranju profila:", error);
    return null;
  }
};

// Funkcija za odjavu korisnika
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

// Registriramo API u Vue aplikaciju
export default boot(({ app }) => {
  app.config.globalProperties.$api = api;
});

export { api };
