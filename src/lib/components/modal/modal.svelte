<script lang="ts">
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte'
	import { clickOutside, portal } from '../../utils/index'
	// import { focusTrap } from 'svelte-focus-trap'
	const dispatch = createEventDispatcher()
	export let outside = true
	export let overlay = true
</script>


<div use:portal class="fixed inset-0 flex flex-col justify-center items-center z-10  { overlay ? 'bg-gray-600  bg-opacity-20' : '' }">
	<div
		use:clickOutside
		on:click_outside={() => outside ? dispatch('close', false) : ''}
		in:fly={{ duration: 200, y: 100 }}
		out:fly={{ duration: 200, y: 100 }}
		
		class={`bg-gray-50 shadow dark:bg-gray-800 rounded-lg p-4 mx-auto max-h-[90vh] overflow-y-auto ${$$props.class}`}>
		<slot />
	</div>
</div>
