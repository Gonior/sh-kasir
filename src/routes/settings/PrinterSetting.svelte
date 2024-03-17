<script lang="ts">
	import { onMount } from 'svelte'
	import {slide} from 'svelte/transition'
	import {IModel} from '@lib/types'
	import Toogle from '@components/toggle.svelte'
	import Icon from '@components/Icon.svelte'
	// import toast from '@teddy-error/svelte-french-toast'
	import { Printer } from '@/lib/controller/printer.controlle'
	let listPrinter = []
	let addsPrinter : IModel.Printer[] = []
	let isChange = false
	let isLoading = false
	let useCopyPrinter = false
	let useAddsPrinter = false
	let mainPrinter = ""
	let copyPrinter = ""
	const printer = new Printer()
	onMount(async() => {
		let isSuccess = await printer.load()
		if (isSuccess) {
			listPrinter = printer.getListPrinterName()
			mainPrinter = printer.getMainPrinterName()
			copyPrinter = printer.getCopyPrinterName()
			addsPrinter = printer.getAddsPrinter()
			if(copyPrinter) useCopyPrinter = true
			if(addsPrinter.length >0) useAddsPrinter = true
		}
		
	})

	const saveChange = async () => {
		let printers: IModel.Printer[] = []
		if (mainPrinter) printers.push(Printer.generateObjectPrinter(mainPrinter, "main"))
		if (useCopyPrinter && copyPrinter) printers.push(Printer.generateObjectPrinter(copyPrinter, "copy"))

		if(addsPrinter.length > 0) {
			addsPrinter.forEach(printer => {
				if (printer.name) printers.push(Printer.generateObjectPrinter(printer.name, "adds", printer._id, printer.displayName))
			})
		}

		let response = await Printer.save(printers)
		if (response) {
			isChange = true
		}
		
	}

	const handleChange = (e, type?) => {
		if(type === "copy" && !e.detail?.checked) copyPrinter = ""
		if(type === "adds" && !e.detail?.checked) addsPrinter = []
		isChange = true
	}

	const handleTestPrint = (name : string) => {
		console.log(name)
		throw 'Not implement yet'
	}

	const handleAddPrinters = () => {
		let id = addsPrinter.length + 1

		let printer : IModel.Printer = {
			_id: `printer-add-${id}`,
			name: '',
			type: 'adds',
			displayName: `Printer Tambahan ${id}`,
		}

		addsPrinter = [...addsPrinter, printer]
		isChange = true
	}

	const handleDeletePrinterAdd = (id : any) => {
		addsPrinter = [...addsPrinter.filter((p) => p._id !== id)]
		isChange = true
	}
</script>


<div class="flex items-start w-3/4 justify-between mb-3">
	<div class="flex flex-col space-y-1">
		<h1 class="font-bold">Konfigurasi Printer</h1>
		<h2 class="text-gray-500 dark:text-gray-400">
			Daftarkan printer untuk keperluan Mencetak Struk Pembelian, maupun Struk Pemesanan.
		</h2>
	</div>
</div>
<div class="flex py-4">
	<div class="flex items-start w-full">
		<div class="w-1/2  flex flex-col">
			<h1 class="font-semibold">Printer Kasir</h1>
			<span class="text-sm text-gray-500 dark:text-gray-400">Lakukan Test Print untuk memastikan printer mencetak Struk</span>
		</div>
		<div class="w-1/2 flex items-start space-x-2">
			<select
				on:change={(e) => handleChange(e, "main")}
				class="form-control"
				bind:value={mainPrinter}>
				<option value="">--tidak ada--</option>
				{#each listPrinter as printer}
					<option value={printer.name}>{printer.displayName}</option>
				{/each}
			</select>
			<button
				class="btn-secondary"
				disabled={isLoading || !mainPrinter}
				on:click={() => handleTestPrint(mainPrinter)}>Test Print</button
			>
		</div>
	</div>
</div>
<div class="flex py-4">
	<div class="flex items-start w-full">
		<div class="w-1/2 flex flex-col">
			<h1 class="font-semibold">Printer Rekap Pesanan</h1>
			<span class="text-sm text-gray-500 dark:text-gray-400">Akan mencetak semua pesanan</span>
		</div>
		<div class="w-1/2">
			<Toogle bind:checked={useCopyPrinter} on:change={(e) => handleChange(e, 'copy')}/>
			{#if useCopyPrinter}
			<div transition:slide={{axis : 'y', duration : 200}} class="flex items-start space-x-2">
				<select
					on:change={handleChange}
					class="form-control"
					bind:value={copyPrinter}>
					<option value="">--tidak ada--</option>
					{#each listPrinter as printer}
						<option value={printer.name}>{printer.displayName}</option>
					{/each}
				</select>
				<button class="btn-secondary" disabled={isLoading || !copyPrinter} on:click={() => handleTestPrint(copyPrinter)}>Test Print</button>
			</div>
			{/if}
		</div>

	</div>
</div>
<div class="flex py-4">
	<div class="flex items-start w-full">
		<div class="flex flex-col w-1/2">
			<h1 class="font-semibold">Printer Tambahan</h1>
			<span class="text-sm pr-10 text-gray-500 dark:text-gray-400">Akan mencetak menu sesuai printer yang didaftarkan pada Kategori Menu.
				(Contoh : Mendaftarkan Printer A pada Kategori A, maka semua pesanan
				Kategori A Hanya muncul di Printer A.)</span>
		</div>
		<div class="w-1/2">
			<Toogle bind:checked={useAddsPrinter} on:change={(e) => handleChange(e, 'adds')} />
			{#if useAddsPrinter}
				<div transition:slide={{duration : 200, axis : 'y'}} class="flex flex-col items-start space-y-3">
					<button on:click={handleAddPrinters} class="btn-secondary flex items-center">
						<Icon name="plus" class="h-6 w-6" stroke={2}/>
						Tambah Printer
					</button>

					{#each addsPrinter as printer}
					<div class="flex items-end space-x-2">
						<div>
							<div class="flex items-center justify-between">
								<span class="text-sm text-gray-500 dark:text-gray-300">{printer.displayName}</span>
								<button class="btn font-bold text-orange-500" on:click={() => handleDeletePrinterAdd(printer._id)}>
									Hapus
								</button>
							</div>
							<div class=" flex items-start space-x-2 !mt-0">
								<select on:change={handleChange} class="form-control !mt-0" bind:value={printer.name} id={printer._id}>
									<option value="">--tidak ada--</option>
									{#each listPrinter as printer}
										<option value={printer.name}>{printer.name}</option>
									{/each}
								</select>
							</div>
						</div>

						<button class="btn-secondary" disabled={isLoading || !printer.name} on:click={() => handleTestPrint(printer.name)}>Test Print</button>
					</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
<div class="py-4 pr-10">
	<div class="flex justify-end ">
		<button disabled={isLoading || !isChange} on:click={() => saveChange()} class="btn-primary !px-5 !py-3 flex items-center">
			<span>Simpan</span>
		</button>
	</div>
</div>


<!-- <script>
	import { fade } from 'svelte/transition'
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
			_id: `printer-adds-${id}`,
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

<div class="flex flex-col" in:fade={{ duration: 300 }}>
	<div class="flex items-start w-3/4 justify-between mb-3">
		<div class="flex flex-col space-y-1">
			<h1 class="">Konfigurasi Printer</h1>
			<h2 class="text-gray-500 dark:text-gray-300">
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
