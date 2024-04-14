
<script lang="ts">
	
	import {IModel, type ISubMenu} from '@lib/types'
	import { selectId } from '@lib/utils';
	import Workspace from './workspace/_layout.svelte'
	import Homepage from './_home/_layout.svelte'
	import Icon from '@components/ui/Icon.svelte'
	import Navbar from '@components/navbar/navbar.svelte';
	import ButtonUser from '@components/buttons/buttonUser.svelte';
	import Clock from '@components/ui/clock.svelte';
	import ButtonPrinter from '@components/buttons/buttonPrinter.svelte';
	import StoreController from '@lib/controller/store.controller';
	import { onMount } from 'svelte'
	import { taxInfo as taxInfoLocalStorage, storeInfo as storeInfoLocalStorage } from '@lib/store'

	const storeController = new StoreController()

	let storeInfo : IModel.IStoreInfo = {
		name: '',
		address: '',
		phone: '',
		footerNote: ''
	}
	let taxInfo : IModel.ITax = {
		checked: false,
		name : '',
		value : 0
	}

	let submenu : ISubMenu[]= [
		{
			id: 1,
			name: 'Home Page',
			component: Homepage,
			selected : false,
			icon: 'home'
		},
		{
			id: 2,
			name: 'Workspace',
			component: Workspace,
			selected: true,
			icon: 'calc'
		}
	]

	onMount( async () => {
		let isSuccess = await storeController.init()
		if( isSuccess ) {
			storeInfo = {...storeController.getStoreInfo()}
			taxInfo = {...storeController.getTaxInfo()}
			storeInfoLocalStorage.set(storeInfo)
			taxInfoLocalStorage.set(taxInfo)
			console.log($taxInfoLocalStorage)
		}
	})

	const subMenuHandleClick = (id : string | number) => {
		submenu = [...selectId(submenu, id)]
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
	<div class="flex-1 h-full max-h-full flex flex-col">
		<div class="flex justify-between items-start px-3 py-2.5 bg-gray-100 dark:bg-gray-800">
			<div class="flex items-center space-x-2">
				<Icon name="building" class='!h-8 !w-8' stroke={1.5} />
				<div>
					<p class="text-base truncate font-inter font-bold"> {storeInfo.name}</p>				
					<p class="text-xs text-gray-500 dark:text-gray-300">{storeInfo.address}</p>
				</div>
			</div>
			
			<div class="flex space-x-3">
				<ButtonPrinter />
				<ButtonUser />
				<Clock />
			</div>
		</div>
		<div class="flex-1 overflow-hidden">
			<svelte:component this={submenu.find((menu) => menu.selected).component} ></svelte:component>
		</div>
	</div>
</div>

