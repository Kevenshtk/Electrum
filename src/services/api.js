import axios from "axios";

export const api = axios.create({
    baseURL: "https://apielectrum.onrender.com/rest-electrum",
    headers: {
        'Content-Type': "application/json",
    }
})