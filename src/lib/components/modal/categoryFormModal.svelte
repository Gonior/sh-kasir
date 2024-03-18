<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import Modal from './modal.svelte'
	import ModalHeader from '../navbar/modalHeader.svelte'
	import type { IModel } from '@/lib/types'
	export let _id : string | number = ''
	export let name : string = ''
	export let printer : string | IModel.Printer
	let printerName = printer ?? ""
	const dispatch = createEventDispatcher()
	const handleClose = () => {
		dispatch('close', false)
	}
</script>

<Modal class="w-1/2" >
	<ModalHeader on:close={handleClose} title={'Tambah Kategori'}/>
	<span>{_id}</span>
	<span>{name}</span>
	<span>{printer}</span>
</Modal>


