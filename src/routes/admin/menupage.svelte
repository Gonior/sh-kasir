<script lang="ts">
	import { onMount } from "svelte";
	import { dragscroll } from "@svelte-put/dragscroll";
	import { paginate } from 'svelte-paginate'
	import Loading from "@/lib/components/state/loading.svelte";
	import Popover from '@/lib/components/popover/popover.svelte'
	import Title from "@/lib/components/navbar/title.svelte";
	import Pagination from "@/lib/components/pagination.svelte";
	import TableHeader from "@/lib/components/tableHeader.svelte";
	import ConfirmModal from "@/lib/components/modal/confirmModal.svelte";
	import Errorstate from "@/lib/components/state/errorstate.svelte";
	import Icon from "@/lib/components/Icon.svelte";
	import PrinterComponent from "@/lib/components/printerComponent/printerComponent.svelte";
	import MenuFormModal from "./components/menuFormModal.svelte";
	import MenuService from '@lib/services/menu.service'
	import CategoryService from "@lib/services/category.service";
	import Menu from '@lib/models/menu.model'
	import { IModel , type ITableHeaderItem } from '@lib/types'
	import { scale } from "svelte/transition"
	import { isValidObject, keydownHandler, searchHandler,formatCurrency } from "@/lib/utils"

	const menuService = new MenuService()
	const categoryService = new CategoryService()
	let isLoadingData = false
	let openFormModal = false
	let isValid = false
	let keyword = ""
	let currentPage = 1
	let openConfirmModal = false

	let selectedMenu : IModel.IMenu = {
		_id: "",
		name: "",
		upc : undefined,
		price : 0,
		category : undefined
	}

	let selectedCategory : string[] = []
	let pageSize = 50
	let listMenu : IModel.IMenu[] = []
	let listMenuDuplicate : IModel.IMenu[] = []
	let listMenuDuplicateFilter :IModel.IMenu[] = []
	let listCategories : IModel.ICategory[] = []
	
	$: paginateItems = paginate({items : listMenu, pageSize, currentPage}) as IModel.IMenu[]
	$: listMenuDuplicateFilter = [...listMenuDuplicate.filter(menu => selectedCategory.indexOf((menu.category as IModel.ICategory)._id) !== -1)]
	$: listMenu = [...listMenuDuplicateFilter]

	onMount( async () => {
		await loadData()
	})

	const loadData = async () => {
		// await printer.load()
		isLoadingData = true
		await categoryService.load()
		let isSuccess = await menuService.load()
		if( isSuccess ) {
			listCategories = categoryService.getData()
			listMenu = menuService.getData()
			listMenuDuplicate = listMenu
			listMenuDuplicateFilter = listMenu
			selectedCategory = [...listCategories.map(c => c._id)] || []
			isValid = true
		}
		keyword = ""

		isLoadingData = false
	}

	const handleSearch = () => {
		listMenu = [...searchHandler(keyword,['name', "upc"], listMenuDuplicateFilter)]
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
			let menu = new Menu(selectedMenu)
			let isSuccess = await menu.delete()
			if (isSuccess) await loadData()
		}

		openConfirmModal = false
	}

	const handleClose = (e : {detail : { requireReload : boolean, openModal : boolean}}) => {
		if(e.detail.requireReload) loadData()
		openFormModal = e.detail.openModal
	}

	const toggleAll = (e) => {
		selectedCategory = e.target?.checked ? [...listCategories.map(c => c._id)] : []
	}

</script>
{#if openFormModal}
	<MenuFormModal {...selectedMenu} on:close={handleClose} />
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
		<Title title="Menu"/>
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-2  w-1/2">
				<div class="relative w-full">
					<input on:keyup={handleSearch} bind:value={keyword} type="text" class="form-control !pl-9 w-full placeholder:font-normal" placeholder="Cari Kategori.." />
					<Icon name="search" class="h-6 w-6 absolute left-2 top-2 text-gray-500"/>
				</div>
				<Popover class="ring-1 ring-gray-300 dark:ring-0 dark:bg-gray-700" placement="left">
					<svelte:fragment slot="button" >
						<div class="relative ">
							<Icon name="filter" class="h-6 w-6"/>
							{#key selectedCategory}
							<div in:scale={{duration : 200}} class="w-5 h-5 flex items-center justify-center absolute bg-red-500 rounded-full -top-4 -right-4 text-white text-xs">
								<span class="">{selectedCategory.length}</span>
							</div>
							{/key}
							
						</div>
					</svelte:fragment>
					
					<svelte:fragment slot="content">
						<p class="font-bold">Saring berdasarkan kategori</p>
						<label for="semua" class="flex items-center space-x-1 py-1 text-base max-w-max"> 
							<input id="semua" type="checkbox" on:change={toggleAll} name="printer" checked={listCategories.length === selectedCategory.length} value=semua />
							<p class="">Semua</p>
						</label>
						{#each listCategories as lc}
							<label for={lc._id} class="flex items-center space-x-1 py-1 text-base max-w-max">
								<input id={lc._id} type="checkbox" name="printer" bind:group={selectedCategory} value={lc._id} />
								<p class="">{lc.name}</p>
							</label>
						{/each}
					</svelte:fragment>
				</Popover>
				
			</div>
			<div class="">
				<button tabindex="0" on:click={() => {selectedMenu={...{_id : "", name : "", category :undefined, price : 0}};openFormModal = true}} class="btn-primary flex items-center space-x-1">
					<Icon name="plus" class="h-6 w-6" stroke={3}/>
					<span>Tambah Menu</span>
				</button>
			</div>
			
		</div>
		<Pagination totalItems={listMenu.length} {currentPage} {pageSize} on:setpage={(e) => {currentPage = e.detail.page}} on:setPageSize={(e) => pageSize = e.detail} />
		<TableHeader marginRight="mr-2.5" textSize={'text-lg'} {tableHeaderItems} />
		<div on:keydown={handleKeydown} tabindex="0" role="button" class="flex-1 overflow-y-auto overflow-x-hidden flex flex-col w-full" use:dragscroll={{axis :'y', cursor : false}}>
			{#if paginateItems.length > 0}
			<table id="table-content" class="text-gray-500 dark:text-gray-300" style="scrollbar-gutter: stable;" >
				{#each paginateItems as menu}
					<tr id={menu._id} class="tr-item item relative	" tabindex="0" >
						<td class="p-2 text-center w-12"></td>
						<td class="p-2 ">{menu.name}</td>
						<td class="p-2 w-36 text-center">{formatCurrency(menu.price)}</td>
						<td class="p-2 w-16 text-center ">{menu.upc ? menu.upc : '-'}</td>
						<td class="p-2 w-1/4 text-center ">
							{#if isValidObject(menu.category) && Object.hasOwn(menu.category,'name')}
								<div class="flex flex-col space-y-1 max-w-max mx-auto">
									<Popover class="ring-1 ring-gray-300 dark:ring-0 dark:bg-gray-700 !px-4 !py-1 justify-center items-center" placement="left">
										<svelte:fragment slot="button" >{menu.category.name}</svelte:fragment>
										<svelte:fragment slot="content">
											{#each menu.category.printer as printer}
												<PrinterComponent {printer} />
											{:else}
											<span class="text-sm text-gray-400 dark:text-gray-500">--Tidak ada Printer Tambahan--</span>
											{/each}
										</svelte:fragment>
									</Popover>
								</div>
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
