import toast from "@teddy-error/svelte-french-toast";
import axios from "axios";

function httpErrorHandler(error) {
	if (axios.isAxiosError(error)) {
	  //here we have a type guard check, error inside this if will be treated as AxiosError
		const response = error?.response
		const request = error?.request
		// const config = error?.config
		//here we have access the config used to make the api call (we can make a retry using this conf)

		if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
			toast.error('Tidak dapat terhubung dengan server!', {position : 'top-right'})
		} else if (error.code === 'ERR_CANCELED') {
			toast.error('Pemintaan dibatalkan', {position : 'top-right'})
		}
		if (response) {
			//The request was made and the server responded with a status code that falls out of the range of 2xx the http status code mentioned above
			const statusCode = response?.status
			if (statusCode === 404) {
				toast.error('Data tidak ada dalam database atau sudah dihapus' , {position : 'top-right'})
			} else if (statusCode === 401 || statusCode === 403) {
				toast.error('Akses ditolak, silakan login terlebih dahulu' , {position : 'top-right'})
			} else if (statusCode === 400 || statusCode === 500) {
				if(response.data && response.data?.message) toast.error(response.data?.message , {position : 'top-right'})
				else toast.error(`ERROR : Tidak diketahui!!!
			Lihat console untuk info lebih lanjut.` , {position : 'top-right'})

			}
		} else if (request) {
			// toast.error(`Terjadi kesalahan!!
			// silakan periksa console untuk informasi lebih lanjut!` , {position : 'top-right'})
		}
	}
	console.log(error)
	return error
}

export default httpErrorHandler
