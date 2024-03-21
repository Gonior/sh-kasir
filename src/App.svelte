<script lang="ts">
	import { onMount } from 'svelte'
	import { Toaster} from '@teddy-error/svelte-french-toast'
	// import { Router,  Route } from "svelte-routing";
	import Home from "@routes/_layout.svelte";
	// import Admin from "@routes/admin/_layout.svelte";
	// import Cashier from "@routes/cashier/_layout.svelte";
	import { handleSwitchTheme } from '@lib/utils/myFunct'
	// eslint-disable-next-line no-unused-vars
	import { theme } from '@store/index';
  	// export let url = "";

	// const basepath = /^\/?[a-zA-Z]+:/.test(window.location.pathname)
    // 	? window.location.pathname.substr(0, window.location.pathname.indexOf(":") + 1)
    // 	: "/"
	// const ipcHandle = async (): Promise<void> => {
		// 	let response = await window.electron.ipcRenderer.invoke('print', {message : 'sayang isma'})
		// 	console.log(response)
		// }

	onMount( async () => {
		handleSwitchTheme($theme === 'dark')
	})



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

<Home/>

<!-- FIX : Navigasi manual -->
<!-- <Router {url} basepath={basepath}>
	<div class="h-screen select-none">
		<Route path="/cashier" component={Cashier} />
		<Route path="/admin" component={Admin} />
		<Route path="/"><Home/></Route>
	</div>
</Router> -->
