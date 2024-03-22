<script lang="ts">
	import { onMount } from 'svelte'
	import { Toaster} from '@teddy-error/svelte-french-toast'
	import Home from "@routes/_layout.svelte";
	import Admin from "@routes/admin/_layout.svelte";
	import Cashier from "@routes/cashier/_layout.svelte";
	import NotFound from '@routes/404.svelte'
	import { handleSwitchTheme } from '@lib/utils/myFunct'
	// eslint-disable-next-line no-unused-vars
	import { theme, page } from '@store/index';

	onMount( async () => {
		handleSwitchTheme($theme === 'dark')
	})

	const pages = [
		{ id: "Home", component: Home },
		{ id: "Admin", component: Admin },
		{ id: "Cashier", component: Cashier },
  	];
	
	const getComponent = function () {
		try {
			return pages.find((p) => p.id === $page).component;
		} catch (e) {
			return NotFound;
		}
	}

</script>

<Toaster toastOptions={{
	position : 'top-left',
	style : `
		font-size: 1rem;
		line-height : 1.5rem;
		font-weight : 500;
		background: #333;color: #fff;
	`
}}/>

<div class="h-screen select-none">
	<svelte:component this={getComponent()}/>
</div>
