import axios from "axios";

const api = axios.create({
  baseURL: "https://smart-parking-manager.onrender.com/api",
});

export default api;