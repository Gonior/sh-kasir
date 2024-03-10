<script lang="ts">
	// import electronLogo from './assets/electron.svg'
	// import Versions from '@components/Versions.svelte'
	import Icon from '@components/Icon.svelte'
	import Tooltip from '@components/popover.svelte'
	import { onMount } from 'svelte'
	import { count } from './lib/stores/count'
	import Cashier from './routes/Cashier.svelte'
	// const ipcHandle = async (): Promise<void> => {
	// 	let response = await window.electron.ipcRenderer.invoke('print', {message : 'sayang isma'})
	// 	console.log(response)
	// }

	onMount( async () => {
		let response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
		let json = await response.json()
		count.set(json)

		console.log('the component mounted');
	})


</script>

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




