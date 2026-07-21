import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:8001/api", // Update the port to match your backend server
});

export default api;
