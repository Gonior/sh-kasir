<script lang="ts">
	import { fade } from "svelte/transition"
	import {get} from 'svelte/store'
	import { onMount } from "svelte"
	import { dragscroll } from '@svelte-put/dragscroll';
	import type { ISubMenu } from "@lib/types"
	// eslint-disable-next-line no-unused-vars
	import {user as userStored} from "@lib/store"
	import User from "@lib/models/user.model"
	import ServerSetting from './ServerSetting.svelte'
	import PrinterSetting from './PrinterSetting.svelte'
	import CoSetting from "./COSetting.svelte"
	import Icon from "@components/ui/Icon.svelte";
	import Title from "@components/navbar/title.svelte";
	import { isValidObject, selectId } from "@/lib/utils"
	
	let isLogged = false
	let localUserStored = get(userStored)
	let submenu : ISubMenu[]= [
		{
			id: 1,
			name: 'Server',
			component: ServerSetting,
			selected : true,
			icon: 'server'
		},
		{
			id: 2,
			name: 'Printer',
			component: PrinterSetting,
			selected: false,
			icon: 'printer'
		},
		{
			id: 3,
			name: 'Customer Order (CO)',
			component: CoSetting,
			selected: false,
			icon: 'receipt'
		}
	]
	export let selectedId = submenu.find(s => s.selected).id

	onMount(async () => {
		if (localUserStored && isValidObject(localUserStored)) {
			
			let user = new User(localUserStored)
			isLogged = await user.login()
		}
		subMenuHandleClick(selectedId)
	})

	const subMenuHandleClick = (id : string | number) => {
		submenu = [...selectId(submenu, id, (__id) => selectedId = __id)]
	}
</script>

<div class="w-full flex flex-col h-full">
	<Title title="Pengaturan" />
	<div class="flex flex-col mb-5 ">
		<div class="flex items-center overflow-x-auto space-x-2 p-2">
			{#each submenu as sm}
				{#if sm.id !== 3}
					<button on:click={() => subMenuHandleClick(sm.id)} class="chips {sm.selected ? 'active' : '' }" >
						<Icon name={sm.icon} />
						<span>{sm.name}</span>
					</button>
				{:else if isLogged}
					<button on:click={() => subMenuHandleClick(sm.id)} class="chips {sm.selected ? 'active' : '' }" >
						<Icon name={sm.icon} />
						<span>{sm.name}</span>
					</button>
				{/if}	
			{/each}
		</div>
	</div>
	{#key selectedId}
		<div use:dragscroll={{axis : 'y', cursor : false}} class="flex-1 h-[50%] max-h-full overflow-y-auto pb-10" in:fade={{duration : 200}} style="scrollbar-gutter: stable;">
			<svelte:component this={submenu.find((menu) => menu.id === selectedId).component}></svelte:component>
		</div>
	{/key}
</div>
