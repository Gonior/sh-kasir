<script lang="ts">
	import { onMount } from 'svelte'
	import { dragscroll } from '@svelte-put/dragscroll';
	import { paginate } from 'svelte-paginate'
	import { IModel } from '@lib/types'
	import { generateAvatar } from '@lib/utils';
	import { Constant, type ITableHeaderItem } from '@lib/types'
	import {searchHandler, keydownHandler} from '@/lib/utils'
	import UserService from '@lib/services/user.service'
	import User from '@lib/models/user.model'
	
	import Title from '@components/navbar/title.svelte'
	import Icon from '@components/ui/Icon.svelte';
	import Loading from '@components/state/loading.svelte'
	import Errorstate from '@components/state/errorstate.svelte'
	import ConfirmModal from '@components/modal/confirmModal.svelte'
	import UserFormModal from '@/routes/admin/components/userFormModal.svelte';
	import TableHeader from '@/lib/components/ui/tableHeader.svelte';
	import Pagination from '@/lib/components/ui/pagination.svelte'
	
	

	const userService = new UserService()

	let keyword : string = ''
	let listUser: IModel.IUser[] = []
	let listUserDuplicate: IModel.IUser[] = []
	let isLoadingData = true
	let isValid = false
	let selectedUser : IModel.IUser
	let openConfirmModal = false
	let openFormModal = false
	let currentPage = 1
	let pageSize = Constant.DEFAULT_PAGE_SIZE

	$: paginateItems = paginate({items : listUser, pageSize, currentPage})

	onMount(async () => {
		await loadData()
	})

	const loadData = async () => {
		isLoadingData = true
		let isSuccess = await userService.load()
		if(isSuccess) {
			isValid = true
			listUser = userService.getData()
			listUserDuplicate = listUser
		}
		keyword = ""
		isLoadingData = false
	}

	const handleSearch =  () => {
		listUser = [...searchHandler(keyword, ['name', 'passcode'], listUserDuplicate)]
	}

	const handleDelete = async (e : CustomEvent) => {
		if(e.detail) {
			let user = new User(selectedUser)
			let isSuccess = await user.delete()
			if (isSuccess) await loadData()
		}

		openConfirmModal = false
	}

	function handleKeydown({ keyCode }) {
		keydownHandler(keyCode, '.item')
    }

	const tableHeaderItems : ITableHeaderItem[] = [
		{
			value : "No.",
			width : 'w-12',
		},
		{
			value : "nama pengguna",
		},
		{
			value : 'kata sandi',
			width : 'w-44',
		},
		{
			value : 'Aksi',
			width : 'w-24',
			textAlign : 'text-center'
		}
	]

	const handleClose = (e : {detail : { requireReload : boolean, openModal : boolean}}) => {
		if(e.detail.requireReload) loadData()
		openFormModal = e.detail.openModal
	}

</script>

{#if openConfirmModal}
	<ConfirmModal title="Konfirmasi hapus pengguna" confirmText="Ya, Hapus" on:close={(e) => openConfirmModal = e.detail} on:confirm={handleDelete} >
		<p>Apakah anda yakin akan menghapus pengguna <span class="font-bold">{selectedUser.name}</span> ?</p>
	</ConfirmModal>
{/if}
{#if openFormModal}
	<UserFormModal on:close={handleClose} />
{/if}

<div class="h-full flex flex-col w-full">
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
		<Pagination totalItems={listUser.length} {currentPage} {pageSize} on:setpage={(e) => {currentPage = e.detail.page}} on:setPageSize={(e) => pageSize = e.detail} />
		<TableHeader marginRight={"mr-2"} textSize={'text-lg'} {tableHeaderItems}  />
		<div on:keydown={handleKeydown} tabindex="0" role="button" class="flex-1 overflow-y-auto overflow-x-hidden scrollbar flex flex-col w-full" use:dragscroll={{axis :'y', cursor : false}}>
			{#if paginateItems.length > 0}
			<table id="table-content" class="text-gray-500 dark:text-gray-300 mr-2" style="scrollbar-gutter: stable;" >
				{#each paginateItems as user}
					<tr id={user._id} class="tr-item item" tabindex="0" >
						<td class="p-2 text-center w-12 "></td>
						<td class="p-2">
							<div class="flex items-center space-x-1">
								<div class="h-10 w-10">
									<img src={generateAvatar(user.name)}  alt={`avatar-${user.name}`}>
								</div>
								<span>{user.name}</span>
							</div>
						</td>
						<td class="p-2 w-44 ">
							<div class="flex items-center space-x-2">
								{user.passcode}
							</div>
						</td>
						<td class="p-2 w-24 text-center">
							<button  class="btn-secondary !p-2" on:click={() => {selectedUser = {...user};openConfirmModal = true}}>
								<Icon name="trash" class="h-6 w-6"/>
							</button>
						</td>
					</tr>
				{/each}
				</table>
			{:else}
			<Errorstate msg="Tidak ada data" />
			{/if}
		</div>
	{:else}
		<Errorstate msg="Gagal Memuat Data Pengguna" />
	{/if}

</div>

<style lang="postcss">
	#table-content {
		counter-reset: rowNumber;
	}
	#table-content tr {
		counter-increment: rowNumber;
	}
	#table-content tr td:first-child:before {
		content: counter(rowNumber);
	}

</style>

