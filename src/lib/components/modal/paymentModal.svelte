<script lang="ts">

	import { onMount } from 'svelte'
	import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'
	import Modal from "./modal.svelte";
	import Icon from '@components/ui/Icon.svelte'
	import Toggle from '../forms/toggle.svelte';
	import { createEventDispatcher } from 'svelte'
	import type { IModel } from '@lib/types'
	import { formatCurrency, isValidObject } from '@lib/utils'
	// eslint-disable-next-line no-unused-vars
	import { taxInfo, storeInfo } from '@lib/store'
	// import TextInput from '../forms/textInput.svelte'
	import DownpaymentModal from './downpaymentModal.svelte'
	import DiscountModal from './discountModal.svelte'
	
	// import { focusTrap } from 'svelte-focus-trap'

    // export let _id
    export let _id : string 
    export let status : string
    export let items : IModel.IItem[]
    export let customer : string
    export let subtotal : number
    export let downpayment : number = 0
    export let discount : IModel.IDiscount = {
        percentage : 0,
        value : 0
    }
	const dispatch = createEventDispatcher()
	let grandtotal = 0
	let grandtotalTweend = tweened(grandtotal, {duration : 400, easing : cubicOut})
	let inputEl : HTMLInputElement
	let cash = 0
	let cashless = 0
	let change = 0
	let isValid : boolean = false
	let openModalDownpayment : boolean = false
	let openModalDiscount : boolean = false
	let useTax = $taxInfo.checked

	$: tax = useTax ? Math.ceil(((subtotal - discount.value) * $taxInfo.value) / 100) : 0
	$: grandtotal = subtotal - discount.value + tax - downpayment
	$: isValid = cash + cashless >= grandtotal
	$: change = cash - (grandtotal-cashless) >= 0 ? cash - (grandtotal-cashless) : 0
	$: grandtotalTweend.set(grandtotal)

	onMount( async () => {
        focusAndSelect()
	})

	const focusAndSelect = () => {
		inputEl.focus()
		inputEl.select()
	}
	const handlePay = () => {
		console.log({_id, status,  items, customer, subtotal, downpayment, discount, grandtotal, tax, taxInfo : $taxInfo, storeInfo : $storeInfo, cash, cashless, change})
	}

	
</script>


{#if openModalDownpayment}
	<DownpaymentModal {downpayment} on:close={e => openModalDownpayment = e.detail} on:submit={e => {downpayment = e.detail;focusAndSelect()}} />
{/if}

{#if openModalDiscount}
	<DiscountModal {...discount} on:close={e => openModalDiscount = e.detail} />
{/if}

<Modal class="w-2/3 h-[65vh] grid grid-cols-2 grid-rows-12 gap-2" outside={false}>
	<div class="flex items-center justify-between col-span-2 row-span-1 ">
		<h1 class=" font-bold text-lg">Pembayaran</h1>
		<button on:click={() => dispatch('close', false)} class="btn-ghost text-gray-500 dark:text-gray-300">
			<Icon name="close" class="h-6 w-6" ></Icon>
		</button>
	</div>
	<div class="row-span-9 flex flex-col">
		<div class="flex h-1/3 flex-col items-center justify-start">
			<p>Pelunasan</p>
			<h1 class="text-6xl font-bold text-amber-600">{formatCurrency(Math.trunc($grandtotalTweend))}</h1>
			
		</div>
		<div class="flex items-center justify-between h-10">
			<span>Pelanggan</span>
			<span class="text-amber-600 font-bold">{customer ? customer : '-'}</span>
		</div>
		<div class="flex items-center justify-between h-10">
			<span>Subtotal</span>
			<span>{formatCurrency(subtotal)}</span>
		</div>
		<div class="flex items-center justify-between h-10">
			<span>Diskon {!discount.percentage ? '' : `(${discount.percentage}%)`}</span>
			{#if !discount.value}
			<button class="btn-secondary" on:click={() => openModalDiscount = true}><Icon name="plus"/></button>
			{:else}
			<div class="flex items-center space-x-1">
				<button class="btn-secondary"><Icon name="edit"/></button>
				<span class="text-red-500 font-semibold">- {formatCurrency(discount.value)}</span>
			</div>
			{/if}
		</div>
		{#if $taxInfo && isValidObject($taxInfo) && $taxInfo.checked}
			<div class="flex items-center justify-between h-10">
				<div class="flex items-center space-x-2">
					<span> {$taxInfo.name} ({$taxInfo.value}%)</span>
					<Toggle bind:checked={useTax} />
				</div>
				<span>{formatCurrency(tax)}</span>
			</div>
		{/if}
		<div class="flex items-center justify-between h-10">
			<span>Uang Muka </span>
			{#if !downpayment}
			<button class="btn-secondary" on:click={() => openModalDownpayment = true}><Icon name="plus"/></button>
			{:else}
			<div class="flex items-center space-x-1">
				<button class="btn-secondary" on:click={() => openModalDownpayment = true}	><Icon name="edit"/></button>
				<span class="text-red-500 font-semibold">- {formatCurrency(downpayment)}</span>
			</div>

			{/if}
		</div>
	</div>
	<div class="row-span-9 ">
		<div class="space-y-2">
			<div class="flex flex-col">
				<label for="cash">Nominal</label>
				<input type="number" id="cash" bind:value={cash} class="form-control w-full" bind:this={inputEl}>
			</div>
			<div class="flex flex-col">
				<label for="change">Kembalian</label>
				<input type="text" id="change" readonly value={formatCurrency(change)} class="form-control w-full" >
			</div>
		</div>
		
		
	</div>
	<div class="row-span-2 col-span-2 ">
		<button disabled={!isValid} class='btn-primary' on:click={() => handlePay()}>Bayar</button>
	</div>
	
	
</Modal>

