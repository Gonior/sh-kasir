<script lang="ts">
	import LayoutA2 from "../components/layoutA2.svelte"
    import LayoutA1 from "../components/layoutA1.svelte";
	import type { IModel } from "@/lib/types"

    export let items : IModel.IItem[] = []
    export let listMenu : IModel.IMenu[] = []
    export let addedId : string
    export let invoice : string
    export let customer : string
    export let handleClear : () => void
    export let selectedMenu : IModel.IItem
    export let resetSelect : () => void
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
    export let downpayment : number = 0
    export let discount : IModel.IDiscount = {
		percentage: 0,
		value: 0
	}

    let inputElement : HTMLInputElement
    // eslint-disable-next-line no-unused-vars
    export let handleAddMenu : (_params : IModel.IMenu, qty : number) => void
    // eslint-disable-next-line no-unused-vars
    export let handleAddNote : (params : {name : string}) => void
    
</script>

<!-- informasi bill -->
<LayoutA1 
    {downpayment} 
    {taxInfo} 
    {storeInfo} 
    {discount} 
    {handleClear} 
    on:focus={() => inputElement.focus()} 
    {items} 
    {invoice} 
    bind:customer={customer} />
<!-- pesanan -->
<LayoutA2 
    {handleAddNote}
    {invoice}
    {resetSelect} 
    bind:selectedMenu={selectedMenu} 
    {handleAddMenu} 
    bind:inputElement={inputElement} 
    {addedId} 
    bind:items={items} 
    {listMenu} />


