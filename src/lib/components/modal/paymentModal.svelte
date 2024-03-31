<script lang="ts">

	import { onMount } from 'svelte'
	import Modal from "./modal.svelte";
	import Icon from '@components/ui/Icon.svelte'
	import { createEventDispatcher } from 'svelte'
	import type { IModel } from '@lib/types'
	
	// import { focusTrap } from 'svelte-focus-trap'

    // export let _id
    export let _id : string 
    export let status : string
    export let items : IModel.IItem[]
    export let customer : string
    export let subtotal : number
    export let downpayment : number
    export let discount : IModel.IDiscount = {
        percentage : 0,
        value : 0
    }
	const dispatch = createEventDispatcher()
	let inputEl : HTMLInputElement
	onMount( async () => {
        inputEl.focus()
        console.log({_id,status,  items, customer, subtotal, downpayment, discount})
	})

	
</script>

<Modal class="w-1/3 h-[80vh] flex flex-col space-y-2" outside={false}>
	<div class="flex items-center justify-between">
		<h1 class=" font-bold text-lg">Pembayaran</h1>
		<button on:click={() => dispatch('close', false)} class="btn-ghost text-gray-500 dark:text-gray-300">
			<Icon name="close" class="h-6 w-6" ></Icon>
		</button>
	</div>
    <input type="text" inputmode="numeric" class="form-control" bind:this={inputEl} >
	
</Modal>

