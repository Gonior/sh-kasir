<script lang="ts">
	import type { ISubMenu } from "@lib/types"
	import Icon from "@/lib/components/ui/Icon.svelte";
	import ServerSetting from './ServerSetting.svelte'
	import PrinterSetting from './PrinterSetting.svelte'
	import Title from "@/lib/components/navbar/title.svelte";
	import { fade } from "svelte/transition"
	import { onMount } from "svelte"
	import { dragscroll } from '@svelte-put/dragscroll';

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
		}
	]
	export let selectedId = submenu.find(s => s.selected).id

	onMount(() => {
		subMenuHandleClick(selectedId)
	})

	const subMenuHandleClick = (id : string | number) => {
		submenu = [
			...submenu.map((s) => {
				if (s.id === id) {
					s.selected = true
					selectedId = s.id
				}
				else s.selected = false
				return s
			})
		]
	}
</script>

<div class="w-full flex flex-col h-full">
	<Title title="Pengaturan" />
	<div class="flex flex-col mb-5">
		<div class="flex items-center overflow-x-auto space-x-2">
			{#each submenu as sm}
				<button on:click={() => subMenuHandleClick(sm.id)} class="chips {sm.selected ? 'active' : '' }" >
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<Icon name={sm.icon} />
					<span>{sm.name}</span>
				</button>
			{/each}
		</div>
	</div>
	{#key selectedId}
		<div use:dragscroll={{axis : 'y', cursor : false}} class="flex-1 h-[50%] max-h-full overflow-y-auto pb-10" in:fade={{duration : 200}} style="scrollbar-gutter: stable;">
			<svelte:component this={submenu.find((menu) => menu.id === selectedId).component}></svelte:component>
		</div>
	{/key}
</div>
