<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'
	import { Constant, type IModel } from '@/lib/types'
	import Modal from '@components/modal/modal.svelte'
	import ModalHeader from '@components/navbar/modalHeader.svelte'
	import TextInput from '@components/forms/textInput.svelte';
	import { validator } from '@lib/utils'
	import Menu from '@lib/models/menu.model'
	import CategoryService from '@lib/services/category.service';
	import { focusTrap } from 'svelte-focus-trap'

	const categoryService = new CategoryService()

	export let _id : string = ''
	export let name : string = ''
	export let price : number = 0
	export let upc : number = null
	export let category : IModel.ICategory
	let listCategories : IModel.ICategory[] = []
	let selectedCategory : string = ""

	onMount(async () => {

		let isSuccess = await categoryService.load()
		if (isSuccess) {
			listCategories = categoryService.getData()
			if(!category) selectedCategory = categoryService.getDefaultCategory()?._id
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
			await validator.menuSchema.validate({name, price}, { abortEarly: false })
			errors = {name : "", price : ""};
			let response = false
			let menu = new Menu({name, category : selectedCategory, price, upc, _id})
			// if (!upc) delete payload.upc
			if(_id === "") {
				response = await menu.save()
			} else response = await menu.update()

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


