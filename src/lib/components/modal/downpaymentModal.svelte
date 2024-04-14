
<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte'
    import Modal from "./modal.svelte";
	import Icon from '@components/ui/Icon.svelte'
    import TextInput from '../forms/textInput.svelte'
	import { focusTrap } from 'svelte-focus-trap'

    const dispatch = createEventDispatcher()
    export let downpayment : number
    let inputEl : HTMLInputElement
    onMount(() => {
        // inputEl.focus() 
        // inputEl.select()
    })
    
    const handleSubmit = () => {
        dispatch('submit', downpayment)
        dispatch('close', false)
    }

</script>
<Modal class='w-1/3' outside={false}>
    <form on:submit|preventDefault={handleSubmit} on:reset|preventDefault={() => downpayment = 0} use:focusTrap>
        <div class="flex items-center justify-between col-span-2 row-span-1 mb-3">
            <h1 class=" font-bold text-lg">Uang Muka</h1>
            <button on:click={() => dispatch('close', false)} class="btn-ghost text-gray-500 dark:text-gray-300">
                <Icon name="close" class="h-6 w-6" ></Icon>
            </button>
        </div>
        <TextInput label="Nominal" typeInput="number" bind:value={downpayment} elInput={inputEl} isFocused={true} />
        <div class="mt-3 w-full flex items-center justify-between">
            <button type="reset" class="btn">Reset</button>
            <button type="submit" class="btn-primary">Tambahkan</button>
        </div>
    </form>
    
</Modal>