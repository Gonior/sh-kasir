<script lang="ts">
	import LayoutA2 from "./layoutA2.svelte"
    import LayoutA1 from "./layoutA1.svelte";
	import type { IModel } from "@/lib/types"

    export let items : IModel.IItem[] = []
    export let listMenu : IModel.IMenu[] = []
    export let addedId : string
    export let invoice : string
    export let customer : string
    export let handleClear : () => void
    export let selectedMenu : IModel.IItem
    export let resetSelect : () => void
    let inputElement : HTMLInputElement
    // eslint-disable-next-line no-unused-vars
    export let handleAddMenu : (_params : IModel.IMenu, qty : number) => void
    // eslint-disable-next-line no-unused-vars
    export let handleAddNote : (params : {name : string}) => void
    
</script>

<!-- informasi bill -->
<LayoutA1 {handleClear} on:focus={() => inputElement.focus()} {items} {invoice} bind:customer={customer} />
<!-- pesanan -->
<LayoutA2 {handleAddNote} {resetSelect} bind:selectedMenu={selectedMenu} {handleAddMenu} bind:inputElement={inputElement} {addedId} bind:items={items} {listMenu} />


