import axios from "axios";

const api = axios.create({
  baseURL: "https://smart-milk-dairy-system.onrender.com/api",
});

export default api;