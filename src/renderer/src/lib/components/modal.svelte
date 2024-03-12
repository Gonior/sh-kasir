<script lang="ts">
	import { fly } from 'svelte/transition';
	import { clickOutside, portal } from '../utils/index'
	export let show: boolean = false;
	export let outside = true
	export let overlay = true
</script>

{#if show}
	<div use:portal class="fixed inset-0 flex flex-col justify-center items-center { overlay ? 'bg-gray-600  bg-opacity-20' : '' }">
		<div
			use:clickOutside
			on:click_outside={() => outside ? show = !show : ''}
			in:fly={{ duration: 200, y: 100 }}
			out:fly={{ duration: 200, y: 100 }}
			class={`bg-gray-50 shadow dark:bg-gray-800 rounded-lg p-4 mx-auto max-h-[60vh] overflow-y-auto ${$$props.class}`}>
			<slot />
		</div>
	</div>
{/if}
