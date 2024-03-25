<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'
	import { Constant, type IModel } from '@/lib/types'
	import Modal from './modal.svelte'
	import ModalHeader from '../navbar/modalHeader.svelte'
	import TextInput from '../forms/textInput.svelte';
	import { menuSchema } from '@/lib/utils/logic/validator'
	import Menu from '@lib/controller/menu.controller'
	import Category from '@/lib/controller/category.controller';
	import { focusTrap } from 'svelte-focus-trap'
	const categoryController = new Category()
	export let _id : string | number = ''
	export let name : string = ''
	export let price : number = 0
	export let upc : number = null
	export let category : IModel.ICategory | string = null
	let listCategories : IModel.ICategory[] = []
	let selectedCategory : string = ""

	onMount(async () => {

		// please FIX THIS
		let isSuccess = await categoryController.load()
		if (isSuccess) {
			listCategories = categoryController.getData()
			if(!category) selectedCategory = categoryController.getDefaultCategory()?._id
			else selectedCategory = category && typeof category === 'object' && category._id || Constant.DEFAULT_CATEGORY_ID
		}

	})

	let errors = {
		name : "",
		price : "",

	}

	const dispatch = createEventDispatcher()

	const handleClose = (requireReload:boolean = false) => {
		dispatch('close', {requireReload, openModal : false})
	}

	const handleSubmit = async () => {
		try {
			await  menuSchema.validate({name, price}, { abortEarly: false })
			errors = {name : "", price : ""};
			let response = false
			let payload = {name, category : selectedCategory, price, upc, _id : _id as string}
			if(!upc) delete payload.upc
			if(_id === "") {
				delete payload._id
				response = await Menu.save(payload)
			} else response = await Menu.update(_id, payload)

			if(response) {
				setTimeout(() => handleClose(true),300)
				name = ""
				selectedCategory = ""
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

			<h1>Kategori</h1>
			<div class="space-y-1">
				<select bind:value={selectedCategory} class="form-control w-full">
					{#each listCategories as lc}
						<option value={lc._id}>{lc.name}</option>
					{/each}
				</select>
			</div>

		</div>
		<div class="flex gap-2 my-2 ">
			<TextInput class="w-1/2" typeInput="number" bind:value={upc} label={"UPC"}/>

			<TextInput class="w-1/2" typeInput="number" errorMsg={errors.price} bind:value={price} label={"Harga"}/>

		</div>
		<div class="flex mt-4 justify-end">
			<div class="flex space-x-2">
				<button type="button" class="btn-secondary" on:click={() => handleClose(false)}>Batal</button>
				<button type='submit' class="btn-primary" >{_id ? 'Ubah' :'Simpan'}</button>
			</div>
		</div>
	</form>
</Modal>


