<script lang="ts">

	import Modal from "./modal.svelte"
	import Icon from "@components/Icon.svelte";
	import {createEventDispatcher} from 'svelte'
	const dispatch = createEventDispatcher()

	export let title = ""
	export let confirmText = "Oke"


</script>
<Modal class="w-1/3 " outside={true} overlay={true} on:close={() => dispatch('close', false)}>
	<div class="mb-2 flex items-center justify-between">
		<h1 class="font-bold text-xl">{title}</h1>
		<button class="btn text-gray-500 dark:text-gray-400" on:click={() => dispatch('close', false)}>
			<Icon name="close" class="!h-6 !w-6" stroke={2}/>
		</button>
	</div>
	<div class="my-2">
		<slot/>
	</div>
	<div class="flex mt-4 justify-end">
		<div class="flex space-x-2">
			<button class="btn-secondary" on:click={() => dispatch('confirm', false)}>Tidak</button>
			<button class="btn-primary" on:click={() => dispatch('confirm', true)}>{confirmText}</button>
		</div>
	</div>
</Modal>
