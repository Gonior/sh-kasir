<script lang="ts">
	import { onMount } from 'svelte'
	import logo from '../../assets/icons/logo.png'
	import {IModel} from '../../lib/types'
	import { getStoreInfo } from '../../lib/controller/store.controller'

	let storeInfo : IModel.Store ={
		_id: 'storeid',
		name: '',
		address: '',
		phone: '',
		footerNote: '',
		norek: '',
		holder: '',
		bank: '',
		mobilePhone : ''
	}
	onMount(async () => {
		let response = await getStoreInfo()
		if( response ) {
			storeInfo={...response}
		}

	})

	const saveChange = async () => {

	}
</script>
<div class="">
	<h1 class="font-bold">Info Perusahaan</h1>
	<h2 class="text-gray-500 dark:text-gray-400">
		Masukan Perusahaan yang ingin di tampilkan pada bill pembayaran
	</h2>
</div>
<div class="py-2">
	<div class="flex">
		<div class="flex items-start w-full">
			<div class="w-1/4">
				<label class="block" for="inline-address"> Logo </label>
			</div>
			<div class="w-2/3 flex items-start justify-between">
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
</div>
<div class="py-2">	
	<div class="flex items-start w-full">
		<div class="w-1/4">
			<span class="block"> Nama </span>
		</div>
		<div class="w-2/3">
			<input
				class="form-control w-full"
				placeholder="RM Sawo Matang"
				type="text"
				bind:value={storeInfo.name}
			/>
		</div>
	</div>
</div>

<div class="py-2">
	<div class="flex items-start w-full">
		<div class="w-1/4">
			<label class="block" for="address"> Alamat </label>
		</div>
		<div class="w-2/3">
			<textarea
				id="address"
				class="form-control w-full resize-none h-20"
				placeholder="Jl. Kita Masih Panjang"
				bind:value={storeInfo.address}
			></textarea>
		</div>
	</div>
</div>

<div class="py-2">
	<div class="flex items-start w-full">
		<div class="w-1/4">
			<label class="block" for="phonenumber"> Telepon </label>
		</div>
		<div class="w-2/3">
			<input class="form-control w-1/3" placeholder="022 - xxxxxx" id="phonenumber" type="text" bind:value={storeInfo.phone} />
		</div>
	</div>
</div>
<div class="py-2">
	<div class="flex items-start w-full">
		<div class="w-1/4">
			<label class="block" for="phonenumber"> Nomor Handphone </label>
		</div>
		<div class="w-2/3">
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
		<div class="w-2/3">
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
<div class="my-2">
	<div class="flex items-start w-full">
		<div class="w-1/4">
			<span class="block"> Bank </span>
		</div>
		<div class="w-2/3">
			<input
				class="form-control w-full"
				placeholder="Nama Anda"
				type="text"
				bind:value={storeInfo.bank}
			/>
		</div>
	</div>
</div>
<div class="my-2">
	<div class="flex items-start w-full">
		<div class="w-1/4">
			<span class="block"> Nomor Rekening </span>
		</div>
		<div class="w-2/3">
			<input
				class="form-control w-full"
				placeholder="Nama Anda"
				type="text"
				bind:value={storeInfo.norek}
			/>
		</div>
	</div>
</div>
<div class="my-2">
	<div class="flex items-start w-full">
		<div class="w-1/4">
			<span class="block"> Atas Nama </span>
		</div>
		<div class="w-2/3">
			<input
				class="form-control w-full"
				placeholder="Nama Anda"
				type="text"
				bind:value={storeInfo.holder}
			/>
		</div>
	</div>
</div>
<div class="py-4">
	<div class="w-11/12 flex justify-end ">
		<button on:click={() => saveChange()} class="btn-primary !px-5 !py-3 flex items-center">
			<span>Simpan</span>
		</button>
	</div>
	
</div>
