<script lang="ts">
	import Modal from '@/lib/components/modal/modal.svelte'
	import { userSchema } from '@lib/utils/validator'
	import {User} from '@lib/controller/user.controller'
	import { focusTrap } from 'svelte-focus-trap'
	import { createEventDispatcher, onMount } from 'svelte'
	import ModalHeader from '../navbar/modalHeader.svelte'
	import TextInput from '@/lib/components/forms/textInput.svelte';
	const dispatch = createEventDispatcher()
	const user = new User()

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
			let response = await user.save({name :  values.name, passcode : values.passcode})
			if(response) {
				setTimeout(() => handleClose(),1000)
				values = {name : "", passcode : '', confirmPasscode : ""}
			}

		} catch (error) {
			errors = error.inner.reduce((acc, err) => {
            	return { ...acc, [err.path]: err.message };
          	}, {});
		}
	}

	const handleClose = () => {
		dispatch('close', false)
	}
</script>

<Modal class="w-2/5" outside={false}>
	<form on:submit|preventDefault={handleSubmit} use:focusTrap>
		<ModalHeader on:close={handleClose} title={'Tambah Pengguna'}/>
		<TextInput  class="my-2" isFocused={true} errorMsg={errors.name} bind:value={values.name} label={"nama"}/>

<!--
		<div class="my-2">
			<p>Nama</p>
			<input bind:this={inputEl} bind:value={values.name} type="text" class="form-control w-full">
			{#if errors.name}
				<p class="text-red-500 text-sm">{errors.name}</p>
			{/if}
		</div> -->
		<div class="flex gap-2 my-2 ">
			<TextInput class="w-1/2" typeInput="password" errorMsg={errors.passcode} bind:value={values.passcode} label={"PIN"}/>
			<!-- <div class="w-1/2">
				<p>PIN</p>
				<input bind:value={values.passcode} type="password" class="form-control appearance-none w-full">
				{#if errors.passcode}
					<p class="text-red-500 text-sm">{errors.passcode}</p>
				{/if}
			</div> -->
			<TextInput class="w-1/2" typeInput="password" errorMsg={errors.confirmPasscode} bind:value={values.confirmPasscode} label={"Konfirmasi PIN"}/>
			<!-- <div class="w-1/2">
				<p>Konfirmasi PIN</p>
				<input bind:value={values.confirmPasscode} type="password" class="form-control w-full">
				{#if errors.confirmPasscode}
					<p class="text-red-500 text-sm">{errors.confirmPasscode}</p>
				{/if}
			</div> -->
		</div>
		<div class="flex mt-4 justify-end">
			<div class="flex space-x-2">
				<button type="button" class="btn-secondary" on:click={handleClose}>Batal</button>
				<button type='submit' class="btn-primary" >Simpan</button>
			</div>
		</div>
	</form>
</Modal>
