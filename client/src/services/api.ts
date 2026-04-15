import axios from "axios";

const API = axios.create({
    baseURL: "https://recipe-ib8s.onrender.com",
});

export default API;