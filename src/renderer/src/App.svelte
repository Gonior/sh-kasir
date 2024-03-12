<script lang="ts">
	// import electronLogo from './assets/electron.svg'
	// import Versions from '@components/Versions.svelte'
	import Icon from '@components/Icon.svelte'
	import Tooltip from '@components/popover.svelte'
	import { onMount } from 'svelte'
	import Cashier from './routes/Cashier.svelte'
	import RichContent from './lib/components/toast.svelte'
	import toast, { Toaster } from 'svelte-french-toast';
	// const ipcHandle = async (): Promise<void> => {
		// 	let response = await window.electron.ipcRenderer.invoke('print', {message : 'sayang isma'})
		// 	console.log(response)
		// }
		
	onMount( async () => {
			
		toast(RichContent, { })
		
	})


</script>

<Toaster/>
<Tooltip>
	<svelte:fragment slot="button">
		<Icon name="home" />
	</svelte:fragment>
	<svelte:fragment slot="content">
		test tooltip
	</svelte:fragment>
</Tooltip>
<h1>hai</h1>
<Cashier/>




