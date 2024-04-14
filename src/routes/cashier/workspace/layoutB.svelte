<script lang="ts">
    import { tick, onMount } from 'svelte'
    import { dragscroll } from "@svelte-put/dragscroll";
	import { fade } from 'svelte/transition'
    import { addedEffect, formatCurrency, scrollToElement, scrollToBottom } from '@lib/utils'
	import { type IModel, Constant } from '@/lib/types'
	import Icon from '@components/ui/Icon.svelte'
	import TableHeader from '@components/ui/tableHeader.svelte'
    import ConfirmModal from '@components/modal/confirmModal.svelte'
    import SearchMenuModal from '@components/modal/searcMenuModal.svelte'
    import CustomAddNoteModal from '@components/modal/customAddNoteModal.svelte';
	import EditMenuLayoutA2Modal from '@components/modal/editMenuLayoutA2Modal.svelte'

    export let invoice : string = ''
    export let items : IModel.IItem[] = []
    export let selectedMenu : IModel.IItem
    export let listMenu : IModel.IMenu[] = []

    // eslint-disable-next-line no-unused-vars
    export let handleSelectItem : (_id : string) => void
    // eslint-disable-next-line no-unused-vars
    export let handleAddMenu : (_params : IModel.IMenu, qty? : number) => void
    // eslint-disable-next-line no-unused-vars
    export let handleAddNote : (params : {name : string}) => void
    export let handleResetSelect : () => void
    // ui depedencies
    export let addedId : string
    export let inputElement : HTMLInputElement
    export let openConfirmModalSetPrinted = false
    
    let containerr : HTMLElement

    onMount(() => {
        inputElement.focus()
        scrollToBottom(containerr)
    })

    $: selectedMenu = items.find(i => i.selected) ?? null
    
    $: {
        watchChange(addedId).then(() => {
            scrollToElement(`item-${addedId}`, {behavior : 'smooth', block : 'nearest'})
            inputElement.focus()
        })
    }

    $: isDisabledToAddNote = items.length === 0 
        || (selectedMenu && (!!selectedMenu?.forId || selectedMenu.printed) ) 
        || ((items.length > 0 && items.filter(i => !i.forId)[items.filter(i => !i.forId).length-1].printed) ?? true)
    
    const tableHeaderItems = Constant.tableHeaderItemsLayoutB

    let keyword : string = ""
    let openConfirmModalDelete = false
    let openSearchMenuModal = false
    let openCustomAddNoteModal = false
    let openEditMenuModal = false
    

    const watchChange = async (id : string) : Promise<void> =>  {
        await tick()        
        scrollToElement(`item-${id}`, {behavior : 'smooth', block : 'nearest'})
        inputElement.focus()
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
				qty = !result[0] ? 1 : parseFloat(result[0])
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
            handleResetSelect()
        }
        openConfirmModalDelete = false
    }

    const handleKeydown = (e : KeyboardEvent) => {
        let key = e.key
        if (key !== 'ArrowUp' && key !== 'ArrowDown') return
        if(selectedMenu) e.preventDefault()
        const currentIndex = items.indexOf(selectedMenu)
        let newIndex : number
        if (currentIndex === -1) {
            newIndex = 0
        } else {
            if (key === 'ArrowUp') newIndex = (currentIndex + items.length - 1) % items.length
            else if (key === 'ArrowDown') newIndex = (currentIndex + 1) % items.length
        }
        
        let id  = (items[newIndex] && items[newIndex]._id) ?? ""
        if(id) {
            handleSelectItem(id)
            scrollToElement(`item-${id}`, {behavior : 'smooth', block : 'nearest'})
            inputElement.blur()
        }

    }

    const handleSubmit = (e : CustomEvent<{menu : IModel.IMenu}>) => {
        if (e.detail && e.detail.menu) {
            handleAddMenu({...e.detail.menu})
            keyword = ""
        }
        inputElement.focus()
        openSearchMenuModal = false
    }

    const handleClose = () => {
        openConfirmModalDelete = false
        openSearchMenuModal = false
        openCustomAddNoteModal = false
        openEditMenuModal = false
        openConfirmModalSetPrinted = false
        inputElement.focus()
        handleResetSelect()
    }

    const handleEdit = (e : CustomEvent<IModel.IItem>) => {
        let { forId, name, printed, _id, qty, price, total } = e.detail
        let findItem = items.find(item => item._id === _id)
        if(findItem) {
            if(findItem.forId && forId) {
                findItem.name = name
            } else {
                findItem.name = name
                findItem.printed = printed
                findItem.qty = qty
                findItem.total = total
                findItem.price = price
            }
        }
        items = [...items]
        openEditMenuModal = false
        
    }

