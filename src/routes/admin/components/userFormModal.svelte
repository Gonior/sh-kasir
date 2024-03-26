<script lang="ts">
	import Modal from '@components/modal/modal.svelte'
	import { userSchema } from '@/lib/utils/logic/validator'
	import User from '@lib/models/user.model'
	import { focusTrap } from 'svelte-focus-trap'
	import { createEventDispatcher, onMount } from 'svelte'
	import ModalHeader from '@components/navbar/modalHeader.svelte'
	import TextInput from '@components/forms/textInput.svelte';
	const dispatch = createEventDispatcher()

	let errors = {
		name : "",
		passcode : "",
		confirmPasscode : ""

	}
	let values = {
		name : '',
		passcode : '',
		confirmPasscode : ''
	}
	onMount(async() => {


	})

	const handleSubmit = async () => {
		try {
			await userSchema.validate(values, { abortEarly: false })
			errors = {name : "", passcode : '', confirmPasscode : ""};
			let user = new User({name : values.name, passcode : values.passcode})
			let response = await user.save()
			if(response) {
				setTimeout(() => handleClose(true),300)
				values = {name : "", passcode : '', confirmPasscode : ""}
			}

		} catch (error) {
			errors = error.inner.reduce((acc, err) => {
            	return { ...acc, [err.path]: err.message };
          	}, {});
		}
	}

	const handleClose = (requireReload:boolean = false) => {
		dispatch('close', {requireReload, openModal : false})
	}
</script>

<Modal class="w-2/5" outside={false}>
	<form on:submit|preventDefault={handleSubmit} use:focusTrap>
		<ModalHeader on:close={() => handleClose(false)} title={'Tambah Pengguna'}/>
		<TextInput  class="my-2" isFocused={true} errorMsg={errors.name} bind:value={values.name} label={"nama"}/>
		<div class="flex gap-2 my-2 ">
			<TextInput class="w-1/2" typeInput="password" errorMsg={errors.passcode} bind:value={values.passcode} label={"PIN"}/>

			<TextInput class="w-1/2" typeInput="password" errorMsg={errors.confirmPasscode} bind:value={values.confirmPasscode} label={"Konfirmasi PIN"}/>

		</div>
		<div class="flex mt-4 justify-end">
			<div class="flex space-x-2">
				<button type="button" class="btn-secondary" on:click={() => handleClose(false)}>Batal</button>
				<button type='submit' class="btn-primary" >Simpan</button>
			</div>
		</div>
	</form>
</Modal>
