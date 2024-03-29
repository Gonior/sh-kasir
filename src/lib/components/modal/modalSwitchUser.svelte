<script lang="ts">

	import { onMount } from 'svelte'
	import Modal from "./modal.svelte";
	import Icon from '@components/ui/Icon.svelte'
	import Errorstate from '@components/state/errorstate.svelte'
	import User from '@lib/models/user.model'
	import UserService from '@lib/services/user.service';
	import { createEventDispatcher } from 'svelte'
	import { generateAvatar } from '@lib/utils/'
	import type { IModel } from '@/lib/types'

	const dispatch = createEventDispatcher()
	const userService = new UserService()

	export let outside = true
	export let overlay = true
	export let currentUser = undefined

	let listUser: IModel.IUser[] = []
	let isLoadingData = true
	let isValid = false
	let isLoading = false
	onMount( async () => {
		console.log('haii')
		let isSuccess = await userService.load()
		if (isSuccess) {
			isValid = true
			listUser = userService.getData()
		}

		isLoadingData = false

	})

	const handleSwitch = async (switcher : IModel.IUser) => {
		let user = new User(switcher)
		let isSuccess = await user.login()
		if (isSuccess) dispatch('success')

	}
</script>

<Modal class="w-1/2  flex flex-col space-y-2" {outside} {overlay} on:close={() => dispatch('close', false)}>
	<div class="flex items-center justify-between">
		<h1 class=" font-bold text-lg">Login Sebagai</h1>
		<button disabled={isLoading} on:click={() => dispatch('close', false)} class="btn-ghost text-gray-500 dark:text-gray-300">
			<Icon name="close" class="h-6 w-6" ></Icon>
		</button>
	</div>
	{#if isLoadingData}
	<div class="flex flex-col">
		<div class="grid grid-flow-row gap-1 grid-cols-4">
			<div class="container-placeholder h-32 w-36"></div>
			<div class="container-placeholder h-32 w-36"></div>
			<div class="container-placeholder h-32 w-36"></div>
			<div class="container-placeholder h-32 w-36"></div>
		</div>
	</div>
	{:else if isValid}
	<div class="flex flex-col">
		<div class="grid grid-flow-row gap-1 grid-cols-4">
			{#each listUser as user}
				{#if user._id !== (currentUser && currentUser?._id)}
				
				<button on:click={() => handleSwitch(user)} disabled={isLoading} class="btn flex flex-col rounded-lg bg-gray-200 !py-2 dark:bg-gray-700 items-center space-y-1">
					<img src={generateAvatar(user.name)} alt={`avatar-${user.name}`} class="">
					<span class="">{user.name}</span>
				</button>
				{/if}
			{:else}
				<div class="col-span-4 flex flex-col items-center justify-center text-gray-400 ">
					<Icon name="user" class="!h-24 !w-24" stroke={1}/>
					<span class="-mt-3">Tidak ada pengguna {currentUser ? 'yang lain' : ''}</span>
				</div>
			{/each}
		</div>
		{#if currentUser}
		<div class="flex items-center justify-between mt-5">
			<h1 class="text-gray-500 dark:text-gray-400">Pengguna saat ini</h1>
			<div class="flex items-center space-x-1">
				<img src={generateAvatar(currentUser.name)} alt={`avatar-${currentUser.name}`} class="h-6 w-6">
				<span class="">{currentUser.name}</span>
			</div>
		</div>
		{/if}
	</div>
	{:else}
	<Errorstate msg ="Gagal Memuat Data Pengguna"/>
	{/if}
</Modal>

