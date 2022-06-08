import axios, { AxiosRequestConfig } from "axios";

export const axios_instance = axios.create({
	baseURL: "http://localhost:4000/",
	withCredentials: true
});

axios_instance.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		config.headers!.Authorization = localStorage.getItem("token") as string;
		return config;
	}
)