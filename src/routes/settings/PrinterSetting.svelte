<script lang="ts">
	import { onMount } from 'svelte'
	import {slide} from 'svelte/transition'
	import {IModel} from '@lib/types'
	import Toogle from '@components/forms/toggle.svelte'
	import PrinterService from '@lib/services/printer.service'
	import PrinterModel from '@lib/models/printer.model'

	const printerService = new PrinterService()

	let listInstalledPrinter = []
	let mainPrinter : any = {}
	let copyPrinter : any = {}
	let listAddonPrinter :IModel.IPrinter[]= []
	let isChange = false
	let isLoading = false
	let useCopyPrinter = false
	let useAddonPrinter = false

	
	onMount(async() => {
		let isSuccess = await printerService.load()
		if (isSuccess) {
			listInstalledPrinter = printerService.getListInstalledPrinter()
			mainPrinter = printerService.getMainPrinter()
			copyPrinter = printerService.getCopyPrinter()
			listAddonPrinter = printerService.getAddonPrinters()
			useAddonPrinter = printerService.useAddonPrinter()
			useCopyPrinter = printerService.useCopyPrinter()
		}
		
	})

	const saveChange = async () => {
		let printers: IModel.IPrinter[] = []
		if (mainPrinter.name) printers.push(mainPrinter)
		if (useCopyPrinter && copyPrinter.name) printers.push(copyPrinter)


		let response = await PrinterService.save({main : mainPrinter, copy : copyPrinter, addon : listAddonPrinter, useCopyPrinter, useAddonPrinter})
		if (response) {
			isChange = false
		}

	}

	const handleChange = (e : any, type? : string) => {
		if(type === "copy" && !e.detail?.checked) copyPrinter.name = ""
		if(type === "addon") {
			if(!e.detail.checked) {
				listAddonPrinter = listAddonPrinter.map(addonp => {
					addonp.name = ""
					return addonp
				})	
			}
		}
		isChange = true
	}

	const handleTestPrint = (p : IModel.IPrinter) => {
		let printerModel = new PrinterModel(p)
		printerModel.testPrint()
	}


</script>


<div class="flex items-start w-full sticky top-0 justify-between pb-5 pr-7 bg-gray-50 dark:bg-gray-900" style="z-index: 1;">
	<div class="flex flex-col space-y-1">
		<h1 class="font-bold">Konfigurasi Printer</h1>
		<h2 class="text-gray-500 dark:text-gray-400">
			Daftarkan printer untuk keperluan Mencetak Struk Pembelian, maupun Struk Pemesanan.
		</h2>
	</div>
	<button disabled={isLoading || !isChange} on:click={() => saveChange()} class="btn-primary !px-5 !py-3 flex items-center">
		<span>Simpan</span>
	</button>
</div>
<div class="flex py-4">
	<div class="flex items-start w-full">
		<div class="w-1/2  flex flex-col">
			<h1 class="font-semibold">Printer Kasir</h1>
			<span class="text-sm text-gray-500 dark:text-gray-400">Lakukan Test Print untuk memastikan printer mencetak Struk</span>
		</div>
		<div class="w-1/2 flex items-center	 space-x-2">
			<select
				on:change={(e) => handleChange(e, "main")}
				class="form-control w-3/4"
				bind:value={mainPrinter.name}>
				<option value="">--tidak ada--</option>
				{#each listInstalledPrinter as printer}
					<option value={printer.name}>{printer.displayName}</option>
				{/each}
			</select>
			<button
				class="btn-secondary"
				disabled={isLoading || !mainPrinter.name}
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
					class="form-control w-3/4"
					bind:value={copyPrinter.name}>
					<option value="">--tidak ada--</option>
					{#each listInstalledPrinter as printer}
						<option value={printer.name}>{printer.displayName}</option>
					{/each}
				</select>
				<button class="btn-secondary" disabled={isLoading || !copyPrinter.name} on:click={() => handleTestPrint(copyPrinter)}>Test Print</button>
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
			<Toogle bind:checked={useAddonPrinter} on:change={(e) => handleChange(e, 'addon')} />
			{#if useAddonPrinter}
				<div transition:slide={{duration : 200, axis : 'y'}} class="flex flex-col items-start space-y-3 w-full 	">
					{#each listAddonPrinter as lpa}
					<div class="flex items-end space-x-2 w-full ">
						<div class="w-3/4">
							<div class="flex items-center justify-between">
								<span class="text-sm text-gray-500 dark:text-gray-300">{lpa.displayName}</span>
							</div>
							<div class=" flex items-start space-x-2 !mt-0 ">
								<select on:change={handleChange} class="form-control w-full !mt-0" bind:value={lpa.name} id={lpa._id}>
									<option  value="">--tidak ada--</option>
									{#each listInstalledPrinter as printer}
										<option value={printer.name}>{printer.name}</option>
									{/each}
								</select>
							</div>
						</div>
						<button class="btn-secondary" disabled={isLoading || !lpa.name} on:click={() => handleTestPrint(lpa)}>Test Print</button>
					</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

