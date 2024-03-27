
<script lang="ts">
	
	import {type ISubMenu} from '@lib/types'
	import Workspace from './workspace.svelte'
	import Homepage from './homepage.svelte'
	import Icon from '@components/ui/Icon.svelte'
	import Navbar from '@components/navbar/navbar.svelte';
	import ButtonUser from '@components/ui/buttonUser.svelte';
	import Clock from '@components/ui/clock.svelte';
	import PrinterContainer from '@components/ui/printerContainer.svelte';
	let submenu : ISubMenu[]= [
		{
			id: 1,
			name: 'Home Page',
			component: Homepage,
			selected : true,
			icon: 'home'
		},
		{
			id: 2,
			name: 'Workspace',
			component: Workspace,
			selected: false,
			icon: 'calc'
		}
	]
	const subMenuHandleClick = (id : string | number) => {
		submenu = [
			...submenu.map((s) => {
				if (s.id === id) {
					s.selected = true
				}
				else s.selected = false
				return s
			})
		]
	}
</script>
<div class="flex h-full">
	<Navbar direction="vertical" showSetting={false}>
		{#each submenu as sm}
			{#if sm.id !== 5}
			<button on:click={() => subMenuHandleClick(sm.id)} class="btn-secondary !p-2 {sm.selected ? '!bg-amber-600 !text-white !ring-0' : ''}">
				<Icon name={sm.icon} class="h-6 w-6" />
			</button>
			{/if}
		{/each}
	</Navbar>
	<div class="flex-1 h-full max-h-full flex flex-col pt-3">
		<div class="flex justify-between items-start px-3">
			<Clock />
			<div class="flex space-x-3">
				<PrinterContainer />
				<ButtonUser />
			</div>
		</div>
		<div class="flex-1 overflow-hidden">
			<svelte:component this={submenu.find((menu) => menu.selected).component} ></svelte:component>
		</div>
	</div>
</div>

