import axios from "axios";

const api = axios.create({
  baseURL: "http://www.cidadeconectada.app.br/app/",
});

export default api;