<script lang="ts">
	import { onDestroy, onMount } from "svelte"

	
	export let elInput : HTMLInputElement = null
	export let errorMsg = ""
	export let label = ""
	export let value : string | number
	export let isFocused : boolean = false
	export let typeInput : "text" | 'password' | 'number' = 'text'
	export let placeholder = "Text input"
	export let textAlign : '!text-center' | '!text-left' | '!text-right' = "!text-left"
	export let readonly : boolean = false
	export let min = -9999999999
	export let max = 9999999999
	
	onMount(() => {
		if (isFocused) {
			elInput?.focus()
			elInput?.select()
		}
	})

	onDestroy(()=> {
		elInput?.blur()
	})

	
</script>

<div class={`${$$props.class}`}>
	{#if label}
	<p class="mb-1">{label}</p>
	{/if}
	{#if typeInput === 'text'}
		<input {readonly} bind:this={elInput} bind:value={value} type='text' class="form-control w-full  {textAlign}" placeholder={placeholder}>
	{:else if typeInput === 'number'}
		<input {readonly} bind:this={elInput} bind:value={value} type='number' step="0.5" {min} {max} class="form-control w-full {textAlign}" placeholder={placeholder}>
	{:else}
		<input {readonly} bind:this={elInput} bind:value={value} type='password' class="form-control w-full {textAlign}" placeholder={placeholder}>
	{/if}
	{#if errorMsg}
		<p class="text-red-500 text-sm">{errorMsg}</p>
	{/if}
</div>

