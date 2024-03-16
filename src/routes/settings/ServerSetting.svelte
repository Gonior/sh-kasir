<script lang="ts">
	import { onMount } from 'svelte'
	import toast from '@teddy-error/svelte-french-toast';
	import {server} from '@store/index'
	import type { IModel } from '@lib/types'
	let isLoading = false
	let isValid = false
	let ipAddress = 'localhost'
	let radioValue : IModel.Connection = 'local'
	let inputEl : HTMLInputElement
	onMount(async () => {
		ipAddress = $server.ip
		radioValue = $server.type
	})

	const radioOnChange = (e) => {
		if(e.target.value === "network") {
			inputEl.focus()
			inputEl.select()
		} else {
			inputEl.blur()
			ipAddress = "localhost"
			isValid = true

		}
	}

	const testConnection = async () => {

		isLoading = true
		let url = `http://${ipAddress}:8000`
		try {
			await toast.promise(fetch(url), {
				loading :'Tes koneksi..',
				success : function () {
					isValid = true
					return 'Berhasil terhubung dengan server'
				},
				error : function(err) {
					isValid = false
					console.log(err)
					return 'Gagal terhubung dengan server'
				}
			}, {position : 'top-right'})
		} catch (error) {
			console.error(error)
		}

		isLoading = false

	}

	const handleSave = async () => {
		server.set({type : radioValue , ip : ipAddress})
		toast.success('Berhasil menyimpan Konfigurasi Server', {position : 'top-right'})
	}
</script>


<div class="flex">
	<div class="flex flex-col w-1/2">
		<h1 class="font-bold">Konfigurasi Server</h1>
		<h5 class="text-gray-500 dark:text-gray-400">Menghubungkan dengan komputer lain.</h5>
	</div>
	<div class="flex flex-col ">
		<h1 class="font-bold">Jenis Sambungan</h1>
		<div class="flex flex-col">
			<label>
				<input bind:group={radioValue} name="typeOfNetwork" on:change={radioOnChange} type="radio" value="local"/> Lokal
			</label>
			<span class="text-gray-500 dark:text-gray-400 ml-4 -mt-1">Tidak terhubung dengan Komputer lain</span>
		</div>
		<div class="flex flex-col">
			<div class="flex flex-col">
				<label>
					<input  bind:group={radioValue} name="typeOfNetwork" on:change={radioOnChange} type="radio" value="network"/> Komputer lain
				</label>
				<span class="text-gray-500 dark:text-gray-400 ml-4 -mt-1">Menghubungkan dengan komputer lain</span>
			</div>
			<div>
				<div class="{radioValue === 'network' ? 'flex' : 'hidden'} flex-col ml-4 mt-3">
					<span class="text-sm text-gray-500 dark:text-gray-200">Masukan IP Address Komputer Server</span>
					<div class="flex space-x-1 items-center">
						<input bind:this={inputEl} readonly={isLoading} type="text" class="form-control" placeholder="192.xxx.xxx.xxx" bind:value={ipAddress}/>
						<button disabled={isLoading} on:click={() => testConnection()} class="btn-secondary ">Tes Koneksi</button>
					</div>
				</div>
			</div>
		</div>
		<div class="flex justify-end mt-5 ">
			<button on:click={() => handleSave()} disabled={!isValid||isLoading} class="btn-primary !px-5 !py-3 flex items-center">
				<span>Simpan</span>
			</button>
		</div>
	</div>
</div>
