<script lang="ts">
	import { fly } from 'svelte/transition';
	import { clickOutside, portal } from '../utils/index'
	export let show: boolean = false;
</script>

{#if show}
	<div use:portal class="fixed inset-0 flex flex-col justify-end items-center bg-gray-600  bg-opacity-20">
		<div
			use:clickOutside
			on:click_outside={() => (show = !show)}
			in:fly={{ duration: 200, y: 100 }}
			out:fly={{ duration: 200, y: 100 }}
			class="bg-gray-50 shadow dark:bg-gray-800 rounded-t-2xl p-6 mx-auto w-full max-h-[60vh] overflow-y-auto"
		>
			<slot />
		</div>
	</div>
{/if}
