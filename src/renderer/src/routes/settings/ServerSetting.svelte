<!-- <script>
	import { onMount } from 'svelte'
	import { slide, fade } from 'svelte/transition'
	import { server } from '../../lib/store'
	import ConfirmModal from '../modal/ConfirmModal.svelte'
	import { testConnection as testServer } from '../../lib/serverController'
	import { failure } from '../../lib/toast'
	$: radioValue = $server.typeOfNetwork
	let testConnectionDisplay = false
	let result
	let isLoading
	let ipAddress = 'localhost'
	let openConfirmModal = false

	onMount(async () => {
		ipAddress = $server.ipAddress
	})

	const radioOnChange = (event) => {
		$server.typeOfNetwork = event.currentTarget.value
		if (event.currentTarget.value === 'local') $server.ipAddress = 'localhost'
	}

	const testConnection = async () => {
		testConnectionDisplay = true
		isLoading = true
		let url = `http://${ipAddress}:8000`
		result = await testServer(url).catch((err) => failure(err.message))
		if (result) $server.ipAddress = ipAddress
		else $server.ipAddress = 'localhost'
		isLoading = false
		setTimeout(() => (testConnectionDisplay = false), 3000)
	}


</script>

{#if openConfirmModal}
	<ConfirmModal on:confirm={() => (openConfirmModal = false)} />
{/if}
<div
	id="server-setting"
	class="flex text-sm w-full"
	in:fade={{ duration: 200 }}
>
	<div class="flex flex-col w-1/2 text-sm">
		<h1 class="">Konfigurasi Server</h1>
		<h5 class="text-gray-500 dark:text-gray-400">Menghubungkan dengan komputer lain.</h5>
	</div>
	<hr />
	<div class="flex flex-col w-1/2">
		<h1>Jenis Sambungan</h1>
		<div class="flex flex-col">
			<label>
				<input
					name="typeOfNetwork"
					on:change={radioOnChange}
					type="radio"
					class="accent-gray-500"
					checked={$server.typeOfNetwork === 'local'}
					value="local"
				/> Lokal
			</label>
			<span class="text-gray-500 dark:text-gray-400 ml-4 -mt-1"
				>Tidak terhubung dengan Komputer lain</span
			>
		</div>
		<div class="flex flex-col">
			<div class="flex flex-col">
				<label>
					<input
						name="typeOfNetwork"
						on:change={radioOnChange}
						type="radio"
						class="accent-gray-500"
						checked={$server.typeOfNetwork === 'network'}
						value="network"
					/> Komputer lain
				</label>
				<span class="text-gray-500 dark:text-gray-400 ml-4 -mt-1"
					>Menghubungkan dengan komputer lain</span
				>
			</div>
			<div>
				<div class="{radioValue === 'network' ? 'flex' : 'hidden'} flex-col ml-4 mt-3">
					<span class="text-xs text-gray-500 dark:text-gray-200"
						>Masukan IP Address Komputer Server</span
					>
					<div class="flex space-x-1 items-center">
						<input
							type="text"
							class="form-control"
							placeholder="192.xxx.xxx.xxx"
							bind:value={ipAddress}
						/>
						<button
							disabled={!$server.ipAddress || testConnectionDisplay}
							on:click={() => testConnection()}
							class="btn-primary flex text-sm text-nowrap">Tes Koneksi</button
						>
					</div>
				</div>
				{#if testConnectionDisplay}
					<div transition:slide={{ x: -100, duration: 200 }} class="ml-4">
						{#if isLoading}
							<div
								class="animate-pulse text-gray-500 dark:text-gray-400 flex items-center"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
									/>
								</svg>
								<span>loading</span>
							</div>
						{:else if result}
							<div class=" text-gray-500 flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="w-6 h-6 text-green-500"
								>
									<path
										fill-rule="evenodd"
										d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
										clip-rule="evenodd"
									/>
								</svg>
								<span class="italic text-xs text-gray-500 dark:text-gray-300"
									>Berhasil terhubung dengan server</span
								>
							</div>
						{:else}
							<div class="flex items-center text-red-600">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6 text-red-500"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6 18 18 6M6 6l12 12"
									/>
								</svg>
								<span class="italic text-xs">Gagal terhubung</span>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div> -->
