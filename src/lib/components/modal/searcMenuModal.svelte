<script lang="ts">

    import { createEventDispatcher, onMount } from 'svelte'
    import { focusTrap } from 'svelte-focus-trap';
	import { toast } from 'svelte-sonner'
    import Modal from "./modal.svelte";
    import Icon from '../ui/Icon.svelte'
	import type { IModel } from '@/lib/types'
    import { formatCurrency, searchHandler, selectId } from '@lib/utils'
	
    const dispatch = createEventDispatcher()

    export let keyword = ""
    export let listMenu : IModel.IMenu[] = []
    export let filteredMenu : IModel.IItem[] = []

    let selectedMenu : IModel.IItem
    $: selectedMenu = filteredMenu.find(menu => menu.selected) ?? null
    let elInput : HTMLInputElement

    onMount(() => {
        keyword = keyword.replaceAll(/[^a-zA-Z0-9 -*]*/g, '')
        // console.log(listMenu)
        // filteredMenu = [...listMenu.map((menu) => {
        //     let item : IModel.IItem = {...menu, printed : false, selected : false}
        //     return item
        // })]
        handleSearch()
        elInput.focus()
        elInput.select()
        
    })

    const handleClose = () => {
        handleSelect("")
        setTimeout(() => dispatch('close', false), 100)
    }

    const handleSearch = (e? : KeyboardEvent) => {
        try {
            if (keyword) filteredMenu = [...searchHandler(keyword,['name', "upc"], listMenu) as IModel.IItem[]]
            else filteredMenu = []
            if (filteredMenu.length === 1) {
                handleSelect(filteredMenu[0]._id)
            }    
        } catch (error) {
            console.error(error)
        }
        
        if(e && e.key === "Escape") {
            handleClose()
        }

        
	}    

    const handleSubmit = (e : any) => {
        e.preventDefault()
        
        if (!selectedMenu) {
            toast.error('Pilih salah satu menu!')
        } else {
            elInput.blur()
            // toast.success(`Kamu memilih menu ${selectedMenu.name}`)
            dispatch('submit', {menu : selectedMenu})
            handleClose()
        }
    }

    const handleSelect = (_id : string) => {
        filteredMenu = [...selectId(filteredMenu, _id)]
    }

    const handleKeydown = (e : KeyboardEvent) => {
        let key = e.key
        if (key !== 'ArrowUp' && key !== 'ArrowDown' && key !== 'Enter' && key !== 'Escape') return
        const currentIndex = filteredMenu.indexOf(selectedMenu)
        let newIndex : number
        if (currentIndex === -1) {
            newIndex = 0
        } else {
            if (key === 'ArrowUp') newIndex = (currentIndex + filteredMenu.length - 1) % filteredMenu.length
            else if (key === 'ArrowDown') newIndex = (currentIndex + 1) % filteredMenu.length
            else if (key === 'Enter') {
                console.log('enter detected')
                newIndex = currentIndex
            }
            else if (key === 'Escape') {
                newIndex = currentIndex
                handleClose()
            }
        }
        let id = filteredMenu[newIndex]?._id ?? ""
        if(id) {
            handleSelect(id)
            let el = document.querySelector(`#menu-${id}`) as HTMLElement
            el.focus()
            el.scrollIntoView({behavior : 'smooth', block : "nearest"})
        }
        
    }

</script>
<svelte:window on:keydown={handleKeydown} ></svelte:window>
<Modal outside={false}  on:close={() => handleClose()} class="w-3/4 md:w-1/2 lg:w-1/2 h-[80vh] max-h-[80vh] overflow-y-hidden ">
    <form on:submit|preventDefault|capture={handleSubmit} class="h-full" use:focusTrap>
        <div class="grid grid-cols-1 grid-rows-12 h-full ">
            <div class="flex justify-between items-center">
                <h1 class="font-bold text-xl">Cari Menu</h1>
                <button class="btn" type="button" on:click={() => handleClose()}><Icon name="close" class="h-6 w-6" /></button>
            </div>
            <div class="row-span-1">
                <input on:keyup={handleSearch} bind:this={elInput} bind:value={keyword} type='text' class="form-control w-full" placeholder="masukan UPC atau Nama Menu">
            </div>
            <div class="row-span-9 overflow-y-auto">
                <table class="w-full">
                    {#each filteredMenu as menu}
                        <tr id={'menu-'+menu._id} class=" w-full {menu.selected ? 'bg-gray-300 dark:bg-gray-700' : 'bg-inherit'}" on:click={() => handleSelect(menu._id)}>
                            <td class="">{menu.name} <span class="text-gray-500 dark:text-gray-400 ">(UPC {menu.upc ? menu.upc : '-'})</span></td>
                            <td class="text-right">{formatCurrency(menu.price)}</td>
                        </tr>
                    {/each}
                </table>
            </div>
            <div class="grid grid-cols-2 items-end">
                <div class="justify-end ">
                    
                </div>
                <div class="grid justify-end">
                    <button type="submit" class="btn-primary !px-5 !py-3">Simpan</button>
                </div>
            </div>
        </div>
    </form>
</Modal>
