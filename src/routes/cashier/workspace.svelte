<script lang="ts">
	import { IModel} from "@/lib/types"
	import { onMount } from "svelte"
    import { v4 as uuidv4 } from 'uuid';
    import LayoutA from "./components/layoutA.svelte";
    import LayoutB from "./components/layoutB.svelte";
    import LayoutC from "./components/layoutC.svelte";
	import Errorstate from "@components/state/errorstate.svelte"
	import Loading from "@components/state/loading.svelte"
    
    export let taxInfo : IModel.ITax = {
		 checked: false,
         name : '',
         value : 0
	}
    export let storeInfo : IModel.IStoreInfo = {
		 name: "",
		 address: "",
		 phone: "",
		 footerNote: ""
	}

    let downpayment : number = 0
    let discount : IModel.IDiscount = {
		percentage: 0,
		value: 0
	}

    let isLoading = true
    let isValid = false
    let listMenu : IModel.IMenu[] = []
    let addedId : string = ""
    let items : IModel.IItem[] = []
    let customer : string = ''
    let invoice : string = "#20241123916712"
    let selectedMenu : IModel.IItem
    
    
    export let _id = ''
    
    onMount(async() => {
        if(_id) console.log('edit mode')
    })
    

    const handleClear = () => {
        customer = ""
        invoice = ""
        items = []
    }

    const resetSelect = () => {
        items = [...items.map(item => {
            item.selected = false
            return item
        })]
    }

    const handleAddMenu = (params : IModel.IMenu, qty? : number) => {
        let myItem : IModel.IItem= {...params, qty : qty ?? 1, total : 0, printed : false}
        myItem.total = myItem.price * myItem.qty
        
        let findOrder = items.find((o) => o._id === myItem._id)
        if( findOrder) {
            findOrder.qty += qty ?? 1
            findOrder.total = findOrder.qty * findOrder.price
            items = [...items]
            addedId = findOrder._id
        }
        else {
            items = [...items, myItem]
            addedId = myItem._id
        }
        
        resetSelect()
    }

    const handleAddNote = (params : {name : string} ) => {
        let myNote : IModel.IItem = {
            _id : uuidv4(),
            name : params.name,
            printed : false,
        }

        if(selectedMenu && !selectedMenu.forId) {
            myNote.forId = selectedMenu._id
            let index = items.indexOf(selectedMenu)
		    let addIndex = items.filter((i) => i.forId === myNote.forId).length + 1
		    items.splice(index + addIndex, 0, myNote)
        } else {
            let filteredItems = [...items.filter(item => !item.forId)]
            myNote.forId = filteredItems[filteredItems.length-1]._id
            items = [...items, myNote]
        }
        items = [...items]
        addedId = myNote._id
    }

    

    const handleLoaded = ( e : CustomEvent<{isSuccess : boolean, data : IModel.IMenu[]}>) => {
        
        if(e.detail.isSuccess && e.detail.data) {
            listMenu = [...e.detail.data]
            isValid = true
        }
        isLoading = false

    }
</script>
<div class="grid grid-cols-2 h-full gap-2 p-2">
    <div class="overflow-hidden grid grid-cols-1 grid-rows-12 gap-2">
        {#if isLoading}
            <div class="row-span-12">
                <Loading/>
            </div>
        {:else if isValid}
            <LayoutA 
                bind:customer={customer}
                bind:items={items} 
                bind:selectedMenu={selectedMenu}
                {invoice}
                {resetSelect}
                {handleAddMenu}
                {handleClear}
                {handleAddNote}
                {addedId}
                {listMenu}
                {discount}
                {taxInfo}
                {downpayment}
                {storeInfo}
                />
        {:else}
            <div class="row-span-12">
                <Errorstate msg={"..."}/>
            </div>
        {/if}
    </div>
    <div class="rounded-lg grid grid-rows-6 gap-2">
        <div class="border border-gray-200 dark:border-gray-700 row-span-4 rounded-lg p-2">
            <LayoutB {handleAddMenu} on:loaded={handleLoaded} />
        </div>
        <div class="border border-gray-200 dark:border-gray-700 row-span-2 rounded-lg">
            <LayoutC {selectedMenu} {handleAddNote} {items} />
        </div>
    </div>
</div>