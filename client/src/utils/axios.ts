import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const axios_instance: AxiosInstance = axios.create({
	baseURL: "http://localhost:4000/",
	withCredentials: true
});

axios_instance.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		config.headers!.Authorization = localStorage.getItem("token") as string;
		return config;
	}
)