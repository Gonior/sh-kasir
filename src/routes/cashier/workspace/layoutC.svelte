<script lang="ts">
	import { onMount } from "svelte"
    import { paginate} from 'svelte-paginate'
    import { IModel } from "@lib/types";
	import { formatCurrency} from "@lib/utils"
    import Pagination from './components/paginationLayoutC.svelte'

    const pageSizeCategory = 8
    const pageSizeMenu = 14

    // eslint-disable-next-line no-unused-vars
    export let handleAddMenu : (_params : IModel.IMenu, qty? : number) => void

    export let listData : IModel.ILayoutCData[] = []
    
    let currentPageCategory = 1
    let currentPageMenu = 1
    
    $: selectedCategory = listData.find(d => d.category.selected) ?? {data : []}
    $: paginateData = paginate({items : listData, pageSize : pageSizeCategory, currentPage : currentPageCategory})
    $: paginateMenu = paginate({items : selectedCategory?.data, pageSize : pageSizeMenu, currentPage : currentPageMenu}) 

    onMount( async () => {
        if(selectedCategory.data.length === 0) {
            listData[0].category.selected = true
        }
        
    })

    const handleSelectCategory = (_id : string) => {
        if (listData.find(d => d.category.selected).category._id !== _id) currentPageMenu = 1
        listData = [...listData.map((data) => {
            if (data.category._id === _id) data.category.selected = true
            else data.category.selected = false
            return data
        })]

    }

    const addMenu = (menu : IModel.IMenu) => {
        let c = {...menu.category}
        let m = {...menu}
        if ('selected' in c) delete c.selected
        m.category = {...c}
        handleAddMenu(m)
    }

</script>


<div class="grid grid-rows-12 grid-cols-1 gap-1 h-full ">
    <div class="grid grid-cols-3 gap-2 row-span-11">
        <div class="grid grid-cols-1 grid-rows-8 gap-2">
            {#each paginateData as data}
                <button on:click={() => handleSelectCategory(data.category._id)} class="truncate {data.category.selected ? 'btn-primary' : 'btn-secondary bg-amber-50 border border-amber-900 dark:border-0 dark:!bg-amber-950  dark:!text-amber-100'}">
                    {data.category.name} 
                </button>
            {/each}
        </div>
        <div class="col-span-2 grid grid-cols-2 grid-rows-7 gap-2 text-sm">
            {#each paginateMenu as menu}
                <button on:click={() => addMenu(menu)} class="btn-secondary flex flex-col justify-between text-md rounded-md p-2">
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
        <div class="col-span-2 flex w-full">
            <Pagination 
                currentPage={currentPageMenu} 
                pageSize={pageSizeMenu} 
                totalItems={selectedCategory.data.length} 
                on:setPage={e => currentPageMenu = e.detail.page} />
        </div>
    </div>
</div>
