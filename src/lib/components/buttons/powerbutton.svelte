<script>
	import Icon from "@components/Icon.svelte";
	import ConfirmModal from '@components/modal/confirmModal.svelte';
	import {navigate} from 'svelte-routing'
	import {token, user} from '@store/index'
	export let text = ""
	export let closeApp = false
	let openConfirmModal = false
	const handleLogout = () => {
		token.set('')
		user.set(JSON.parse('{}'))
		navigate('/', {replace : true})
		if(closeApp) {
			// send event to electron
		}
	}

	const handleConfrim = (e) => {
		if(e.detail) handleLogout()

		openConfirmModal = false
	}

</script>
{#if openConfirmModal}
	<ConfirmModal title={"Konfirmasi Keluar Aplikasi"} confirmText={"Ya, Keluar"} on:close={(e) => openConfirmModal = e.detail} on:confirm={handleConfrim}>
		<p>Apakah anda yakin akan keluar?</p>
	</ConfirmModal>
{/if}

<button class={`btn-secondary !p-2 ${$$props.class}`} on:click={() => openConfirmModal = true}>
	<Icon name="logout" class="h-6 w-6" stroke={1.5}/>
	<span>{text}</span>
</button>
