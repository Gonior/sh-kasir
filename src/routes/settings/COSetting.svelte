<script lang="ts">
	import { onMount , tick } from 'svelte'
	import { Constant, type IModel } from '@/lib/types'
	import { dndzone, type DndEvent } from "svelte-dnd-action";
	import { flip } from 'svelte/animate'
	import { toast } from 'svelte-sonner';
	import { v4 as uuidv4 } from 'uuid';
	import CategoryService from '@lib/services/category.service';
	import SortFormat from '@lib/models/sortFormat.model';
	import { scrollToBottom } from '@lib/utils'
	import Icon from '@components/ui/Icon.svelte';

	const categoryService = new CategoryService()
	const sortFormat = new SortFormat()


	let isLoading = false
	
	let dragging = false
	let listCategories : IModel.ICategory[] = []
	let fields : IModel.ISortItem[] = []
	let parentEl : HTMLElement

	$: dragDisabled = !dragging;
	onMount(async () => {
		await categoryService.load()
		let isSuccess = await sortFormat.load()

		if (isSuccess) {
			fields = sortFormat.values
			listCategories = categoryService.getData()
		}
	})
	

	const handleAddFields = async () => {
		fields = [...fields, { value : Constant.DEFAULT_CATEGORY_ID, id : uuidv4() } ]
		await tick()
		scrollToBottom(parentEl)
	}

	const handleConsider = (e : CustomEvent<DndEvent<IModel.ISortItem>>) => {		
		fields = e.detail.items
	}

	const handleFinalize = (e : CustomEvent<DndEvent<IModel.ISortItem>>) => {
		fields = e.detail.items
		dragging = false
	}

	const startDrag = () => {
		dragging = true
	}

	const stopDrag = () => {
		dragging = false
	}

	const handleDeleteField = (id : string) => {
		fields = [...fields.filter(field => field.id !== id)]
	}

	const handleSave = async () => {
		let isValid = true
		
		for (let i = 0; i < fields.length; i++) {
			let f = fields.filter(field => field.value === fields[i].value)
			if (f.length > 1) {
				isValid = false
				break;
			}
		}

		if(!isValid) {
			toast.error('Hanya diperbolehkan 1 Parameter 1 Kategori')	
			return 
		}
		
		sortFormat.update(fields)
		// toast.success('Berhasil menyimpan Urutan Pesanan')
	}

</script> 

<div class="max-h-full overflow-y-auto" bind:this={parentEl}>
	<div class="flex items-start w-full sticky top-0 justify-between pb-5 pr-7 bg-gray-50 dark:bg-gray-900 " style="z-index: 1;">
		<div class="flex flex-col space-y-1">
			<h1 class="font-bold">Customer Order (CO)</h1>
			<h5 class="text-gray-500 dark:text-gray-400">Atur urutan pesanan pada CO berdasarkan kategori.</h5>
		</div>
		<button on:click={() => handleSave()} disabled={isLoading} class="btn-primary !px-5 !py-3 flex items-center">
			<span>Simpan</span>
		</button>
	</div>
	<div class="max-w-xl" >
		<section 
			use:dndzone={{items : fields , dragDisabled, flipDurationMs : 100, dropTargetStyle : {}}} 
			on:consider={handleConsider}
			on:finalize={handleFinalize}>
			{#each fields as field, i (field.id)}
				<div class="flex py-2 pr-1 mb-2 items-center justify-between bg-gray-200 dark:bg-gray-800 rounded-md" animate:flip={{duration : 100}}>
					<h1 class="text-lg w-12 text-center flex-0 font-extrabold">{i+1}</h1>
					<div class="w-10/12 ">
						<select bind:value={field.value} class="form-control w-10/12">
							<option value="unsorted">--Tidak perlu disortir--</option>
							{#each listCategories as category}
								<option value={category._id}>{category.name}</option>
							{/each}
						</select>
					</div>
					<div class="flex space-x-0.5 ">
						<button class="btn text-gray-400" on:click={() => handleDeleteField(field.id)}>
							<Icon name="trash" class="h-6 w-6"/>
						</button>
						<button class="btn !px-0 text-gray-400" on:mousedown="{startDrag}" on:mouseup="{stopDrag}">
							<Icon name="grip-vertical" class="h-8 w-8"/>
						</button>
					</div>
					
				</div>
			{/each}
		</section>
	</div>
	
	<button on:click={() => handleAddFields()} class="btn-secondary tracking-wider flex items-center space-x-0.5">
		<Icon name="plus" class="h-6 w-6" />
		<span>Tambah Parameter</span>
	</button>		
</div>





