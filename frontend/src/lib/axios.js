import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true /* send cookies with request (backend knows that we are authenticated!) */,
});

export default api;
