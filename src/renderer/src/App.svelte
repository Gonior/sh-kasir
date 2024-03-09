<script lang="ts">
	// import electronLogo from './assets/electron.svg'
	// import Versions from '@components/Versions.svelte'
	import Icon from '@components/Icon.svelte'
	import Tooltip from '@components/popover.svelte'
	
	// const ipcHandle = async (): Promise<void> => {
	// 	let response = await window.electron.ipcRenderer.invoke('print', {message : 'sayang isma'})
	// 	console.log(response)
	// }
	
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



