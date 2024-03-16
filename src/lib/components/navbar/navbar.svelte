<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	// eslint-disable-next-line no-unused-vars
	import {theme, user} from '@store/index'
	import { handleSwitchTheme } from '@lib/utils/myFunct'
	import logo from '@assets/icons/icon.png'
	import Icon from "@components/Icon.svelte";

	import Powerbutton from '@components/buttons/powerbutton.svelte';
	export let openSetting = false
	export let direction = "horizontal"
	const dispatch = createEventDispatcher()
	let isDarkMode = $theme === 'dark'

	const toogleTheme = () => {
		isDarkMode = !isDarkMode
		handleSwitchTheme(isDarkMode)

	}
</script>


<div class="flex {direction === 'vertical' ? 'flex-col h-full p-4 bg-gray-100 dark:bg-gray-600' : 'flex-row w-full' } justify-between items-center">
	<div class="flex space-x-1 items-center">
		<img src={logo} alt="logo" class="h-10 w-10">
		{#if direction === "horizontal"}
			<h1 class="font-extrabold tracking-wider text-2xl">SH-Kasir</h1>
		{/if}
	</div>

	<div class="flex {direction === 'vertical' ? 'flex-col space-y-4' : 'items-center space-x-1'}">
		<slot />
	</div>
	<div class="flex {direction === 'vertical' ? 'flex-col space-y-2' : 'items-center flex-row-reverse space-x-1 space-x-reverse' }">
		<button on:click={() => dispatch('openSetting')} class="btn-secondary !p-2 {openSetting ? '!bg-amber-600 !text-white' : ''}">
			<Icon name="{openSetting && direction === "horizontal" ?  'close' :'cog-8-tooth'}" class="h-6 w-6"/>
		</button>
		<button on:click={toogleTheme} class="btn-secondary !p-2"><Icon class="h-6 w-6" name={isDarkMode ? "sun" : 'moon'} /></button>
		{#if typeof $user === "object" &&  Object.keys($user).length > 0 && Object.hasOwn($user,'passcode')}
			<Powerbutton />
		{/if}
	</div>
</div>
