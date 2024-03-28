<script lang="ts">
    import { tick, onMount } from 'svelte'
    import { dragscroll } from "@svelte-put/dragscroll";
	import { fade } from 'svelte/transition'
    import { addedEffect, formatCurrency, scrollToElement } from '@lib/utils'
	import { type IModel, Constant } from '@/lib/types'
	import Icon from '@components/ui/Icon.svelte'
	import TableHeader from '@components/ui/tableHeader.svelte'
    import ConfirmModal from '@components/modal/confirmModal.svelte'
    import SearchMenuModal from '@components/modal/searcMenuModal.svelte'

    // eslint-disable-next-line no-unused-vars
    export let handleAddMenu : (_params : IModel.IMenu, qty? : number) => void
    export let items : IModel.IItem[] = []
    export let listMenu : IModel.IMenu[] = []
    export let addedId : string
    export let inputElement : HTMLInputElement
    export let selectedMenu = items.find(i => i.selected) ?? null
    export let resetSelect : () => void

    onMount(() => {
        inputElement.focus()
    })

    $: selectedMenu = items.find(i => i.selected) ?? null
    $: {
        watchChange(addedId).then(() => {
            scrollToElement(`item-${addedId}`, {behavior : 'smooth', block : 'nearest'})
            inputElement.focus()
        })
    }
    
    const tableHeaderItems = Constant.tableHeaderItemsLayoutB

    let keyword : string = ""
    let openConfirmModalDelete = false
    let openSearchMenuModal = false

    const watchChange = async (id : string) : Promise<void> =>  {
        await tick()        
        scrollToElement(`item-${id}`, {behavior : 'smooth', block : 'nearest'})
        inputElement.focus()
    }

    const handleClickMenu = (_id : string) => {
        items = [ ...items.map((item) => {
			if (item._id === _id) item.selected = true
			else item.selected = false
			return item
		})]
    }

    const handleClickDiv = () => {
        if(items.length === 0) return 

        if(!selectedMenu) {
            let filtered = [...items.filter((item) => !item.forId)]
            handleClickMenu(filtered[filtered.length-1]._id)
        }
        
        
    }
    const handleSearch = (e : KeyboardEvent) => {
        
        if (e.key === 'Enter') {
            e.preventDefault()
            let regex = new RegExp(/^[0-9.]*\*[0-9]/)
			let qty : number = 1
            let menu : IModel.IMenu
			if (!isNaN(+keyword)) {
                let findMenu = listMenu.find((menu) => menu.upc === +keyword)
                if ( findMenu ) menu = {...findMenu}
            }
			else if (regex.test(keyword)) {
				let result = keyword.split('*')
				qty = !result[0] ? 1 : parseInt(result[0])
				keyword = result[1]
                let findMenu = listMenu.find((menu) => menu.upc === +keyword)
                if ( findMenu ) menu = {...findMenu}

			}
            if(menu) {
                handleAddMenu(menu, qty)
                keyword = ""
                inputElement.focus()
            } else {
                setTimeout(() => {
                    openSearchMenuModal = true
                }, 100)
            }
        }
    }

    const handleDelete = (e : CustomEvent<boolean>) => {
        if(e.detail) {
            items = [...items.filter(item => item._id !== selectedMenu._id)]
            items = [...items.filter(item => item.forId !== selectedMenu._id)]
            resetSelect()
        }
        openConfirmModalDelete = false
    }

    const handleKeydown = (e : KeyboardEvent) => {
        let key = e.key
        if (key !== 'ArrowUp' && key !== 'ArrowDown' && key !== 'Enter') return
        const currentIndex = items.indexOf(selectedMenu)
        let newIndex : number
        if (currentIndex === -1) {
            newIndex = 0
        } else {
            if (key === 'ArrowUp') newIndex = (currentIndex + items.length - 1) % items.length
            else if (key === 'ArrowDown') newIndex = (currentIndex + 1) % items.length
            else if (key === 'Enter') {
                console.log('enter detected')
            }
        }
        handleClickMenu(items[newIndex]._id)
    }

    const handleSubmit = (e : CustomEvent<{menu : IModel.IMenu}>) => {
        if (e.detail && e.detail.menu) {
            handleAddMenu({...e.detail.menu})
            keyword = ""
        }
        inputElement.focus()
        openSearchMenuModal = false
    }
    

