import api from "../api/api";

// Dashboard
export const getDashboard = () => api.get("/dashboard");

// Slots
export const getSlots = () => api.get("/slots");

export const getAvailableSlots = () =>
  api.get("/slots/available");

// History
export const getHistory = () =>
  api.get("/vehicles/history");

// Vehicle Entry
export const vehicleEntry = (data) =>
  api.post("/vehicles/entry", data);

// Vehicle Exit
export const vehicleExit = (data) =>
  api.post("/vehicles/exit", data);