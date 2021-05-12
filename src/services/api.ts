import axios from "axios";

// const baseURL = "http://localhost:3333"; // local (dev)
const baseURL = "https://secret-lowlands-42826.herokuapp.com"; // staging
// const baseURL = "https://api-moderacompra.herokuapp.com"; // prod

const api = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwOTNhNTA2LTZhNDMtNGQzNi04YWY0LWUzYWEzNTc3YTY3MiIsImlhdCI6MTYyMDc4MTM2MCwiZXhwIjoxNjIxMzg2MTYwfQ.R2LrVk2Njb6QK1GWTC0joTuhdoOZS0AVD8TnR7uZcg8",
  },
});

export default api;
