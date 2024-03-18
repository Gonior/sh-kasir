<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'
	import type { IModel } from '@/lib/types'
	import Modal from './modal.svelte'
	import ModalHeader from '../navbar/modalHeader.svelte'
	import TextInput from '../forms/textInput.svelte';
	import { categorySchema } from '@lib/utils/validator'
	import { Category } from '@lib/controller/category.controller'
	import { Printer } from '@/lib/controller/printer.controlle';

	const printerClass = new Printer()

	export let _id : string | number = ''
	export let name : string = ''
	export let printer : IModel.Printer[] | string[] = []
	let listPrinter : IModel.Printer[] = []
	let selection : string []= []
	onMount(async () => {

		// please FIX THIS
		let isSuccess = await printerClass.load()
		if (isSuccess) {
			listPrinter = printerClass.getListPrinterAdds()
			selection = [...printer.map((p) => p._id )	]
		}
	})
	
	let errors = {
		name : ""
	}

	const dispatch = createEventDispatcher()
	const handleClose = () => {
		dispatch('close', false)
	}

	const handleSubmit = async () => {
		try {
			await categorySchema.validate({name}, { abortEarly: false })
			errors = {name : ""};
			let response = false
			if(_id === "") {
				response = await Category.save({name :  name, printer})
			} else response = await Category.update(_id, {name, printer, _id : _id as string})

			if(response) {
				setTimeout(() => handleClose(),300)
				name = ""
				printer = []
				_id = ""
			}


		} catch (error) {
			errors = error.inner.reduce((acc: any, err: { path: any; message: any }) => {
            	return { ...acc, [err.path]: err.message };
          	}, {});
		}
	}
</script>

<Modal class="w-1/3" outside={false}>
	<form on:submit|preventDefault={handleSubmit}>
		<ModalHeader on:close={handleClose} title={_id ? 'Ubah Kategori' :'Tambah Kategori'}/>
		<TextInput class={'my-2'} label="Nama Kategori" bind:value={name} isFocused={true} errorMsg={errors.name} />
		<div class="my-2">
			<p>Printer Tambahan</p>
			
			{#each listPrinter as lsp}
				<div>
					<label><input type="checkbox" name="printer" bind:group={selection} value={lsp._id} /> {lsp.displayName} : {lsp.name}</label>
				</div>
			{/each}
			
		</div>
		<div class="flex mt-4 justify-end">
			<div class="flex space-x-2">
				<button type="button" class="btn-secondary" on:click={handleClose}>Batal</button>
				<button type='submit' class="btn-primary" >{_id ? 'Ubah' :'Simpan'}</button>
			</div>
		</div>
	</form>
</Modal>


