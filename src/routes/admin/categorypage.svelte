<script lang="ts">
	import { onMount } from "svelte";
	import { dragscroll } from "@svelte-put/dragscroll";
	import {paginate} from 'svelte-paginate'
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
	let isLoadingData = false
	let openFormModal = false
	let isValid = true
	let keyword = ""
	let currentPage = 1
	let pageSize = DEFAULT_PAGE_SIZE
	let listCategories : IModel.Category[] = []
	let listCategoriesDuplicate : IModel.Category[] = []

	const handleSearch = () => {
		listCategories = [...searchHandler(keyword,['name'], listCategoriesDuplicate)]
	}

	const tableHeaderItems : IModel.ITableHeaderItem[] = [
		{
			value : "No.",
			width : 'w-12',

		}, {
			value : "nama kategori",
		},{
			value : 'printer tambahan',
			width : 'w-1/4',
			textAlign : 'text-center'
		},{
			value : 'Aksi',
			width : 'w-36',
			textAlign : 'text-center'
		}
	]

</script>
{#if openFormModal}
	<h1>haii</h1>
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
		<TableHeader marginRight={"mr-2"} textSize={'text-lg'} {tableHeaderItems} />
	{:else}
		<Errorstate icon="folder" msg="Gagal Memuat Data" />
	{/if}
</div>
