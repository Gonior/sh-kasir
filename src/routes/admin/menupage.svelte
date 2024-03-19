<script lang="ts">
	import { onMount } from "svelte";
	import { dragscroll } from "@svelte-put/dragscroll";
	import { paginate } from 'svelte-paginate'
	import Menu from '@lib/controller/menu.controller'
	import Loading from "@/lib/components/state/loading.svelte";
	import Title from "@/lib/components/navbar/title.svelte";
	import Pagination from "@/lib/components/pagination.svelte";
	import TableHeader from "@/lib/components/tableHeader.svelte";
	import ConfirmModal from "@/lib/components/modal/confirmModal.svelte";
	import Errorstate from "@/lib/components/state/errorstate.svelte";
	import Icon from "@/lib/components/Icon.svelte";
	import { IModel } from "@/lib/types";
	import searchHandler from "@/lib/utils/searchHandler"
	import keyEventHandler from '@lib/utils/keyEventHandler'
	import {convertToRupiah} from '@lib/utils/myFunct'
	import MenuFormModal from "@/lib/components/modal/menuFormModal.svelte";

	// import Popover from "@/lib/components/popover.svelte";

	const menu = new Menu()

	let isLoadingData = false
	let openFormModal = false
	let isValid = false
	let keyword = ""
	let currentPage = 1
	let openConfirmModal = false
	let selectedMenu : IModel.Menu = {
		_id: "",
		name: "",
		upc : undefined,
		price : 0

	}
	let pageSize = 50
	let listMenu : IModel.Menu[] = []
	let listMenuDuplicate : IModel.Menu[] = []

	$: paginateItems = paginate({items : listMenu, pageSize, currentPage}) as IModel.Menu[]

	onMount( async () => {
		await loadData()
	})

	const loadData = async () => {
		// await printer.load()
		isLoadingData = true
		let isSuccess = await menu.load()
		if( isSuccess ) {
			listMenu = menu.getData()
			listMenuDuplicate = listMenu
			isValid = true
		}
		keyword = ""

		isLoadingData = false
	}

	const handleSearch = () => {
		listMenu = [...searchHandler(keyword,['name'], listMenuDuplicate)]
	}

	function handleKeydown({ keyCode }) {
		keyEventHandler(keyCode, '.item')
    }


	const tableHeaderItems : IModel.ITableHeaderItem[] = [
		{
			value : "No.",
			width : 'w-12',

		},
		{
			value : "nama Menu",

		},
		{
			value : 'harga',
			textAlign : 'text-center',
			width : 'w-36'
		},
		{
			value : 'upc',
			width : 'w-16',
			textAlign : 'text-center'
		},
		{
			value : 'kategori',
			width : 'w-1/4',
			textAlign : 'text-center'
		},
		{
			value : 'Aksi',
			width : 'w-36',
			textAlign : 'text-center'
		}
	]

	const handleDelete = async (e : CustomEvent) => {
		if(e.detail) {
			let isSuccess = await Menu.delete(selectedMenu._id)
			if (isSuccess) await loadData()
		}

		openConfirmModal = false
	}

	const handleClose = (e : {detail : { requireReload : boolean, openModal : boolean}}) => {
		if(e.detail.requireReload) loadData()
		openFormModal = e.detail.openModal
	}

</script>
{#if openFormModal}
	<MenuFormModal {...selectedMenu} on:close={handleClose} />
	<!-- <CategoryFormModal {...selectedCategory} on:close={(e) => {openFormModal = e.detail, loadData()}}/> -->
{/if}

{#if openConfirmModal}
	<ConfirmModal confirmText="Ya, hapus" on:confirm={handleDelete} title="Konfirmasi Hapus Menu" on:close={(e) => openConfirmModal = e.detail}>
		<p>Apakah anda yakin akan menghapus Kategory <span class="font-bold">{selectedMenu.name}</span> ?</p>
	</ConfirmModal>
{/if}

<div class="h-full flex flex-col w-full">
	{#if isLoadingData}
		<Loading  />
	{:else if isValid}
		<Title title="Kategori"/>
		<div class="flex items-center justify-between">
			<div class="relative w-1/2">
				<input on:keyup={handleSearch} bind:value={keyword} type="text" class="form-control !pl-9 w-full placeholder:font-normal" placeholder="Cari Kategori.." />
				<Icon name="search" class="h-6 w-6 absolute left-2 top-2 text-gray-500"/>
			</div>
			<div>
				<button tabindex="0" on:click={() => {selectedMenu={...{_id : "", name : "", category :null, price : 0}};openFormModal = true}} class="btn-primary flex items-center space-x-1">
					<Icon name="plus" class="h-6 w-6" stroke={3}/>
					<span>Tambah Menu</span>
				</button>
			</div>
		</div>
		<Pagination totalItems={listMenu.length} {currentPage} {pageSize} on:setpage={(e) => {currentPage = e.detail.page}} on:setPageSize={(e) => pageSize = e.detail} />
		<TableHeader marginRight="mr-2.5" textSize={'text-lg'} {tableHeaderItems} />
		<div on:keydown={handleKeydown} tabindex="0" role="button" class="flex-1 overflow-y-auto overflow-x-hidden scrollbar flex flex-col w-full" use:dragscroll={{axis :'y', cursor : false}}>
			{#if paginateItems.length > 0}
			<table id="table-content" class="text-gray-500 dark:text-gray-300" style="scrollbar-gutter: stable;" >
				{#each paginateItems as menu}
					<tr id={menu._id} class="tr-item item" tabindex="0" >
						<td class="p-2 text-center w-12"></td>
						<td class="p-2 ">{menu.name}</td>
						<td class="p-2 w-36 text-center">{convertToRupiah(menu.price)}</td>
						<td class="p-2 w-16 text-center ">{menu.upc ? menu.upc : '-'}</td>
						<td class="p-2 w-1/4 text-center">
							{#if menu.category && typeof menu.category === 'object' && Object.keys(menu.category).length > 0 && Object.hasOwn(menu.category, 'name')}
							<button class="btn-secondary !px-4 !py-1 rounded-lg ">{menu.category.name}</button>
							{:else}
							<span>--tidak ada kategori--</span>
							{/if}
						</td>
						<td class="py-2 w-36 text-center ">
							<div class="flex items-center space-x-1 justify-center">
								<button  class="btn-secondary !p-2" on:click={() => {selectedMenu = {...menu};openFormModal = true}}>
									<Icon name="edit" class="h-6 w-6"/>
								</button>
								<button  class="btn-secondary !p-2" on:click={() => {selectedMenu = {...menu};openConfirmModal = true}}>
									<Icon name="trash" class="h-6 w-6"/>
								</button>
							</div>
						</td>
					</tr>
				{/each}
				</table>
			{:else}
			<Errorstate msg="Tidak ada data"  />
			{/if}
		</div>
	{:else}
		<Errorstate msg="Gagal Memuat Data" />
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
