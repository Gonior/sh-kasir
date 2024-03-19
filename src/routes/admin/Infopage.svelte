<script lang="ts">
	import { onMount } from 'svelte'
	import logo from '@assets/icons/logo.png'
	import {IModel} from '@lib/types'
	// import { getStoreConfig, updateStoreConfig } from '@lib/controller/store.controller'
	import Store from '@lib/controller/store.controller'
	import Loading from '@components/state/loading.svelte'
	import Errorstate from '@/lib/components/state/errorstate.svelte'
	import Toogle from '@components/toggle.svelte'
	import {slide} from 'svelte/transition'
	import Title from '@/lib/components/navbar/title.svelte'
	let store = new Store()
	let isLoadingData = false
	let isLoading = false
	let isValid = false
	let storeInfo : IModel.StoreInfo ={
		name: '',
		address: '',
		phone: '',
		footerNote: '',
		mobilePhone : ''
	}
	let taxInfo : IModel.Tax = {
		checked : false,
		name : '',
		value : 0
	}

	let bankInfo : IModel.Bank = {
		accountNumber : '',
		holder : '',
		bank : ''
	}

	onMount(async () => {
		let isSuccess = await store.load()
		if( isSuccess ) {
			isValid = true
			taxInfo = store.getTaxInfo()
			storeInfo = store.getStoreInfo()
			bankInfo = store.getBankInfo()
		}

		isLoadingData = false
	})

	const saveChange = async () => {
		isLoading = true
		let updateStore : IModel.Store =  {
			_id : 'storeid',
			storeInfo,
			taxInfo,
			bankInfo
		}
		await store.update("", updateStore)
		// await updateStoreConfig(updateStore)
		isLoading = false
	}
</script>
{#if isLoadingData }
<Loading />
{:else if isValid}
<Title title="Info Perusahaan" subtitle={'Masukan Perusahaan yang ingin di tampilkan pada bill pembayaran'}/>
<div class="py-2">
	<div class="flex items-start w-full">
		<div class="w-1/4">
			<span class="block"> Nama </span>
		</div>
		<div class="w-3/4">
			<input class="form-control w-full" placeholder="RM Sawo Matang" type="text" bind:value={storeInfo.name}/>
		</div>
	</div>
</div>
<div class="py-2">
	<div class="flex items-start w-full">
		<div class="w-1/4">
			<label class="block" for="inline-address"> Logo </label>
		</div>
		<div class="w-3/4 flex items-start justify-between">
			<div class="border border-gray-300 dark:border-gray-500 dark:bg-white rounded-xl p-2 flex items-center justify-center">
				<img src={logo} alt="logo" class="object-scale-down h-24 w-24" />
			</div>
			<div class="inline-flex space-x-5">
				<button class="text-gray-400">Hapus</button>
				<button class="text-amber-600">Ganti</button>
			</div>
		</div>
	</div>
</div>
<div class="py-2">
	<div class="flex items-start w-full">
		<div class="w-1/4">
			<label class="block" for="address"> Alamat </label>
		</div>
		<div class="w-3/4">
			<textarea id="address" class="form-control w-full resize-none h-20" placeholder="Jl. Kita Masih Panjang" bind:value={storeInfo.address}></textarea>
		</div>
	</div>
</div>

<div class="py-2">
	<div class="flex items-start w-full">
		<div class="w-1/4">
			<label class="block" for="phonenumber"> Telepon </label>
		</div>
		<div class="w-3/4">
			<input class="form-control w-1/3" placeholder="022 - xxxxxx" id="phonenumber" type="text" bind:value={storeInfo.phone} />
		</div>
	</div>
</div>
<div class="py-2">
	<div class="flex items-start w-full">
		<div class="w-1/4">
			<label class="block" for="phonenumber"> Nomor Handphone </label>
		</div>
		<div class="w-3/4">
			<input class="form-control w-1/3" placeholder="022 - xxxxxx" id="phonenumber" type="text" bind:value={storeInfo.mobilePhone} />
		</div>
	</div>
</div>

<div class="py-2">
	<div class="flex items-start w-full">
		<div class="w-1/4 flex flex-col">
			<span class="block"> Catatan Kaki </span>
			<span class="block text-gray-500 dark:text-gray-400 text-sm">
				Akan ditampilkan pada akhir bill pembayaran
			</span>
		</div>
		<div class="w-3/4">
			<input
				class="form-control w-full"
				placeholder="TERIMAKASIH ATAS KUNJUNGANNYA"
				type="text"
				bind:value={storeInfo.footerNote}
			/>
		</div>
	</div>
</div>

<div class="flex flex-col space-y-1 mt-10 py-2">
	<h1 class="font-bold">Infomasi Nomor Rekening</h1>
	<h2 class="text-gray-500 dark:text-gray-300">
		Masukan informasi yang ingin di tampilkan pada Invoice (PDF)
	</h2>
</div>
<div class="py-2">
	<div class="flex items-start w-full">
		<div class="w-1/4">
			<span class="block"> Bank </span>
		</div>
		<div class="w-3/4">
			<input
				class="form-control w-full"
				placeholder="Nama Anda"
				type="text"
				bind:value={bankInfo.bank}
			/>
		</div>
	</div>
</div>
<div class="py-2">
	<div class="flex items-start w-full">
		<div class="w-1/4">
			<span class="block"> Nomor Rekening </span>
		</div>
		<div class="w-3/4">
			<input
				class="form-control w-full"
				placeholder="Nama Anda"
				type="text"
				bind:value={bankInfo.accountNumber}
			/>
		</div>
	</div>
</div>
<div class="py-2">
	<div class="flex items-start w-full">
		<div class="w-1/4">
			<span class="block"> Atas Nama </span>
		</div>
		<div class="w-3/4">
			<input
				class="form-control w-full"
				placeholder="Nama Anda"
				type="text"
				bind:value={bankInfo.holder}
			/>
		</div>
	</div>
</div>
<div class="flex flex-col space-y-1 mt-10 py-2">
	<div class="flex items-start w-full">
		<div class="w-1/4">
			<h1 class="font-bold">Pajak</h1>
			<span class="text-gray-500 dark:text-gray-400 text-sm">Centang bila menggunakan pajak</span>
		</div>
		<div class="w-3/4">
			<Toogle bind:checked={taxInfo.checked} on:change={(e) => !e.detail.checked ? taxInfo = {checked : false, name : '', value : 0} : {}} />
			{#if taxInfo.checked}
			<div class="flex gap-2" transition:slide={{axis : 'y' , duration : 200}}>
				<div class="flex flex-col ">
					<span class=""> Nama Pajak </span>
					<input class="form-control appearance-none" placeholder="PPN" type="text" bind:value={taxInfo.name}/>
				</div>
				<div class="flex flex-col">
					<span class=""> Persentase </span>
					<div>
						<input class="form-control w-1/3 appearance-none" placeholder="10" type="number" bind:value={taxInfo.value}/>
						<span class="text-gray-500">%</span>
					</div>
				</div>
			</div>
			{/if}
		</div>
	</div>

</div>
<div class="py-4">
	<div class="w-full flex justify-end ">
		<button disabled={isLoading} on:click={() => saveChange()} class="btn-primary !px-5 !py-3 flex items-center">
			<span>Simpan</span>
		</button>
	</div>
</div>
{:else}
<Errorstate msg="Gagal memuat data" icon="folder"/>

{/if}
