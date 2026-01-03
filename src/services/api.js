import axios from "axios";

export const api = axios.create({
    //baseURL: "https://apielectrum.onrender.com/rest-electrum",
    baseURL: "http://localhost:8081/rest-electrum",
    headers: {
        'Content-Type': "application/json",
    }
})