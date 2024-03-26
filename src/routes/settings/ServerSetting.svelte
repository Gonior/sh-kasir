<script lang="ts">
	import { onMount } from 'svelte'
	import {toast} from 'svelte-sonner';
	import {server} from '@store/index'
	import type { Connection } from '@lib/types'
	import { slide } from 'svelte/transition'
	let isLoading = false
	let isValid = false
	let ipAddress = 'localhost'
	let radioValue : Connection = 'local'
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

	const testConnection = () => {

		isLoading = true
		let url = `http://${ipAddress}:8000`
		
		toast.promise(fetch(url), {
			loading :'Tes koneksi..',
			success : function () {
				isValid = true
				isLoading = false
				return 'Berhasil terhubung dengan server'
			},
			error : function(err) {
				isValid = false
				isLoading = false
				console.log(err)

				return 'Gagal terhubung dengan server'
			}
		})
	}

	const handleSave = async () => {
		server.set({type : radioValue , ip : ipAddress})
		toast.success('Berhasil menyimpan Konfigurasi Server')
	}
</script>


<div class="flex items-start w-full sticky top-0 justify-between pb-5 pr-7 bg-gray-50 dark:bg-gray-900 " style="z-index: 1;">
	<div class="flex flex-col space-y-1">
		<h1 class="font-bold">Konfigurasi Server</h1>
		<h5 class="text-gray-500 dark:text-gray-400">Menghubungkan dengan komputer lain.</h5>
	</div>
	<button on:click={() => handleSave()} disabled={!isValid||isLoading} class="btn-primary !px-5 !py-3 flex items-center">
		<span>Simpan</span>
	</button>
</div>
<div class="flex py-4 items-start w-full ">
	<div class="w-1/2">	
		<h1 class="font-bold">Jenis Sambungan</h1>
	</div>
	<div class="flex flex-col w-1/2">
		
		<div class="flex flex-col">
			<label>
				<input bind:group={radioValue} name="typeOfNetwork" on:change={radioOnChange} type="radio" value="local"/> Lokal
			</label>
			<span class="text-gray-500 dark:text-gray-400 ml-5 -mt-1">Tidak terhubung dengan Komputer lain</span>
		</div>
		<div class="flex flex-col">
			<div class="flex flex-col">
				<label>
					<input bind:group={radioValue} name="typeOfNetwork" on:change={radioOnChange} type="radio" value="network"/> 
					<span>Komputer lain</span>
				</label>
				<span class="text-gray-500 dark:text-gray-400 ml-5 -mt-1">Menghubungkan dengan komputer lain</span>
			</div>
			{#if radioValue === 'network'}
			<div transition:slide={{ axis : 'y', duration : 200 }} class="flex-col ml-4 mt-3">
				<span class="text-sm text-gray-500 dark:text-gray-200">Masukan IP Address Komputer Server</span>
				<div class="flex space-x-1 items-center">
					<input bind:this={inputEl} readonly={isLoading} type="text" class="form-control" placeholder="192.xxx.xxx.xxx" bind:value={ipAddress}/>
					<button disabled={isLoading} on:click={() => testConnection()} class="btn-secondary ">Tes Koneksi</button>
				</div>
			</div>
			{/if}
		</div>
		
	</div>
</div>
