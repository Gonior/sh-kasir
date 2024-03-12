<script>
	import {onMount, createEventDispatcher} from 'svelte'
	import Modal from "./modal.svelte";
	import {generateAvatar} from '../utils/myFunct'
	import Icon from './Icon.svelte'
	// import {handleGetUsers, handleLogin} from '../../lib/serverController'
	// import { failure, success } from '../../lib/toast'
	let navigation = 1
	const dispatch = createEventDispatcher()
	let users = []
	let isLoading
	export let show = false
	export let outside = true
	export let overlay = true
	onMount( async () => {
		// let response = await handleGetUsers()

		// if(response && response.length > 0) {
		// 	users = [...response]
		// 	users = [...users.map(u => {
		// 		u.avatar = generateAvatar(u.name)
		// 		return u
		// 	})
		// ]}

	})

	// const handleSwitch = async (switcher) => {
	// 	isLoading = true
	// 	let obj = {...switcher}
	// 	delete obj.avatar
	// 	obj.navigation = navigation
	// 	$user = {...obj}
	// 	let response = await handleLogin($user.passcode, $user.navigation)
	// 	isLoading = false
	// 	if(response && response.success) {
	// 		success('Ganti Pengguna berhasil')
	// 		dispatch('close', false)
	// 	} else failure(response.message)


	// }
</script>

<Modal class="w-1/2  flex flex-col space-y-2" {show} {outside} {overlay}>
	<div class="flex items-center justify-between">
		<h1 class="text-gray-500 dark:text-white font-bold text-lg">Login Sebagai</h1>
		<button disabled={isLoading} on:click={() => dispatch('close', false)} class="btn-ghost text-gray-500 dark:text-gray-300">
			<Icon name="close" class="h-6 w-6" ></Icon>
		</button>
	</div>
		<div class="flex flex-col">
			<div class="grid grid-flow-row gap-1 grid-cols-4">
				{#each users as switcher}
				<button disabled={isLoading} class="btn-ghost flex flex-col rounded-lg bg-gray-100 dark:bg-gray-700 items-center space-x-1" on:click={() => handleSwitch(switcher)}>
					<img src={switcher.avatar} alt={`avatar-${switcher.name}`} class="">

					<span class="text-gray-500 dark:text-white">{switcher.name}</span>
				</button>
				{:else}
				<div class="col-span-4 flex flex-col items-center justify-center text-gray-400 ">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" class="w-24 h-24 ">
						<path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
					  </svg>
					  <span class="-mt-3">Tidak ada pengguna yang lain</span>
				</div>
				{/each}
			</div>
			<!-- <div class="flex items-center justify-between mt-5">
				<h1 class="text-gray-500 dark:text-gray-400">Pengguna saat ini</h1>
				<div class="flex items-center space-x-1">
					<img src={generateAvatar($user.name)} alt={`avatar-${$user.name}`} class="h-8 w-8">
					<div class="rounded-full w-max p-1 bg-gray-100 dark:bg-gray-700  text-gray-500 dark:text-gray-400">

						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
						</svg>
					</div>
					<span class="">{$user.name}</span>
				</div>
			</div> -->
		</div>
</Modal>
