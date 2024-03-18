<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { IModel } from '@/lib/types'
	import Modal from './modal.svelte'
	import ModalHeader from '../navbar/modalHeader.svelte'
	import TextInput from '../forms/textInput.svelte';
	import { LIST_PRINTER_ADDS } from '@/lib/types/constants';
	import { categorySchema } from '@lib/utils/validator'
	import { Category } from '@lib/controller/category.controller'

	export let _id : string | number = ''
	export let name : string = ''
	export let printer : string | IModel.Printer

	let printerId = printer &&  typeof printer === 'object' && Object.keys(printer).length > 0 ? printer._id : ''
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
				response = await Category.save({name :  name, printer : printerId})
			} else response = await Category.update(_id, {name, printer : printerId, _id : _id as string})

			if(response) {
				setTimeout(() => handleClose(),1000)
				name = ""
				printerId = ""
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
			<select
				class="form-control w-full"
				bind:value={printerId}>
				<option value="">--tidak ada--</option>
				{#each LIST_PRINTER_ADDS as printer}
					<option value={printer._id}>{printer.displayName}</option>
				{/each}
			</select>
		</div>
		<div class="flex mt-4 justify-end">
			<div class="flex space-x-2">
				<button type="button" class="btn-secondary" on:click={handleClose}>Batal</button>
				<button type='submit' class="btn-primary" >{_id ? 'Ubah' :'Simpan'}</button>
			</div>
		</div>
	</form>
</Modal>


