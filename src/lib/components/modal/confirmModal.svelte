<script lang="ts">

	import Modal from "./modal.svelte"
	import Icon from "@/lib/components/ui/Icon.svelte";
	import {createEventDispatcher, onMount} from 'svelte'
	import { focusTrap } from "svelte-focus-trap"
	const dispatch = createEventDispatcher()

	export let title = ""
	export let confirmText = "Oke"
	let buttonEl : HTMLButtonElement
	onMount(() => {
		buttonEl.focus()
	})

	function handleKeydown(e : KeyboardEvent) {
		let keyCode = e.key
        if (keyCode !== 'ArrowLeft' && keyCode !== 'ArrowRight' && keyCode !== 'Escape' && keyCode !== 'Enter') return false

        const current = document.activeElement as HTMLElement
        const items =  [...document.getElementsByName('my-controller')] 
        const currentIndex = items.indexOf(current)
        let newIndex : number
        
        if (currentIndex === -1) {
            newIndex = 0
        } else {
            if (keyCode === 'ArrowLeft') {
                newIndex = (currentIndex + items.length - 1) % items.length
            } else if ((keyCode === 'ArrowRight')){
                newIndex = (currentIndex + 1) % items.length
            } else if ((keyCode === 'Escape')) {
				dispatch('close', false)
			} else if ((keyCode === 'Enter')) {
				return true
			}
        }
        
        current.blur()
		if(newIndex > -1) items[newIndex].focus()
		return false
    }

</script>
<svelte:window on:keydown={handleKeydown}/>
<Modal class="max-w-[50vw] min-w-[30vw]" outside={true} overlay={true} on:close={() => dispatch('close', false)} >
	<div class="mb-2 flex items-center justify-between">
		<h1 class="font-bold text-xl">{title}</h1>
		<button class="btn text-gray-500 dark:text-gray-400" on:click={() => dispatch('close', false)}>
			<Icon name="close" class="!h-6 !w-6" stroke={2}/>
		</button>
	</div>
	<div class="my-2">
		<slot/>
	</div>
	<div class="flex mt-4 justify-end" use:focusTrap >
		<div class="flex space-x-2">
			<button name="my-controller" class="btn-secondary" on:click={() => dispatch('confirm', false)}>Tidak</button>
			<button name="my-controller" class="btn-primary" bind:this={buttonEl} on:click={() => dispatch('confirm', true)}>{confirmText}</button>
		</div>
	</div>	
</Modal>

