export interface IParams {
	[key: string]: any;
}

export interface IGenericOptions {
	url: string;
	params?: IParams;
}

export interface IErrorResponse {
	status: string;
	message: string;
}

export interface IResponse<T> {
	success : boolean
	data? : T
	message? : string
	token? : string
}


