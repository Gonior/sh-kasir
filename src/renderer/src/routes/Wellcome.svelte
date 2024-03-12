<script lang="ts">
	import Icon from "../lib/components/Icon.svelte";
	import logo from '../assets/icons/icon.png'
	import nedbLogo from '../assets/icons/nedb.png'
	import nodeJsLogo from '../assets/icons/nodejs-original.svg'
	import svelteLogo from '../assets/icons/svelte-icon.svg'
	import typescriptLogo from '../assets/icons/typescript-plain.svg'
	import tailwindLogo from '../assets/icons/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg'
	import ModalSwitchUser from '../lib/components/modalSwitchUser.svelte'
	import { handleSwitchTheme } from '../lib/utils/myFunct'
	import { theme } from '../lib/store'
	import { onMount } from "svelte"
	// import type { IconName } from "../lib/types/Icon"
	let isDarkMode = $theme === 'dark'
	let openModalSwithUser = false
	onMount(() => {
		if (isDarkMode) theme.set('dark')
		else theme.set('light')
		handleSwitchTheme($theme)
	})
	const toogleTheme = () => {
		isDarkMode = !isDarkMode
		if (isDarkMode) theme.set('dark')
		else theme.set('light')
		handleSwitchTheme($theme)
	}
</script>

<ModalSwitchUser show={openModalSwithUser} on:close={(e) => openModalSwithUser = e.detail} />
<section class="py-6 flex flex-col px-4 lg:px-0 max-w-screen-lg items-center mx-auto h-full">
	<div class="flex justify-between w-full">
		<div class="flex space-x-1 items-center">
			<img src={logo} alt="logo" class="size-8">
			<h1 class="font-extrabold tracking-wider text-2xl">SH-Kasir</h1>
		</div>
		<div class="flex items-center">
			<button on:click={toogleTheme} class="btn text-gray-500"><Icon class="h-6 w-6" name={isDarkMode ? "sun" : 'moon'} /></button>
			<button class="btn text-gray-500"><Icon name="cog-8-tooth" class="h-6 w-6"/></button>
		</div>
	</div>
	<div class="flex flex-col w-full mt-20 flex-1 items-start">
		<h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking leading-relaxed  md:text-5xl xl:text-6xl dark:text-white">Hitung Cepat & Tepat</h1>
		<p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Aplikasi kasir untuk RM Sangkan Hurip</p>
		<div class="flex space-x-2">
			<button on:click={() => openModalSwithUser = true} class="btn-primary flex !px-5 !py-3 items-center space-x-1">
				<Icon name="calc" class="h-6 w-6" />
				<span>Masuk ke Aplikasi Kasir</span>
			</button>
			<button class="btn-secondary flex !px-5 !py-3 items-center space-x-1">
				<span>Halaman Admin</span>
			</button>
		</div>
	</div>
	<div class="w-full">
		<h1 class="text-center font-bold mb-2">Powered by</h1>
		<div class="flex justify-between py-2 w-2/5 mx-auto items-center">
			<a href="https://svelte.dev/" target="_blank">
				<img class="h-10" src={svelteLogo} alt="svelte logo">
			</a>
			<a href="https://tailwindcss.com/" target="_blank">
				<img class="h-10" src={tailwindLogo} alt="tailwind logo">
			</a>
			<a href="https://www.typescriptlang.org/" target="_blank">
				<img class="h-10" src={typescriptLogo} alt="typescript logo">
			</a>
			<a href="https://nodejs.org/" target="_blank">
				<img class="h-10" src={nodeJsLogo} alt="node js logo">
			</a>
			<a href="https://github.com/louischatriot/nedb" target="_blank">
				<img class="h-6" src={nedbLogo} alt="nedb logo">
			</a>

		</div>

		<h1 class="text-gray-500 text-center">Copyright © 2024 Deica Soft | All Rights Reserved</h1>
	</div>


</section>
