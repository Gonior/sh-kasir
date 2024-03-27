<script lang="ts">
	import { onMount, createEventDispatcher } from "svelte"
    import { paginate} from 'svelte-paginate'
    import { IModel } from "@lib/types";
    import MenuService from "@lib/services/menu.service";	
	import { formatCurrency } from "@lib/utils"
    import LayoutBLoadingState from "@components/state/layoutBLoadingState.svelte";
    import Errorstate from "@components/state/errorstate.svelte";
    import Pagination from './paginationLayoutB.svelte'

    const menuService = new MenuService()
    const dispatch = createEventDispatcher()
    const pageSizeCategory = 8
    const pageSizeMenu = 14

    let listData : IModel.ILayoutBData[] = []
    let isLoading = true
    let isValid = false
    let currentPageCategory = 1
    let currentPageMenu = 1
    
    $: selectedCategory = listData.find(d => d.category.selected) ?? {data : []}
    $: paginateData = paginate({items : listData, pageSize : pageSizeCategory, currentPage : currentPageCategory}) as IModel.ILayoutBData[]
    $: paginateMenu = paginate({items : selectedCategory?.data, pageSize : pageSizeMenu, currentPage : currentPageMenu}) as IModel.IMenu[]

    onMount( async () => {
        let isSuccess = await menuService.load()
        if (isSuccess) {
            listData = menuService.getDataByCategory()
            if(selectedCategory.data.length === 0) listData[0].category.selected = true
            isValid = true
        }
        isLoading = false
    })

    const handleSelectCategory = (_id : string) => {
        listData = [...listData.map((data) => {
            if (data.category._id === _id) data.category.selected = true
            else data.category.selected = false
            return data
        } )]
    }
</script>

{#if isLoading}
    <LayoutBLoadingState />
{:else if isValid}

<div class="grid grid-rows-12 grid-cols-1 gap-1 h-full ">
    <div class="grid grid-cols-3 gap-2 row-span-11 ">
        <div class="grid grid-cols-1 grid-rows-8 gap-2">
            {#each paginateData as data}
                <button on:click={() => handleSelectCategory(data.category._id)} class="truncate {data.category.selected ? 'btn-primary' : 'btn-secondary bg-amber-50 border border-amber-900 dark:border-0 dark:!bg-amber-950  dark:!text-amber-100'}">
                    {data.category.name} 
                </button>
            {/each}
        </div>
        <div class="col-span-2 grid grid-cols-2 grid-rows-7 gap-2 text-sm">
            {#each paginateMenu as menu}
                <button on:click={() => dispatch('addMenu', menu)} class="btn-secondary flex flex-col justify-between text-md rounded-md p-2">
                    <p class="truncate font-bold max-w-full">{menu.name} </p>
                    <div class="flex justify-between items-center w-full text-gray-400 text-xs">
                        <span>UPC {menu.upc ?? '-'}</span>
                        <span>{formatCurrency(menu.price)}</span>   
                    </div>
                </button>
            {/each}
        </div>
    </div>
    <div class="grid grid-cols-3 gap-2 ">
        <Pagination 
            currentPage={currentPageCategory} 
            pageSize={pageSizeCategory} 
            totalItems={listData.length} 
            on:setPage={e => currentPageCategory = e.detail.page} />
        <div class="col-span-2 flex">
            <Pagination 
                currentPage={currentPageMenu} 
                pageSize={pageSizeMenu} 
                totalItems={selectedCategory.data.length} 
                on:setPage={e => currentPageMenu = e.detail.page} />
        </div>
    </div>
</div>


{:else}
<Errorstate msg="Gagal Memuat Data!" submsg={'Pastikan anda terkoneksi dengan server!'} />

{/if}
