<script lang="ts">
    import { tweened } from 'svelte/motion'
    import { createEventDispatcher } from 'svelte'
    import { quadInOut } from 'svelte/easing'
    import { formatCurrency } from '@lib/utils'
    import ConfirmModal from '@components/modal/confirmModal.svelte'
	import type { IModel } from '@lib/types'
    import Icon from '@components/ui/Icon.svelte';
    import CustomerModal from '@components/modal/customerModal.svelte'
	import PaymentModal from '@/lib/components/modal/paymentModal.svelte'
    
    export let _id : string
    export let invoice : string
    export let customer : string
    export let downpayment : number
    export let status : string
    export let discount : IModel.IDiscount = {
        percentage: 0,
		value: 0
	}
    export let items : IModel.IItem[] = []
    export let handleClearWorkspace : () => void
    
    const dispatch = createEventDispatcher()

    let openConfirmModal = false
    let openFormCustomer = false
    let openConfirmModalBlankCustomer = false
    let openModalPayment = true
    
    let tSubtotal = tweened(0,{duration : 300, easing : quadInOut})
    $ : tSubtotal.set(items.filter((order) => !order.forId).reduce<number>((acc, val) => acc + val.total, 0) )
    
    const handleConfirmClearWorkspace = (e : CustomEvent<boolean>) => {
        if(e.detail) {
            handleClearWorkspace()
            
        }
        dispatch('focus') 
        openConfirmModal = false 
    }

    const handleConfirmPay = (e : CustomEvent<boolean>) =>  {
        openConfirmModalBlankCustomer = false
        if( e.detail ) {
            handlePay(true)
        } else {
            dispatch('focus')
        }
    }

    

    const handleSumbit = (e :CustomEvent<{customer : string}>) => {
        customer = e.detail.customer
        dispatch('focus')
        openFormCustomer = false
    }

    const handlePay = (forceNext : boolean = false) => {
        if ( forceNext || !!customer) {
            openModalPayment = true
            console.log()
        } else {
            openConfirmModalBlankCustomer = true
        }
    }
</script>
{#if openConfirmModal}
    <ConfirmModal title={"Konfirmasi Hapus Semua Pesanan"} confirmText={"Ya, Hapus"} on:close={(e) => openConfirmModal = e.detail} on:confirm={handleConfirmClearWorkspace}>
		<p>Apakah anda yakin akan menghapus <span class="font-bold uppercase">semua</span> pesanan?</p>
	</ConfirmModal>
{/if}
{#if openConfirmModalBlankCustomer}
    <ConfirmModal title={"Konfirmasi Pelanggan"} confirmText={"Ya,Lanjutkan"} on:close={(e) => openConfirmModalBlankCustomer = e.detail} on:confirm={handleConfirmPay}>
        <p>Informasi Pelanggan belum diisi, apakah anda yakin akan melanjutkan?</p>
	</ConfirmModal>
{/if}
{#if openFormCustomer}
    <CustomerModal {customer} on:close={() => openFormCustomer = false} on:submit={handleSumbit} />
{/if}
{#if openModalPayment}
    <PaymentModal {...{_id,status,  items, customer, subtotal : $tSubtotal, downpayment, discount}} on:close={() => openModalPayment = false} />
{/if}

<div class="row-span-2 grid grid-cols-1 border border-gray-200 dark:border-gray-700 rounded-lg p-2 ">
    <div class="grid grid-cols-2 items-start gap-3">
        <div class="grid grid-rows-2">
            <span class="font-bold">Pelanggan</span>
            <span class="text-sm text-gray-400 truncate">invoice {invoice ? invoice : '-'}</span>
        </div>
        <div class="grid justify-end">
            <button class="btn-secondary truncate max-w-full " on:click={() => openFormCustomer = true}>
                {#if customer}
                    <div class="flex space-x-1 items-center">
                        <Icon name="edit" stroke={1.5} class="flex-shrink-0 h-5 w-5 text-gray-400" />
                        <span class="truncate">{customer}</span>
                    </div>
                {:else}
                    <div class="flex space-x-1 items-center text-gray-700 dark:text-gray-300">
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
            <button disabled={items.length === 0 && !customer && !invoice} on:click={() => openConfirmModal = true} class="btn-secondary disabled:!bg-opacity-50 disabled:!text-opacity-50  !bg-red-600 !text-white !p-2">
                <Icon name="eraser" class="h-6 w-6" />
            </button>
            <button disabled={items.length === 0} on:click={() => handlePay()}  class="btn-primary !p-2">
                <Icon name="wallet" class="h-6 w-6" />
            </button>
        </div>
    </div>
</div>