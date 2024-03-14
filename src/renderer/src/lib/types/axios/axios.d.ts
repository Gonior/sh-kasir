import axios from 'axios'

declare module 'axios' {
	export interface InternalAxiosRequestConfig {
		raw?: boolean
		silent?: boolean
	}
}