</script>
{#if openConfirmModalDelete}
    <ConfirmModal title="Konfirmasi Hapus Pesanan" confirmText="Ya, Hapus" on:close={handleClose} on:confirm={handleDelete} >
        {#if selectedMenu?.printed}
        <p>Pesanan <span class="font-bold uppercase">{selectedMenu.name}</span> berstatus <span class="font-bold uppercase">sudah dipesan</span>.</p>
        <p>Apakah anda yakin akan menghapusnya? </p>
        {:else}
        <p>Apakah anda yakin akan menghapus <span class="font-bold uppercase">{selectedMenu.name}?</span></p>
        {/if}
    </ConfirmModal>
{/if}
{#if openSearchMenuModal}
    <SearchMenuModal {listMenu} {keyword} on:close={handleClose} on:submit={handleSubmit}></SearchMenuModal>
{/if}
{#if openCustomAddNoteModal}
    <CustomAddNoteModal on:close={handleClose} on:submit={(e) => {handleAddNote({...e.detail}), handleClose()}} />
{/if}
{#if openEditMenuModal}
    <EditMenuLayoutA2Modal {...selectedMenu} on:close={handleClose} on:submit={handleEdit} />
{/if}
<svelte:window on:keydown={handleKeydown}></svelte:window>
<div class="row-span-10 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden max-h-full grid grid-cols-1 grid-rows-12 p-2">
    <div class="grid grid-cols-2 items-end pb-2">
        <!-- input upc -->
        <div class="relative ">
            <input 
                type="text"
                bind:this={inputElement}
                bind:value={keyword}
                on:keydown={handleSearch}
                on:click={() => handleResetSelect()}
                class="form-control !pl-8 peer" placeholder="Masukan UPC atau Nama Menu" />
            <Icon name="qr-code" class="h-6 w-6 absolute top-2.5 left-1.5 text-gray-500 peer-focus:text-gray-900 dark:peer-focus:text-gray-50"  />
        </div>
        <div class="flex flex-0 items-center justify-end space-x-2">
            
            {#if selectedMenu}
                <button transition:fade={{duration :200}} class="btn-secondary !p-2" on:click={() => openConfirmModalDelete = true}>
                    <Icon name="trash" class="h-6 w-6" />
                </button>
                <button transition:fade={{duration :200}} class="btn-secondary !p-2"  on:click={() => openEditMenuModal = true}>
                    <Icon name="ellipsis-vertical" class="h-6 w-6" stroke={3} />
                </button>
                {#if invoice}
                    <button class="btn-secondary !p-2" on:click={() => openConfirmModalSetPrinted = true}>
                        {#if !selectedMenu.printed}
                            <Icon name="open-padlock" class="h-6 w-6" />
                        {:else}
                            <Icon name="padlock" class="h-6 w-6" />
                        {/if}
                    </button>
                {/if}
            {/if}
            <button disabled={isDisabledToAddNote} transition:fade={{duration :200}} class="btn-secondary !p-2" on:click={() => openCustomAddNoteModal = true}>
                <Icon name="chat" class="h-6 w-6" />
            </button>
        </div>
    </div>
    <div class="grid items-start">
        <TableHeader {tableHeaderItems} textSize={'text-sm'} class="w-full"/>
    </div>
    <!-- on:keydown={handleKeydown}  -->
    <!-- on:click={handleClickDiv}  -->
    <!-- tabindex="0" 
        role="button" -->
    <div 
        
        style="scrollbar-gutter: stable;"
        class="overflow-y-auto row-span-11 overflow-x-hidden outline-none cursor-default" 
        bind:this={containerr}
        use:dragscroll={{cursor : false, axis : 'y'}}>
        <div >
            <table id="table-conter"  class="tex4t-gray-500 dark:text-gray-300 text-sm font-bold w-full" >
            {#each items as order (order._id)}
            <!--  -->
                <tr 
                    id={`item-${order._id}`} 
                    class="{order.selected ? 'bg-gray-300 dark:bg-gray-700' : 'bg-inherit' } {order.printed ? 'dark:text-gray-600 text-gray-400' : ''} my-items"
                    in:addedEffect|local
                    on:click={() => handleSelectItem(order._id)}
                    >
                    {#if !order.forId}
                        {#key order.qty}
                            <td in:addedEffect|local class="w-14 text-center  ">{order.qty}</td>
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