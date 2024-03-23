<script lang="ts">
	import { onMount } from 'svelte'
	import {slide} from 'svelte/transition'
	import {EPrinterID, EPrinterType, IModel} from '@lib/types'
	import Toogle from '@components/toggle.svelte'
	import Printer from '@/lib/controller/printer.controller'
	import {Constant} from '@lib/types'

	const printer = new Printer()

	let listInstalledPrinter = []
	let mainPrinter : IModel.IPrinter ={
		name: "",
		_id: EPrinterID.MAIN_PRINTER,
		type: EPrinterType.MAIN
	}
	let copyPrinter : IModel.IPrinter = {
		name: "",
		_id: EPrinterID.COPY_PRINTER,
		type: EPrinterType.COPY
	}
	let listAddonPrinterSkeleton :IModel.IPrinter[]= []
	let isChange = false
	let isLoading = false
	let useCopyPrinter = false
	let useAddsPrinter = false

	
	onMount(async() => {
		let isSuccess = await printer.load()
		if (isSuccess) {
			listInstalledPrinter = printer.getListInstalledPrinter()
			mainPrinter = printer.getMainPrinter()
			copyPrinter = printer.getCopyPrinter()
			listAddonPrinterSkeleton = printer.getListAddonPrinterSkeleton()
			if(copyPrinter.name) useCopyPrinter = true
			if(listAddonPrinterSkeleton.length >0) useAddsPrinter = true
		}
	})

	const saveChange = async () => {
		let printers: IModel.IPrinter[] = []
		if (mainPrinter.name) printers.push(mainPrinter)
		if (useCopyPrinter && copyPrinter.name) printers.push(copyPrinter)

		if(useAddsPrinter) {
			listAddonPrinterSkeleton.forEach(printer => {
				if (printer.name) printers.push(printer)
			})
		}

		let response = await Printer.save(printers)
		if (response) {
			isChange = true
		}

	}

	const handleChange = (e : any, type?: string) => {
		if(type === "copy" && !e.detail?.checked) copyPrinter.name = ""
		if(type === "addon") {
			if(e.detail.checked) {
				listAddonPrinterSkeleton = printer.getListAddonPrinterSkeleton()
			}
			else listAddonPrinterSkeleton = []
		}
		isChange = true
	}

	const handleTestPrint = (p : IModel.IPrinter) => {
		Printer.print(p, Constant.TEST_BILL_PRINT, {logo : true, storeInfo : true, summarize : true, price : true, whiteSpace : false} )
		// Printer.print(p, Constant.TEST_BILL_PRINT, {whiteSpace : true} )
	}


</script>


<div class="flex items-start w-11/12 sticky top-0 justify-between pb-5 bg-gray-50 dark:bg-gray-900 z-10">
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
		<div class="w-1/2 flex items-start space-x-2">
			<select
				on:change={(e) => handleChange(e, "main")}
				class="form-control"
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
					class="form-control"
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
			<Toogle bind:checked={useAddsPrinter} on:change={(e) => handleChange(e, 'addon')} />
			{#if useAddsPrinter}
				<div transition:slide={{duration : 200, axis : 'y'}} class="flex flex-col items-start space-y-3">
					{#each listAddonPrinterSkeleton as lpa}
					<div class="flex items-end space-x-2">
						<div>
							<div class="flex items-center justify-between">
								<span class="text-sm text-gray-500 dark:text-gray-300">{lpa.displayName}</span>
							</div>
							<div class=" flex items-start space-x-2 !mt-0">
								<select on:change={handleChange} class="form-control !mt-0" bind:value={lpa.name} id={lpa._id}>
									<option value="">--tidak ada--</option>
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

