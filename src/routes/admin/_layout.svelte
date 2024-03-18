<script lang="ts">
	import { dragscroll } from '@svelte-put/dragscroll';
	import Navbar from '@/lib/components/navbar/navbar.svelte';
	import Userpage from './userpage.svelte'
	import Categorypage from  './categorypage.svelte'
	import Menupage from './menupage.svelte'
	import Infopage from './Infopage.svelte'
	import Settingpage from '../settings/_layout.svelte'
	import {IModel} from '../../lib/types'
	import Icon from '@/lib/components/Icon.svelte'
	let submenu : IModel.ISubMenu[]= [
		{
			id: 1,
			name: 'Info',
			component: Infopage,
			selected : true,
			icon: 'building'
		},
		{
			id: 2,
			name: 'Pengguna',
			component: Userpage,
			selected: false,
			icon: 'user'
		},
		{
			id: 3,
			name: 'Ketegori',
			component: Categorypage,
			selected: false,
			icon: 'folder'
		},
		{
			id: 4,
			name: 'Menu',
			component: Menupage,
			selected: false,
			icon: 'book'
		},{
			id: 5,
			name: 'Pengaturan',
			component: Settingpage,
			selected: false,
			icon: 'book'
		},
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
<div class="flex h-full gap-2">
	<Navbar direction="vertical" openSetting={submenu.find((menu) => menu.id === 5 ).selected} on:openSetting={() => subMenuHandleClick(5)}>
		{#each submenu as sm}
			{#if sm.id !== 5}
			<button on:click={() => subMenuHandleClick(sm.id)} class="btn-secondary !p-2 {sm.selected ? '!bg-amber-600 !text-white !ring-0' : ''}">
				<Icon name={sm.icon} class="h-6 w-6" />
			</button>
			{/if}
		{/each}
	</Navbar>

	<div use:dragscroll={{axis :'y', cursor : false}} class="flex-1 h-full max-h-full overflow-y-auto p-5">
		<svelte:component this={submenu.find((menu) => menu.selected).component} ></svelte:component>
	</div>
</div>
<!-- <Powerbutton/> -->
