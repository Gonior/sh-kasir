<script lang="ts">
	// import Icon from '@components/Icon.svelte'
	// import Tooltip from '@components/popover.svelte'
	import { onMount } from 'svelte'
	import Wellcome from './routes/Wellcome.svelte';
	// import Cashier from './routes/Cashier.svelte'
	import {Toaster} from '@teddy-error/svelte-french-toast'
	// const ipcHandle = async (): Promise<void> => {
		// 	let response = await window.electron.ipcRenderer.invoke('print', {message : 'sayang isma'})
		// 	console.log(response)
		// }

	onMount( async () => {

		// toast(RichContent, { className : "text-red-500", props : {someProp : '😂'}})
		// toast.success('Hello, world!', {
		// 	position: "top-right"
		// })

	})


</script>

<Toaster toastOptions={{
	style : `
		font-size: 1rem;
		line-height : 1.5rem;
		font-weight : 500;
		background: #333;
      	color: #fff;
	`,

}}/>

<div class="h-screen select-none">

	<Wellcome />
</div>




