<script lang="ts">
	import { onMount } from "svelte";
	import { dragscroll } from "@svelte-put/dragscroll";
	import {paginate} from 'svelte-paginate'
	import { Category } from "@/lib/controller/category.controller";
	import Loading from "@/lib/components/state/loading.svelte";
	import Title from "@/lib/components/navbar/title.svelte";
	import Pagination from "@/lib/components/pagination.svelte";
	import TableHeader from "@/lib/components/tableHeader.svelte";
	import ConfirmModal from "@/lib/components/modal/confirmModal.svelte";
	import Errorstate from "@/lib/components/state/errorstate.svelte";
	import Icon from "@/lib/components/Icon.svelte";
	import {DEFAULT_PAGE_SIZE} from '@lib/types/constants'
	import { IModel } from "@/lib/types";
	import searchHandler from "@/lib/utils/searchHandler"
	import keyEventHandler from '@lib/utils/keyEventHandler'
	import CategoryFormModal from "@/lib/components/modal/categoryFormModal.svelte"
	const category = new Category()
	let isLoadingData = false
	let openFormModal = false
	let isValid = false
	let keyword = ""
	let currentPage = 1
	let openConfirmModal = false
	let selectedCategory : IModel.Category = {
		_id: "",
		name: "",
		printer: ""
	}
	let pageSize = DEFAULT_PAGE_SIZE
	let listCategories : IModel.Category[] = []
	let listCategoriesDuplicate : IModel.Category[] = []

	$: paginateItems = paginate({items : listCategories, pageSize, currentPage}) as IModel.Category[]

	onMount( async () => {
		await loadData()
	})

	const loadData = async () => {
		isLoadingData = true
		let isSuccess = await category.load()
		if( isSuccess ) {
			listCategories = category.getData()
			listCategoriesDuplicate = [...listCategories]
			isValid = true
		}

		isLoadingData = false
	}

	const handleSearch = () => {
		listCategories = [...searchHandler(keyword,['name'], listCategoriesDuplicate)]
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
			value : "nama kategori",
		},
		{
			value : 'printer tambahan',
			width : 'w-2/5',
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
			let isSuccess = await Category.delete(selectedCategory._id)
			if (isSuccess) await loadData()
		}

		openConfirmModal = false
	}

</script>
{#if openFormModal}
	<CategoryFormModal {...selectedCategory} on:close={(e) => {openFormModal = e.detail, loadData()}}/>
{/if}

{#if openConfirmModal}
	<ConfirmModal confirmText="Ya, hapus" on:confirm={handleDelete} title="Konfirmasi Hapus Kategori" on:close={(e) => openConfirmModal = e.detail}>
		<p>Apakah anda yakin akan menghapus Kategory <span class="font-bold">{selectedCategory.name}</span> ?</p>
	</ConfirmModal>
{/if}

<div class="h-full flex flex-col w-full">
	{#if isLoadingData}
		<Loading  />
	{:else if isValid}
		<Title title="Kategori"/>
		<div class="flex items-center justify-between">
			<div class="relative w-1/2">
				<input on:keyup={handleSearch} bind:value={keyword} type="text" class="form-control !pl-9 w-full placeholder:font-normal" placeholder="Cari Pengguna.." />
				<Icon name="search" class="h-6 w-6 absolute left-2 top-2 text-gray-500"/>
			</div>
			<div>
				<button tabindex="0" on:click={() => openFormModal = true} class="btn-primary flex items-center space-x-1">
					<Icon name="plus" class="h-6 w-6" stroke={3}/>
					<span>Tambah Kategori</span>
				</button>
			</div>
		</div>
		<Pagination totalItems={listCategories.length} {currentPage} {pageSize} on:setpage={(e) => {currentPage = e.detail.page}} on:setPageSize={(e) => pageSize = e.detail} />
		<TableHeader marginRight={"mr-3"} textSize={'text-lg'} {tableHeaderItems} />
		<div on:keydown={handleKeydown} tabindex="0" role="button" class="flex-1 overflow-y-auto overflow-x-hidden scrollbar flex flex-col w-full" use:dragscroll={{axis :'y', cursor : false}}>
			{#if paginateItems.length > 0}
			<table id="table-content" class="text-gray-500 dark:text-gray-300 mr-2" style="scrollbar-gutter: stable;" >
				{#each paginateItems as category}
					<tr id={category._id} class="tr-item item" tabindex="0" >
						<td class="p-2 text-center w-12"></td>
						<td class="p-2">{category.name}</td>
						<td class="p-2 w-2/5 text-center">

							{#if category.printer && typeof category.printer === 'object' && Object.keys(category.printer).length > 0 }
								<button class="bg-gray-200 dark:bg-gray-700 btn !px-4 !py-1">{category.printer?.displayName}</button>
							{:else}
								<span>-</span>
							{/if}
						</td>
						<td class="p-2 w-36 text-center">
							<div class="flex items-center space-x-1 justify-center">
								<button  class="btn-secondary !p-2" on:click={() => {selectedCategory = {...category};openFormModal = true}}>
									<Icon name="edit" class="h-6 w-6"/>
								</button>
								<button  class="btn-secondary !p-2" on:click={() => {selectedCategory = {...category};openConfirmModal = true}}>
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
