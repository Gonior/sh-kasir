<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	// eslint-disable-next-line no-unused-vars
	import {theme} from '../store'
	import { handleSwitchTheme } from '../utils/myFunct'
	import logo from '../../assets/icons/icon.png'
	import Icon from "../components/Icon.svelte";
	export let openSetting = false
	const dispatch = createEventDispatcher()
	let isDarkMode = $theme === 'dark'
	const toogleTheme = () => {
		isDarkMode = !isDarkMode
		handleSwitchTheme(isDarkMode)
	}
</script>

<div class="flex justify-between w-full">
	<div class="flex space-x-1 items-center">
		<img src={logo} alt="logo" class="size-8">
		<h1 class="font-extrabold tracking-wider text-2xl">SH-Kasir</h1>
	</div>
	<div class="flex items-center space-x-1">
		<button on:click={toogleTheme} class="btn-secondary !p-2"><Icon class="h-6 w-6" name={isDarkMode ? "sun" : 'moon'} /></button>
		<button on:click={() => dispatch('openSetting')} class="btn-secondary !p-2"><Icon name="{openSetting ?  'close' :'cog-8-tooth'}" class="h-6 w-6"/></button>
	</div>
</div>
