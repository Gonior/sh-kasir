<script>

	import {createEventDispatcher} from 'svelte'
	const dispatch = createEventDispatcher()
	import Icon from "../Icon.svelte";
	export let title = ""
</script>

<div class="mb-2 flex items-center justify-between">
	<h1 class="font-bold text-xl">{title}</h1>
	<button type="button" class="btn text-gray-500 dark:text-gray-400" on:click={() => dispatch('close', false)}>
		<Icon name="close" class="!h-6 !w-6" stroke={2}/>
	</button>
</div>
