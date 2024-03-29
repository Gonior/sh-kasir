<script lang="ts">
	import { onDestroy, onMount } from "svelte"

	let elInput : HTMLInputElement

	export let errorMsg = ""
	export let label = ""
	export let value : string | number
	export let isFocused : boolean = false
	export let typeInput : "text" | 'password' | 'number' = 'text'
	export let placeholder = "Text input"
	
	onMount(() => {
		if (isFocused) {
			elInput.focus()
			elInput.select()
		}
	})

	onDestroy(()=> {
		elInput.blur()
	})

	
</script>

<div class={`${$$props.class}`}>
	{#if label}
	<p class="mb-1">{label}</p>
	{/if}
	{#if typeInput === 'text'}
		<input bind:this={elInput} bind:value={value} type='text' class="form-control w-full" placeholder={placeholder}>
	{:else if typeInput === 'number'}
		<input bind:this={elInput} bind:value={value} type='number' class="form-control w-full" placeholder={placeholder}>
	{:else}
		<input bind:this={elInput} bind:value={value} type='password' class="form-control w-full" placeholder={placeholder}>
	{/if}
	{#if errorMsg}
		<p class="text-red-500 text-sm">{errorMsg}</p>
	{/if}
</div>

