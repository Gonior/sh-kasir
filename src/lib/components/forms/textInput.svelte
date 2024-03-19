<script lang="ts">
	import { onMount } from "svelte"

	let elInput : HTMLInputElement
	export let errorMsg = ""
	export let label = ""
	export let value : string | number
	export let isFocused : boolean = false
	export let typeInput : "text" | 'password' | 'number' = 'text'

	onMount(() => {
		if (isFocused) elInput.focus()
	})
</script>

<div class={`${$$props.class}`}>
	<p>{label}</p>
	{#if typeInput === 'text'}
		<input bind:this={elInput} bind:value={value} type='text' class="form-control w-full">
	{:else if typeInput === 'number'}
		<input bind:this={elInput} bind:value={value} type='number' class="form-control w-full">
	{:else}
		<input bind:this={elInput} bind:value={value} type='password' class="form-control w-full">
	{/if}
	{#if errorMsg}
		<p class="text-red-500 text-sm">{errorMsg}</p>
	{/if}
</div>