</script>
{#if openConfirmModalDelete}
    <ConfirmModal title="Konfirmasi Hapus Pesanan" confirmText="Ya, Hapus" on:close={() => {openConfirmModalDelete = false; inputElement.focus()}} on:confirm={handleDelete} >
        <p>Apakah anda yakin akan menghapus <span class="font-bold uppercase">{selectedMenu.name}?</span></p>
    </ConfirmModal>
{/if}
{#if openSearchMenuModal}
    <SearchMenuModal {listMenu} {keyword} on:close={() => {openSearchMenuModal = false; inputElement.focus()}} on:submit={handleSubmit}></SearchMenuModal>
{/if}

<div class="row-span-10 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden max-h-full grid grid-cols-1 grid-rows-12 p-2">
    <div class="grid grid-cols-2 items-end pb-2">
        <!-- input upc -->
        <div class="relative ">
            <input 
                type="text"
                bind:this={inputElement}
                bind:value={keyword}
                on:keydown={handleSearch}
                on:click={() => resetSelect()}
                class="form-control !pl-8 peer" placeholder="Masukan UPC atau nama menu" />
            <Icon name="qr-code" class="h-6 w-6 absolute top-2.5 left-1.5 text-gray-500 peer-focus:text-gray-900 dark:peer-focus:text-gray-50"  />
        </div>
        <div class="flex flex-0 items-center justify-end space-x-2">
            <!-- <button class="btn-secondary !p-2">
                <Icon name="padlock" class="h-6 w-6" />
            </button> -->
            {#if selectedMenu}
                <button transition:fade={{duration :200}} class="btn-secondary !p-2"  on:click={() => openConfirmModalDelete = true}>
                    <Icon name="trash" class="h-6 w-6" />
                </button>
                <button transition:fade={{duration :200}} class="btn-secondary !p-2">
                    <Icon name="ellipsis-vertical" class="h-6 w-6" stroke={3} />
                </button>
            {/if}
            <button disabled={items.length === 0} transition:fade={{duration :200}} class="btn-secondary !p-2">
                <Icon name="chat" class="h-6 w-6" />
            </button>
        </div>
    </div>
    <div class="grid items-start">
        <TableHeader {tableHeaderItems} textSize={'text-sm'} class="w-full"/>
    </div>
    <div tabindex="0" role="button" class="overflow-y-auto row-span-11 overflow-x-hidden outline-none cursor-default " on:keydown={handleKeydown} on:click={handleClickDiv} use:dragscroll={{cursor : false, axis : 'y'}} style="scrollbar-gutter: stable;" >
        <div >
            <table id="table-conter"  class="tex4t-gray-500 dark:text-gray-300 text-sm font-bold w-full" >
            {#each items as order (order._id)}
                <tr 
                    id={`item-${order._id}`} 
                    class="{order.selected ? 'bg-gray-300 dark:bg-gray-700' : 'bg-inherit' } "
                    in:addedEffect|local
                    on:click={() => handleClickMenu(order._id)}
                    >
                    {#if !order.forId}
                        {#key order.qty}
                            <td in:addedEffect|local class="w-14 text-center">{order.qty}</td>
                            <td in:addedEffect|local class="">{order.name}</td>
                            <td in:addedEffect|local class="w-20 text-right">{formatCurrency(order.price)}</td>
                            <td in:addedEffect|local class=" w-28 text-right">{formatCurrency(order.total)}</td>
                        {/key}
                    {:else}
                        <td in:addedEffect|local class="w-14 text-center "></td>
                        <td in:addedEffect|local colspan="3" class="">- {order.name}</td>
                    {/if}
                </tr>
                
                {/each}
            </table>
        </div>
    </div>
</div>