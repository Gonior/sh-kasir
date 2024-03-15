<script>
	// import Title from '../../lib/components/title.svelte'
	// import { IModel } from '@/lib/types'

	// let keyword
	// let users = []
	// function handleSearch() {
	// 	throw new Error('Function not implemented.')
	// }

	// function handleOpenModal() {
	// 	throw new Error('Function not implemented.')
	// }

	// function generateBullet(passcode) {
	// 	throw new Error('Function not implemented.')
	// }

	// function revealPassword(_id) {
	// 	throw new Error('Function not implemented.')
	// }
</script>

<!-- <div class="h-full flex flex-col w-full 2xl:w-2/3">
	<Title title="Pengguna" />
	<div class="flex items-center justify-between">
		<div class="relative w-1/2">
			<input
				on:keyup={handleSearch}
				type="text"
				bind:value={keyword}
				class="form-control !pl-6 text-sm !py-1 w-full placeholder:font-normal"
				placeholder="Cari Pengguna.." />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-5 h-5 text-gray-500 absolute left-1 top-1">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
			</svg>
		</div>
		<div>
			<button
				class="btn-primary flex items-center text-sm"
				on:click={() => handleOpenModal()}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-4 h-4">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
				Tambah Pengguna
			</button>
		</div>
	</div>

	<div class="flex-1 overflow-y-auto scrollbar flex flex-col my-5 rounded-lg w-full">
		{#if users.length > 0}
			<table class="relative table-fixed w-full text-sm text-left rtl:text-right">
				<thead class=" text-gray-700 dark:text-white uppercase">
					<tr class="">
						<th
							scope="col"
							class="sticky top-0 p-2 rounded-l-lg bg-gray-100 dark:bg-gray-700 w-8"
							>No.</th>
						<th scope="col" class="sticky top-0 p-2 bg-gray-100 w-1/3 dark:bg-gray-700"
							>Nama Pengguna</th>
						<th scope="col" class="sticky top-0 p-2 bg-gray-100 dark:bg-gray-700"
							>PIN</th>
						<th
							scope="col"
							class="sticky top-0 py-2 pr-10 rounded-r-lg bg-gray-100 dark:bg-gray-700 w-24 text-right"
							>ACTION</th>
					</tr>
				</thead>
				<tbody class="text-gray-500 dark:text-gray-300">
					{#each users as user}
						<tr class="border-b">
							<td class="p-2 text-center"></td>
							<td class="p-2">{user.name}</td>
							<td class="p-2">
								<div class="flex items-center space-x-2">
									{#if user.invisible}
										<span class="flex space-x-0.5 items-center">
											
											{@html generateBullet(user.passcode)}
										</span>
									{:else}
										<span>{user.passcode}</span>
									{/if}
									<button
										class="btn-ghost"
										on:click={() => revealPassword(user._id)}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="w-4 h-4">
											{#if user.invisible}
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
											{:else}
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
											{/if}
										</svg>
									</button>
								</div>
							</td>
							<td class="p-2">
								<button
									on:click={() => {
										const userToDelete = { ...user }
										const openConfirmModal = true
									}}
									class="btn-ghost text-red-500">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-5 h-5">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
									</svg>
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<div class="flex w-full h-full items-center justify-center flex-col">
				<div class="text-gray-300">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-20 h-20">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
					</svg>
				</div>
				<h1 class="text-gray-300">Tidak ada data pengguna</h1>
			</div>
		{/if}
	</div>
</div> -->
