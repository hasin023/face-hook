import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
});

// request interceptor
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        if (err.response) {
            // error came from server
            err.message = `Error from server: status: ${err.response.status} - message: ${err.response.statusText}`;
        }

        return Promise.reject(err);
    }
);

export default api;
