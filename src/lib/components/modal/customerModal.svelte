<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import Modal from "./modal.svelte";
    import Icon from '../ui/Icon.svelte'
    import TextInput from '../forms/textInput.svelte'
    import ButtonUser from '../buttons/buttonUser.svelte';
    import { focusTrap } from 'svelte-focus-trap';
    const dispatch = createEventDispatcher()

    export let customer = ""
    export let showButtonUser = true

    const handleClose = () => {
        dispatch('close', false)
    }

    const handleSubmit = () => {
        dispatch('submit',{customer})
    }

</script>

<Modal outside={false}  on:close={() => handleClose()} class="w-3/4 md:w-1/2 lg:w-1/3 ">
    <form on:submit|preventDefault={handleSubmit} use:focusTrap>
        <div class="grid grid-cols-1 grid-rows-4 ">
            <div class="flex justify-between items-center">
                <h1 class="font-bold text-xl">Pelanggan</h1>
                <button type="button" class="btn" on:click={() => handleClose()}><Icon name="close" class="h-6 w-6" /></button>
            </div>
            <div class="row-span-2">
                <TextInput isFocused={true} bind:value={customer} label="Nama Pelanggan atau Nomor Meja" />
            </div>
            <div class="grid grid-cols-2 items-end">
                <div class="justify-end ">
                    {#if showButtonUser}
                        <ButtonUser/>
                    {/if}
                </div>
                <div class="grid justify-end">
                    <button type="submit" class="btn-primary !px-5 !py-3">Simpan</button>
                </div>
            </div>
        </div>
    </form>
</Modal>
