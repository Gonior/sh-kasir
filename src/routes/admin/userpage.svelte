<script lang="ts">
	import type { IModel } from '@/lib/types'
	import Title from '../../lib/components/title.svelte'
	import Icon from '@/lib/components/Icon.svelte';
	import { generateAvatar } from '@/lib/utils/myFunct';
	let keyword
	import {User} from '@lib/controller/user.controller'
	import { onMount } from 'svelte'
	import Loading from '@components/state/loading.svelte'
	import Errorstate from '@/lib/components/state/errorstate.svelte'
	import ConfirmModal from '@/lib/components/modal/confirmModal.svelte'
	import UserFormModal from '@/lib/components/modal/userFormModal.svelte';
	import { dragscroll } from '@svelte-put/dragscroll';
	const user = new User()
	let listUser: IModel.User[] = []
	let listUserDuplicate: IModel.User[] = []
	let isLoadingData = true
	let isValid = false
	let selectedUser : IModel.User
	let openConfirmModal = false
	let openFormModal = false
	
	onMount(async () => {
		await loadData()
		isLoadingData = false
	})

	const loadData = async () => {
		let isSuccess = await user.load()
		if(isSuccess) {
			isValid = true
			listUser = user.getData()
			listUserDuplicate = listUser
		}
	}

	const handleSearch = async () => {
		let filteredUsers = []

		let regex = new RegExp(`${keyword}`, 'i')
		filteredUsers = [...listUserDuplicate.filter((user) => regex.test(user['name']))]
		if (keyword === '') await loadData()
		else listUser = [...filteredUsers]
	}

	const handleDelete = async (e : CustomEvent) => {
		if(e.detail) {
			let isSuccess = await user.delete(selectedUser._id)
			if (isSuccess) loadData()
		}

		openConfirmModal = false
	}

	function handleKeydown({ keyCode }) {
		if (keyCode !== 38 && keyCode !== 40 && keyCode !== 13) return
		const current = <HTMLElement>document.activeElement
		
		const items =  [...document.getElementsByClassName('item')]
		const currentIndex = items.indexOf(current)
		let newIndex : number
		if (currentIndex === -1) {
			newIndex = 0 
		} else {
			if (keyCode === 38) newIndex = (currentIndex + items.length - 1) % items.length
			else if (keyCode === 40) newIndex = (currentIndex + 1) % items.length
			else if (keyCode === 13) console.log(current.id)

		}
	
		(items[newIndex] as HTMLElement)?.focus()
		current?.blur() 
    }


