<script lang="ts">
	import type { IModel } from "../../lib/types"
	import Icon from "../../lib/components/Icon.svelte";
	import InfoSetting from './InfoSetting.svelte'
	import ServerSetting from './ServerSetting.svelte'
	import PrinterSetting from './PrinterSetting.svelte'
	import TaxSetting from './TaxSetting.svelte'
	import { fade } from "svelte/transition"

	let submenu : IModel.ISubMenu[]= [
		{
			id: 1,
			name: 'Info',
			component: InfoSetting,
			selected: true,
			icon: 'building'
		},
		{
			id: 2,
			name: 'Server',
			component: ServerSetting,
			selected : false,
			icon: 'server'
		},
		{
			id: 3,
			name: 'Printer',
			component: PrinterSetting,
			selected: false,
			icon: 'printer'
		},
		{
			id: 4,
			name: 'Pajak',
			component: TaxSetting,
			selected: false,
			icon: 'receipt-percent'
		}
	]
	export let selectedId = submenu.find(s => s.selected).id
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

<div class="h-full flex flex-col w-full mt-5">
	<!-- header -->
	<div class="flex flex-col mb-5">

		<div class="flex items-center overflow-x-auto space-x-2">
			{#each submenu as sm}
				<button
					on:click={() => subMenuHandleClick(sm.id)}
					class="chips {sm.selected ? 'active' : '' }"
				>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<Icon name={sm.icon} />
					<span>{sm.name}</span>
				</button>
			{/each}
		</div>
	</div>
	{#key selectedId}
		<div class="flex-1 overflow-y-auto scrollbar flex flex-col" in:fade={{duration : 200}}>
			<svelte:component this={submenu.find((menu) => menu.selected === true).component}></svelte:component>
		</div>
	{/key}

</div>
