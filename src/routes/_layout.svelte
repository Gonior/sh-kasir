<script lang="ts">
	import {fade} from 'svelte/transition'
	// import { navigate } from 'svelte-routing'
	import Icon from "@components/Icon.svelte";
	// import nedbLogo from '@assets/icons/nedb.png'
	// import nodeJsLogo from '@assets/icons/nodejs-original.svg'
	// import svelteLogo from '@assets/icons/svelte-icon.svg'
	// import typescriptLogo from '@assets/icons/typescript-plain.svg'
	// import tailwindLogo from '@assets/icons/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg'
	import ModalSwitchUser from '@components/modal/modalSwitchUser.svelte'
	import {IModel} from '@lib/types'
	import {page} from '@lib/store'
	import Footer from "@components/footer.svelte"
	import Navbar from "@components/navbar/navbar.svelte"
	import SettingLayout from '@routes/settings/_layout.svelte'
	let openModalSwithUser = false
	let openSetting = false
	let loginInto : IModel.TPage = "Cashier"
	const handleSuccess = () => {
		openModalSwithUser = false
		page.set(loginInto)
		
	}

</script>
{#if openModalSwithUser}
	<ModalSwitchUser on:close={(e) => openModalSwithUser = e.detail} on:success={handleSuccess} />
{/if}
<section class="py-6 flex flex-col px-4 lg:px-0 max-w-screen-lg items-center mx-auto h-full">
	<Navbar {openSetting} on:openSetting={() => openSetting = !openSetting}/>
	<div class="w-full h-full max-h-full overflow-hidden {openSetting ? 'py-4' : 'mt-20'}" in:fade={{duration : 200}}>
		{#if openSetting}
			<SettingLayout/>
		{:else}
		<div class="flex flex-col justify-between h-full">
			<div class="flex-1" >
				<h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking leading-relaxed  md:text-5xl xl:text-6xl dark:text-white">Hitung Cepat & Tepat</h1>
				<p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Aplikasi kasir untuk RM Sangkan Hurip</p>
				<div class="flex space-x-2">
					<button on:click={() => {openModalSwithUser = true, loginInto = "Cashier"}} class="btn-primary flex !px-5 !py-3 items-center space-x-1">
						<Icon name="calc" class="h-6 w-6" />
						<span>Masuk ke Aplikasi Kasir</span>
					</button>
					<button on:click={() => {openModalSwithUser = true, loginInto = "Admin"}}  class="btn-secondary flex !px-5 !py-3 items-center space-x-1">
						<span>Halaman Admin</span>
					</button>
				</div>
			</div>
			<!-- <div class="w-full">
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
			</div> -->
		</div>

		{/if}
	</div>
	<Footer/>
</section>

<!-- <style lang="postcss">
	.mycontainer {
		@apply flex flex-col w-full flex-1 overflow-hidden max-h-full items-start;
	}
</style> -->
