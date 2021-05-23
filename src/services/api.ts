import axios from "axios";

// const baseURL = "http://localhost:3333"; // local (dev)
const baseURL = "https://secret-lowlands-42826.herokuapp.com"; // staging
// const baseURL = "https://api-moderacompra.herokuapp.com"; // prod

const hardCodedToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJkNzljZmFhLWEzNGQtNDI2MC1hNmZjLWJmNTY0NTExZmFkNCIsImlhdCI6MTYyMTEyNzc0NywiZXhwIjoxNjIyNDIzNzQ3fQ.6EBtCLewThOYQ427abhuAEz53Q3GvxXy6JMSAFQHMuo";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${hardCodedToken}`,
  },
});

export default api;
