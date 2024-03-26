<script lang="ts">
	import { onMount } from 'svelte'
	import Home from "@routes/_layout.svelte";
	import Admin from "@routes/admin/_layout.svelte";
	import Cashier from "@routes/cashier/_layout.svelte";
	import NotFound from '@routes/404.svelte'
	import {Toaster as ToasterSonner } from 'svelte-sonner'
	import { switchTheme } from '@lib/utils'
	// eslint-disable-next-line no-unused-vars
	import { theme, page } from '@store/index';

	onMount( async () => {
		switchTheme($theme === 'dark')
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
	$: t = $theme as 'dark' | 'light' | 'system'	

</script>

<ToasterSonner expand={true} visibleToasts={5} theme={t} position="top-right" toastOptions={{
	style : 'font-size: 0.875rem;'
}} />


<div class="h-screen select-none">
	<svelte:component this={getComponent()}/>
</div>
