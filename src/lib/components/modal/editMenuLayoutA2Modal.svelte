<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte'
    import { focusTrap } from 'svelte-focus-trap';
    import Modal from "./modal.svelte";
    import Icon from '../ui/Icon.svelte'
	import type { IModel } from '@lib/types'
	import { formatCurrency } from '@lib/utils'
    import TextInput from '../forms/textInput.svelte'
    const dispatch = createEventDispatcher()

	export let _id  : string = ''
    export let qty : number= 0
	export let name : string = ''
	export let price : number = 0
    export let printed : boolean = false
	export let forId : string = null
    let isLoaded = false

    $: total = price * qty
    let isFocusedText : boolean = false
    let isFocusedNum : boolean = false

    const handleClose = () => {
        dispatch('close', false)
    }

    onMount(() => {
        if(!forId) {
            isFocusedNum = true
            isFocusedText = false
        } else {
            isFocusedNum = false
            isFocusedText = true
        }
        isLoaded = true

    })

    const handleSubmit = () => {
        let item  : IModel.IItem = {
			_id,
			name,
			printed
		}
        if (forId) {
            item.forId = forId
        } else {
            item.price = price
            item.qty = qty
            item.total = total
        }
        dispatch('submit',item)
    }

    const handleIncreaseDecrease = (args : 'add' | 'min') => {
		switch (args) {
			case 'add':
				qty = qty + 1
				break
			case 'min':
				if (qty > 0) qty = qty - 1
				break
		}
	}

</script>

<Modal outside={false}  on:close={() => handleClose()} class="w-3/4 md:w-1/2 lg:w-1/3 max-h-[50vh]">
    {#if isLoaded}
        <form on:submit|preventDefault={handleSubmit} use:focusTrap class="h-full">
            <div class="grid grid-cols-1 grid-rows-7 h-full">
                <div class="flex justify-between items-center">
                    <h1 class="font-bold text-xl">Ubah Menu</h1>
                    <button type="button" class="btn" on:click={() => handleClose()}><Icon name="close" class="h-6 w-6" /></button>
                </div>
                <div class="row-span-5 gap-2 items-end">
                    <TextInput typeInput="text" isFocused={isFocusedText} bind:value={name} label="Nama Menu" placeholder="Nama Menu"/>
                    <div class="grid grid-cols-2 items-end gap-2 ">
                        <TextInput bind:value={price} readonly={!!forId} label="Harga Satuan"/>
                        <div class="grid grid-cols-12 gap-1 items-end">
                            <button type="button" disabled={!!forId} class="btn-secondary !p-2.5 col-span-3" on:click={() => handleIncreaseDecrease('min')}>
                                <Icon name="minus" stroke={3} class="h-6 w-6"  />
                            </button>
                            <div class="col-span-6">
                                <TextInput readonly={!!forId} typeInput="number" textAlign="!text-center" isFocused={isFocusedNum} bind:value={qty} label="Kuantitas" placeholder="KTS"/>
                            </div>
                            <button type="button" disabled={!!forId} class="btn-secondary !p-2.5 col-span-3" on:click={() => handleIncreaseDecrease('add')}>
                                <Icon name="plus" stroke={3} class="h-6 w-6"  />
                            </button>
                        </div>
                    </div>
                    <TextInput value={formatCurrency(total)} readonly={true} label="Total"/>
                </div>
                <div class="grid justify-end ">
                    <button type="submit" class="btn-primary !px-5 !py-3 w-max">Simpan</button>
                </div>
            </div>
        </form>
    {/if}
</Modal>
