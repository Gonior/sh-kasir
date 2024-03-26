<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'
	import type { IModel } from '@/lib/types'
	import Modal from '@components/modal/modal.svelte'
	import ModalHeader from '@components/navbar/modalHeader.svelte'
	import TextInput from '@components/forms/textInput.svelte';
	import { validator } from '@lib/utils'
	import CategoryService from '@lib/services/category.service'
	import PrinterService from '@lib/services/printer.service';
	import { focusTrap } from 'svelte-focus-trap'
	// import Icon from '../Icon.svelte'

	const printerService = new PrinterService()

	export let _id : string = ''
	export let name : string = ''
	export let printer : IModel.IPrinter[] = []
	let selectedPrinter : string[] = []
	let listPrinter : IModel.IPrinter[] = []

	onMount(async () => {

		// please FIX THIS : done
		let isSuccess = await printerService.load()
		if (isSuccess) {
			listPrinter = printerService.getListAddonPrinterSkeleton()
			if (printer.length > 0) selectedPrinter = printer.map(p => p._id)
		}
	})

	let errors = {
		name : ""
	}

	const dispatch = createEventDispatcher()
	const handleClose = (requireReload:boolean = false) => {
		dispatch('close', {requireReload, openModal : false})
	}

	const handleSubmit = async () => {
		try {
			await validator.categorySchema.validate({name}, { abortEarly: false })
			errors = {name : ""};
			let response = false
			if(_id === "") {
				response = await CategoryService.save({name :  name, printer : selectedPrinter})
			} else response = await CategoryService.update(_id, {name, printer : selectedPrinter, _id : _id as string})

			if(response) {
				setTimeout(() => handleClose(true),300)
				name = ""
				selectedPrinter = []
				_id = ""
			}


		} catch (error) {
			errors = error.inner.reduce((acc: any, err: { path: any; message: any }) => {
            	return { ...acc, [err.path]: err.message };
          	}, {});
		}
	}
</script>

<Modal class="w-1/3 h-max" outside={false}>
	<form on:submit|preventDefault={handleSubmit} use:focusTrap>
		<ModalHeader on:close={() => handleClose(false)} title={_id ? 'Ubah Kategori' :'Tambah Kategori'}/>
		<TextInput class={'my-2'} label="Nama Kategori" bind:value={name} isFocused={true} errorMsg={errors.name} />
		<div class="my-2">

			<h1>Printer Tambahan</h1>
			<div class="space-y-1">
				{#each listPrinter as lsp}
					<label for={lsp._id} class="flex items-center space-x-1 max-w-max ">
						<input id={lsp._id} type="checkbox" name="printer" bind:group={selectedPrinter} value={lsp._id} />
						<p class="">{lsp.displayName} {lsp.name ? `(${lsp.name})` : ''}</p>
					</label>
				{/each}
			</div>

		</div>
		<div class="flex mt-4 justify-end">
			<div class="flex space-x-2">
				<button type="button" class="btn-secondary" on:click={() => handleClose(false)}>Batal</button>
				<button type='submit' class="btn-primary" >{_id ? 'Ubah' :'Simpan'}</button>
			</div>
		</div>
	</form>
</Modal>