</script>
<svelte:window  />
{#if openConfirmModal}
	<ConfirmModal title="Konfirmasi hapus pengguna" confirmText="Ya, Hapus" on:close={(e) => openConfirmModal = e.detail} on:confirm={handleDelete} >
		<p>Apakah anda yakin akan menghapus pengguna <span class="font-bold">{selectedUser.name}</span> ?</p>
	</ConfirmModal>
{/if}
{#if openFormModal}
	<UserFormModal on:close={(e) => {openFormModal = e.detail;loadData()}} />
{/if}

<div class="h-full flex  flex-col w-full 2xl:w-2/3">
	{#if isLoadingData}
		<Loading />
	{:else if isValid}
		<Title title="Pengguna" />
		<div class="flex items-center justify-between">
			<div class="relative w-1/2">
				<input on:keyup={handleSearch} bind:value={keyword} type="text" class="form-control !pl-9 w-full placeholder:font-normal" placeholder="Cari Pengguna.." />
				<Icon name="search" class="h-6 w-6 absolute left-2 top-2 text-gray-500"/>
			</div>
			<div>
				<button tabindex="0" on:click={() => openFormModal = true} class="btn-primary flex items-center space-x-1">
					<Icon name="plus" class="h-6 w-6" stroke={3}/>
					<span>Tambah Pengguna</span>
				</button>
			</div>
		</div>
		<div on:keydown={handleKeydown} tabindex="0" role="button" class="flex-1 overflow-y-auto overflow-x-hidden scrollbar flex flex-col my-5 rounded-lg w-full" use:dragscroll={{axis :'y'}}>
			{#if listUser.length > 0}
				<table class="relative table-fixed w-full text-left rtl:text-right" style=""> 
					<thead class=" text-gray-700 dark:text-white uppercase">
						<tr class="text-lg">
							<th scope="col" class="sticky top-0 py-2 pl-3 rounded-l-lg bg-gray-100 dark:bg-gray-700 w-10">No.</th>
							<th scope="col" class="sticky top-0 p-2 bg-gray-100 w-1/3 dark:bg-gray-700">Nama Pengguna</th>
							<th scope="col" class="sticky top-0 p-2 bg-gray-100 dark:bg-gray-700">PIN</th>
							<th scope="col" class="sticky top-0 py-2 pr-10 rounded-r-lg bg-gray-100 dark:bg-gray-700 w-24 text-right">ACTION</th>
						</tr>
					</thead>
					<tbody class="text-gray-500 dark:text-gray-300" >
						{#each listUser as user}
							<tr id={user._id} class="transition border-b border-gray-400 dark:border-gray-700 item focus:outline-none focus:translate-x-2 focus:bg-gray-200 dark:focus:bg-gray-700" tabindex="0" >
								<td class="p-2 text-center"></td>
								<td class="p-2">
									<div class="flex items-center space-x-1">
										<div class="h-10 w-10">
											<img src={generateAvatar(user.name)}  alt={`avatar-${user.name}`}>
										</div>
										<span>{user.name}</span>
									</div>
								</td>
								<td class="p-2">
									<div class="flex items-center space-x-2">
										{user.passcode}
									</div>
								</td>
								<td class="p-2">
									<button  class="btn-secondary !p-2" on:click={() => {selectedUser = {...user};openConfirmModal = true}}>
										<Icon name="trash" class="h-6 w-6"/>
									</button>
								</td>
							</tr>
							<tr id={user._id} class="transition border-b border-gray-400 dark:border-gray-700 item focus:outline-none focus:translate-x-2 focus:bg-gray-200 dark:focus:bg-gray-700" tabindex="0" >
								<td class="p-2 text-center"></td>
								<td class="p-2">
									<div class="flex items-center space-x-1">
										<div class="h-10 w-10">
											<img src={generateAvatar(user.name)}  alt={`avatar-${user.name}`}>
										</div>
										<span>{user.name}</span>
									</div>
								</td>
								<td class="p-2">
									<div class="flex items-center space-x-2">
										{user.passcode}
									</div>
								</td>
								<td class="p-2">
									<button  class="btn-secondary !p-2" on:click={() => {selectedUser = {...user};openConfirmModal = true}}>
										<Icon name="trash" class="h-6 w-6"/>
									</button>
								</td>
							</tr>
							<tr id={user._id} class="transition border-b border-gray-400 dark:border-gray-700 item focus:outline-none focus:translate-x-2 focus:bg-gray-200 dark:focus:bg-gray-700" tabindex="0" >
								<td class="p-2 text-center"></td>
								<td class="p-2">
									<div class="flex items-center space-x-1">
										<div class="h-10 w-10">
											<img src={generateAvatar(user.name)}  alt={`avatar-${user.name}`}>
										</div>
										<span>{user.name}</span>
									</div>
								</td>
								<td class="p-2">
									<div class="flex items-center space-x-2">
										{user.passcode}
									</div>
								</td>
								<td class="p-2">
									<button  class="btn-secondary !p-2" on:click={() => {selectedUser = {...user};openConfirmModal = true}}>
										<Icon name="trash" class="h-6 w-6"/>
									</button>
								</td>
							</tr>
							<tr id={user._id} class="transition border-b border-gray-400 dark:border-gray-700 item focus:outline-none focus:translate-x-2 focus:bg-gray-200 dark:focus:bg-gray-700" tabindex="0" >
								<td class="p-2 text-center"></td>
								<td class="p-2">
									<div class="flex items-center space-x-1">
										<div class="h-10 w-10">
											<img src={generateAvatar(user.name)}  alt={`avatar-${user.name}`}>
										</div>
										<span>{user.name}</span>
									</div>
								</td>
								<td class="p-2">
									<div class="flex items-center space-x-2">
										{user.passcode}
									</div>
								</td>
								<td class="p-2">
									<button  class="btn-secondary !p-2" on:click={() => {selectedUser = {...user};openConfirmModal = true}}>
										<Icon name="trash" class="h-6 w-6"/>
									</button>
								</td>
							</tr>
							<tr id={user._id} class="transition border-b border-gray-400 dark:border-gray-700 item focus:outline-none focus:translate-x-2 focus:bg-gray-200 dark:focus:bg-gray-700" tabindex="0" >
								<td class="p-2 text-center"></td>
								<td class="p-2">
									<div class="flex items-center space-x-1">
										<div class="h-10 w-10">
											<img src={generateAvatar(user.name)}  alt={`avatar-${user.name}`}>
										</div>
										<span>{user.name}</span>
									</div>
								</td>
								<td class="p-2">
									<div class="flex items-center space-x-2">
										{user.passcode}
									</div>
								</td>
								<td class="p-2">
									<button  class="btn-secondary !p-2" on:click={() => {selectedUser = {...user};openConfirmModal = true}}>
										<Icon name="trash" class="h-6 w-6"/>
									</button>
								</td>
							</tr>

							
						{/each}
					</tbody>
				</table>
			{:else}
			<Errorstate msg="Tidak ada data" icon="folder" />
			{/if}
		</div>
	{:else}
		<Errorstate msg="Gagal Memuat Data Pengguna" icon="folder" />
	{/if}

</div>

<style>
	table {
		counter-reset: rowNumber -1;
	}
	table tr {
		counter-increment: rowNumber;
	}
	table tr td:first-child:before {
		content: counter(rowNumber);
	}
</style>

