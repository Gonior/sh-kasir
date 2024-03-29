<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import Modal from "./modal.svelte";
    import Icon from '../ui/Icon.svelte'
    import TextInput from '../forms/textInput.svelte'
    import { focusTrap } from 'svelte-focus-trap';

    const dispatch = createEventDispatcher()

    let noteName = ""
    const handleClose = () => {
        dispatch('close', false)
    }

    const handleSubmit = () => {
        dispatch('submit',{name : noteName})
    }

</script>

<Modal outside={false}  on:close={() => handleClose()} class="w-3/4 md:w-1/2 lg:w-1/3 ">
    <form on:submit|preventDefault={handleSubmit} use:focusTrap>
        <div class="grid grid-cols-1 grid-rows-4 ">
            <div class="flex justify-between items-center">
                <h1 class="font-bold text-xl">Custom Detail Menu</h1>
                <button type="button" class="btn" on:click={() => handleClose()}><Icon name="close" class="h-6 w-6" /></button>
            </div>
            <div class="row-span-2">
                <TextInput isFocused={true} bind:value={noteName} placeholder="Cth. Jangan Kering" />
            </div>
            <div class="grid justify-end ">
                <button type="submit" class="btn-primary !px-5 !py-3 w-max">Simpan</button>
            </div>
        </div>
    </form>
</Modal>
