<script lang="ts">

	import toast from '@teddy-error/svelte-french-toast'
	import Modal from "./modal.svelte";
	import Icon from './Icon.svelte'
	import { onMount, createEventDispatcher } from 'svelte'
	import { generateAvatar } from '../utils/myFunct'
	import { HttpService } from '../services/http.service'
	import { IModel, IService } from '../types';
	import { token } from '../store'
	const dispatch = createEventDispatcher()
	const http = new HttpService()
	let users : IModel.User[] = []
	let isLoading : boolean = false
	export let outside = true
	export let overlay = true
	export let user = undefined

	onMount( async () => {
		const response = await http.service().get<IService.IResponse<IModel.User[]>>(`/login`);

		if(response?.data && response?.data.length > 0) {
			users = [...response.data]
			users = [...users.map(u => {
				u.avatar = generateAvatar(u.name)
				return u
			})
		]}

	})

	const handleSwitch = async (switcher : IModel.User) => {
		const http = new HttpService()
		isLoading = true
		let response = await http.service().push<IService.IResponse<IModel.User>, IModel.User>(`/login`, switcher);
		isLoading = false
		if(response && response.success) {
			toast.success('Ganti Pengguna berhasil')
			token.set(response.token)
			dispatch('success', response.data)
		} else toast.error(response.message)
	}
</script>

<Modal class="w-1/2  flex flex-col space-y-2" {outside} {overlay} on:close={() => dispatch('close', false)}>
	<div class="flex items-center justify-between">
		<h1 class="text-gray-500 dark:text-white font-bold text-lg">Login Sebagai</h1>
		<button disabled={isLoading} on:click={() => dispatch('close', false)} class="btn-ghost text-gray-500 dark:text-gray-300">
			<Icon name="close" class="h-6 w-6" ></Icon>
		</button>
	</div>
		<div class="flex flex-col">
			<div class="grid grid-flow-row gap-1 grid-cols-4">
				{#each users as switcher}
				<button on:click={() => handleSwitch(switcher)} disabled={isLoading} class="btn flex flex-col rounded-lg bg-gray-100 !py-2 dark:bg-gray-700 items-center space-y-1">
					<img src={switcher.avatar} alt={`avatar-${switcher.name}`} class="">
					<span class="">{switcher.name}</span>
				</button>
				{:else}
				<div class="col-span-4 flex flex-col items-center justify-center text-gray-400 ">
					<Icon name="user" class="h-20 w-20"/>
					<span class="-mt-3">Tidak ada pengguna yang lain</span>
				</div>
				{/each}
			</div>
			{#if user}
			<div class="flex items-center justify-between mt-5">
				<h1 class="text-gray-500 dark:text-gray-400">Pengguna saat ini</h1>
				<div class="flex items-center space-x-1">
					<img src={generateAvatar(user.name)} alt={`avatar-${user.name}`} class="h-8 w-8">
					<div class="rounded-full w-max p-1 bg-gray-100 dark:bg-gray-700  text-gray-500 dark:text-gray-400">

						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
						</svg>
					</div>
					<span class="">{user.name}</span>
				</div>
			</div>
			{/if}
		</div>
</Modal>

