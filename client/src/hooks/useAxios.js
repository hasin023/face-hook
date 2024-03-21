import { useEffect } from "react"
import api from "../api/api"
import { useAuth } from "./useAuth"
import axios from "axios";

const useAxios = () => {

    const { auth, setAuth } = useAuth();

    useEffect(() => {

        // request interceptor
        const requestIntercept = api.interceptors.request.use(
            (config) => {
                const authToken = auth?.authToken;
                if (authToken) {
                    config.headers.Authorization = `Bearer ${authToken}`;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // response interceptor
        const responseIntercept = api.interceptors.response.use(
            (response) => {
                response,
                    async (error) => {
                        const originalRequest = error.config;
                        if (error.response.status === 401 && !originalRequest._retry) {
                            originalRequest._retry = true;

                            try {
                                const refreshToken = auth?.refreshToken;
                                const response = await axios.post(`${import.meta.env.BASE_URL}/auth/refresh`, { refreshToken });

                                const { newToken } = response.data;
                                setAuth({ ...auth, authToken: newToken });
                                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                                return axios(originalRequest);
                            } catch (error) {
                                console.error(error);
                            }
                        }
                    }
            },
            (err) => {
                if (err.response) {
                    // error came from server
                    err.message = `Error from server: status: ${err.response.status} - message: ${err.response.statusText}`;
                }

                return Promise.reject(err);
            }
        );

        return () => {
            api.interceptors.request.eject(requestIntercept);
            api.interceptors.request.eject(responseIntercept);
        }

    }, [auth.authToken])

    return { api };
}

export default useAxios;