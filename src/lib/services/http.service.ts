import axios from "axios";
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import { token, server } from "@lib/store";
import { get } from 'svelte/store'
// TYPES
import { IService, EHttpMethod } from "@lib/types";
import { httpErrorHandler } from "@lib/utils/httpErrorHandler";

class HttpService {
	private http: AxiosInstance;
	public baseURL = `http://${get(server).ip}:8000`

	constructor() {
		this.http = axios.create({
			baseURL : this.baseURL,
			withCredentials: false,
			headers: this.setupHeaders(),
		});
	}

	// Initialize service configuration
	public service() {
		this.injectInterceptors();

		return this;
	}

	// Set up request headers
	private setupHeaders(hasAttachment = false) {
		return hasAttachment
		? { "Content-Type": "multipart/form-data"}
		: { "Content-Type": "application/json"};
	}

	// Handle HTTP requests
	private async request<T>(
		method: EHttpMethod,
		url: string,
		options: AxiosRequestConfig
	): Promise<T> {
		try {
		const response: AxiosResponse<T> = await this.http.request<T>({
			method,
			url,
			...options,
		});

			return response.data;
		} catch (error) {
			return this.normalizeError(error);
		}
	}

	// Perform GET request
	public async get<T>(
		url: string,
		params?: IService.IParams,
		hasAttachment = false
	): Promise<T> {
		return this.request<T>(EHttpMethod.GET, url, {
			params,
			headers: this.setupHeaders(hasAttachment),
		});
	}

	// Perform POST request
	public async push<T, P>(
		url: string,
		payload: P,
		params?: IService.IParams,
		hasAttachment = false
	): Promise<T> {
		return this.request<T>(EHttpMethod.POST, url, {
			params,
			data: payload,
			headers: this.setupHeaders(hasAttachment),
		});
	}

	// Perform UPDATE request
	public async update<T, P>(
		url: string,
		payload: P,
		params?: IService.IParams,
		hasAttachment = false
	): Promise<T> {
		return this.request<T>(EHttpMethod.PATCH, url, {
			params,
			data: payload,
			headers: this.setupHeaders(hasAttachment),
		});
	}

	// Perform DELETE request
	public async remove<T>(
		url: string,
		params?: IService.IParams,
		hasAttachment = false
	): Promise<T> {
		return this.request<T>(EHttpMethod.DELETE, url, {
			params,
			headers: this.setupHeaders(hasAttachment),
		});
	}

	// Inject interceptors for request and response
	private injectInterceptors() {

		this.http.interceptors.request.use((request) => {
			let accessToken = get(token)
			let ip = get(server).ip
			accessToken ? request.headers.Authorization = `Bearer ${accessToken}` : ''
			ip ? request.baseURL = `http://${ip}:8000` : ''

			return request;
		});

		// Set up response interceptor
		this.http.interceptors.response.use(
		(response) => {
			if(!response.data) return this.normalizeError('Tidak ada data!')
			// console.log(response)
			return response
		},

		(error) => {
			httpErrorHandler(error)
			return error
		});
	}

	// Normalize errors
	private normalizeError(error: any) {
		return Promise.reject(error);
	}
}

export { HttpService };

