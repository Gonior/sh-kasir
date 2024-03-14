<!-- <script>
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import { failure, success } from '../../lib/toast'
	let printersName = []
	let configPrinter = {}
	let addsPrinter = []
	let isChange = false
	let isLoading = false
	let copyPrinter = {}
	let mainPrinter = {}

	onMount(async () => {
		printersName = await window.electronAPI.getPrintersName()
		configPrinter = { ...(await window.electronAPI.readConfigPrinterFile()) }
		addsPrinter = [...configPrinter.additionalPrinters]
		copyPrinter = { ...configPrinter.copyPrinter }
		mainPrinter = { ...configPrinter.mainPrinter }
	})

	const handleAddPrinters = () => {
		let id = addsPrinter.length + 1

		let newPrinter = {
			typeOfPrinter: 'additional',
			type: 'local',
			_id: `printer-add-${id}`,
			displayName: `Printer Tambahan ${id}`,
			nameOfPrinter: ''
		}

		addsPrinter = [...addsPrinter, newPrinter]

		isChange = true
	}

	const handleSave = async () => {
		copyPrinter.typeOfPrinter = 'copy'
		copyPrinter._id = 'printer-copy'
		copyPrinter.type = 'local'
		mainPrinter.typeOfPrinter = "main"
		mainPrinter._id = 'printer-main'
		mainPrinter.type = "local"
		configPrinter.mainPrinter = !mainPrinter.nameOfPrinter ? {} : mainPrinter
		configPrinter.copyPrinter = !copyPrinter.nameOfPrinter ? {} : copyPrinter
		configPrinter.additionalPrinters = [...addsPrinter.filter((p) => p.nameOfPrinter !== '')]
		let response = await window.electronAPI.writeConfigPrinterFile(configPrinter)
		if (response) {
			success(response)
			isChange = false
		} else failure('Gagal menyimpan konfigurasi')
	}

	const handleChange = () => {
		isChange = true
	}

	const handleTestPrint = async (printerObj) => {
		let obj = { ...printerObj }
		obj.typeOfPrinter = 'main'
		isLoading = true
		let response = await window.electronAPI.testPrint(obj)
		if (response.status) success(`Berhasil mencetak ke ${response.nameOfPrinter}`)
		else failure(response.message)

		isLoading = false
	}

	const handleDeletePrinterAdd = (printerObj) => {
		addsPrinter = [...addsPrinter.filter((p) => p._id !== printerObj._id)]
		isChange = true
	}
</script>

<div class="flex flex-col text-sm" in:fade={{ duration: 300 }}>
	<div class="flex items-start w-3/4 justify-between mb-3">
		<div class="flex flex-col space-y-1">
			<h1 class="">Konfigurasi Printer</h1>
			<h2 class="text-gray-500 dark:text-gray-300 text-sm">
				Konfigurasi kebutuhan printer disini
			</h2>
		</div>
		<div class="w-1/2 flex items-start space-x-2 justify-end">
			<button on:click={handleSave} disabled={!isChange} class="btn-primary">Simpan</button>
		</div>
	</div>
	<hr />
	<div class="">
		<div class="flex my-4">
			<div class="flex items-start w-full">
				<div class="w-1/3 pr-10 flex flex-col">
					<h1>Printer Kasir</h1>
					<span class="text-xs text-gray-500 dark:text-gray-300"
						>Lakukan Test Print untuk memastikan printer mencetak bill</span
					>
				</div>
				<div class="w-1/2 flex items-start space-x-2">
					<select
						on:change={handleChange}
						class="form-control"
						bind:value={mainPrinter.nameOfPrinter}
					>
						<option value="">--tidak ada--</option>
						{#each printersName as printer}
							<option value={printer.name}>{printer.displayName}</option>
						{/each}
					</select>
					<button
						class="btn-secondary"
						disabled={isLoading || !mainPrinter.nameOfPrinter}
						on:click={() => handleTestPrint(mainPrinter)}>Test Print</button
					>
				</div>
			</div>
		</div>
		<hr />
		<div class="flex my-4">
			<div class="flex items-start w-full">
				<div class="flex flex-col w-1/3 pr-10">
					<h1>Printer Rekap Pesanan</h1>
					<span class="text-xs text-gray-500 dark:text-gray-300"
						>Akan mencetak semua pesanan</span
					>
				</div>
				<div class="w-1/2 flex items-start space-x-2">
					<select
						on:change={handleChange}
						class="form-control"
						bind:value={copyPrinter.nameOfPrinter}
					>
						<option value="">--tidak ada--</option>
						{#each printersName as printer}
							<option value={printer.name}>{printer.displayName}</option>
						{/each}
					</select>
					<button
						class="btn-secondary"
						disabled={isLoading || !copyPrinter.nameOfPrinter}
						on:click={() => handleTestPrint(copyPrinter)}>Test Print</button
					>
				</div>
			</div>
		</div>
		<hr />
		<div class="flex my-4">
			<div class="flex items-start w-full">
				<div class="flex flex-col w-1/3 pr-10">
					<h1>Printer Tambahan</h1>
					<span class="text-xs text-gray-500 dark:text-gray-300"
						>Akan mencetak menu sesuai printer yang didaftarkan pada Kategori Menu.
						(Contoh : Mendaftarkan Printer A pada Kategori A, maka semua pesanan
						Kategori A Hanya muncul di Printer A.)</span
					>
				</div>
				<div class="w-1/2 flex flex-col items-start space-y-3">
					<button on:click={handleAddPrinters} class="btn-secondary flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-4 h-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
						Tambah Printer
					</button>

					{#each addsPrinter as printer}
						<div class="flex items-center justify-between w-1/2">
							<span class="text-sm text-gray-500 dark:text-gray-300"
								>{printer.displayName}</span
							>
							<button
								class="btn-ghost text-orange-500"
								on:click={() => handleDeletePrinterAdd(printer)}>Hapus</button
							>
						</div>
						<div class=" flex items-start space-x-2 !mt-0">
							<select
								on:change={handleChange}
								class="form-control !mt-0"
								bind:value={printer.nameOfPrinter}
								id={printer._id}
							>
								<option value="">--tidak ada--</option>
								{#each printersName as printer}
									<option value={printer.name}>{printer.name}</option>
								{/each}
							</select>
							<button
								class="btn-secondary"
								disabled={isLoading || !printer.nameOfPrinter}
								on:click={() => handleTestPrint(printer)}>Test Print</button
							>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div> -->
