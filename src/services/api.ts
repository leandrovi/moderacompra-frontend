import axios from "axios";

const baseURL = "http://192.168.0.20:3333"; // local (dev)
// const baseURL = "https://secret-lowlands-42826.herokuapp.com"; // staging
// const baseURL = "https://api-moderacompra.herokuapp.com"; // prod

const hardCodedToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1NzNmZjBmLTNkNzQtNDgxNi1iNmJmLTU5OThjZDY5NzJjMyIsImlhdCI6MTYyMjQxNzc0NSwiZXhwIjoxNjIzNzEzNzQ1fQ.X0V-9yZ3IjjXfEpJlKioCOtMdlfN9jbluoIBdnm1kGg";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${hardCodedToken}`,
  },
});

export default api;
