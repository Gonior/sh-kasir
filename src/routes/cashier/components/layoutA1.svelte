<script lang="ts">
    import { tweened } from 'svelte/motion'
    import { createEventDispatcher } from 'svelte'
    import { quadInOut } from 'svelte/easing'
    import { formatCurrency } from '@lib/utils'
    import ConfirmModal from '@components/modal/confirmModal.svelte'
	import type { IModel } from '@lib/types'
    import Icon from '@components/ui/Icon.svelte';
    import CustomerModal from '@components/modal/customerModal.svelte'
    
    export let items : IModel.IItem[] = []
    export let invoice : string
    export let customer = ""
    export let handleClear : () => void
    
    const dispatch = createEventDispatcher()

    let openConfirmModal = false
    let openFormCustomer = false
    let tSubtotal = tweened(0,{duration : 300, easing : quadInOut})
    $ : tSubtotal.set(items.filter((order) => !order.forId).reduce<number>((acc, val) => acc + val.total, 0) )
    
    const handleConfirm = () => {
        handleClear()
        dispatch('focus')
        openConfirmModal = false
    }

    const handleSumbit = (e :CustomEvent<{customer : string}>) => {
        customer = e.detail.customer
        dispatch('focus')
        openFormCustomer = false
    }

    const handlePay = () => {
        console.log({items, customer, subtotal : $tSubtotal})
    }
</script>
{#if openConfirmModal}
	<ConfirmModal title={"Konfirmasi Hapus Semua Pesanan"} confirmText={"Ya, Hapus"} on:close={(e) => openConfirmModal = e.detail} on:confirm={handleConfirm}>
		<p>Apakah anda yakin akan menghapus <span class="font-bold uppercase">semua</span> pesanan?</p>
	</ConfirmModal>
{/if}
{#if openFormCustomer}
    <CustomerModal {customer} on:close={() => openFormCustomer = false} on:submit={handleSumbit} />
{/if}

<div class="row-span-2 grid grid-cols-1 border border-gray-200 dark:border-gray-700 rounded-lg p-2 ">
    <div class="grid grid-cols-2 items-start">
        <div class="grid grid-rows-2">
            <span class="font-bold">Pelanggan</span>
            <span class="text-sm text-gray-400">invoice {invoice ? invoice : '-'}</span>
        </div>
        <div class="grid justify-end">
            <button class="btn-secondary truncate max-w-max " on:click={() => openFormCustomer = true}>
                {#if customer}
                    <span>{customer}</span>
                {:else}
                    <div class="flex space-x-1 items-center">
                        <Icon name="plus" stroke={3} class="h-6 w-6" />
                        <span class="">Pelanggan</span>
                    </div>
                {/if}
            </button>
        </div>
    </div>
    <div class="grid grid-cols-2">
        <div class="">
            <span class="font-bold">Subtotal</span>
            <h1 class="text-2xl  font-extrabold text-amber-600">{formatCurrency(Math.trunc($tSubtotal))}</h1>
        </div>
        <div class="flex flex-0 items-center justify-end space-x-2">
            <button disabled={items.length === 0 && !customer} on:click={() => openConfirmModal = true} class="btn-secondary disabled:!bg-opacity-50 disabled:!text-opacity-50 !ring-0 !bg-red-600 !text-white !p-2">
                <Icon name="eraser" class="h-6 w-6" />
            </button>
            <button disabled={items.length === 0} on:click={() => handlePay()}  class="btn-primary !p-2">
                <Icon name="wallet" class="h-6 w-6" />
            </button>
        </div>
    </div>
</div>