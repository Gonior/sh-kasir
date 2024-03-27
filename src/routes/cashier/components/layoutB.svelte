<script lang="ts">
	import { onMount } from "svelte"
    import { paginate } from 'svelte-paginate'
    import { IModel } from "@lib/types";
    import LayoutBLoadingState from "@components/state/layoutBLoadingState.svelte";
    import Errorstate from "@components/state/errorstate.svelte";
    import MenuService from "@lib/services/menu.service";	

    const menuService = new MenuService()
    let currentPage1 = 1
    // let currentPage2 = 1
    interface IData {
        category : IModel.ICategory, 
        data : IModel.IMenu
    }
    // 
    $: paginateData = paginate({items : listData, pageSize : 9, currentPage : currentPage1}) as IData[]
    // $: paginateMenu = paginate({items : , pageSize, currentPage}) as IModel.ICategory[]

    let listData = []
    let isLoading = true
    let isValid = false
    onMount( async () => {
        let isSuccess = await menuService.load()
        if (isSuccess) {
            listData = menuService.getDataByCategory()
            
            isValid = true
        }
        isLoading = false
    })
</script>

{#if isLoading}
    <LayoutBLoadingState />
{:else if isValid}
<div class="grid grid-cols-3 gap-2 p-2">
    <div class="grid grid-cols-1 grid-rows-7 gap-2">
        {#each paginateData as data}
            <!-- {console.log(data)} -->
            <button class="btn-secondary truncate">
                {data.category.name} 
            </button>
            
        {/each}
        <!-- categori disini -->
    </div>
    <div class="col-span-2 grid grid-cols-2 grid-rows-7 gap-2">
        <!-- item nya disini -->
    </div>
</div>
<div class="grid grid-cols-3 gap-2 px-2 ">
    <div class="flex justify-between">
        
    </div>
    <div class="col-span-2 flex justify-end space-x-4">
        
    </div>
</div>

{:else}
<Errorstate msg="Gagal Memuat Data!" submsg={'Pastikan anda terkoneksi dengan server!'} />

{/if}

