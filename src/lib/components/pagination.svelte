<script lang="ts">
	import {PaginationNav} from 'svelte-paginate'
	import {  PAGE_SIZE } from '../types/constants'
	import {createEventDispatcher} from 'svelte'
	const dispatch = createEventDispatcher()
	import Icon from './Icon.svelte';
	export let currentPage = 1
	export let pageSize : number
	export let totalItems :number = 0
	$: dispatch('setPageSize', pageSize)
</script>

<div class="my-pagination-nav my-2">
	<div>
		<span class="text-gray-500">Jumlah perhalaman</span>
		<select bind:value={pageSize} name="" id="" class="form-control !py-1">
			{#each PAGE_SIZE as page}
				<option value="{page.value}">{page.value}</option>
			{/each}
		</select>
	</div>
	<PaginationNav
		{totalItems}
		{pageSize}
		{currentPage}
		limit={2}
		showStepOptions={true}
		on:setPage={(e) => dispatch('setpage', {page : e.detail.page})}>
		<svelte:fragment slot="prev">
			<Icon name="chevron" stroke={3} class="rotate-0" />
		</svelte:fragment>
		<svelte:fragment slot="next">
			<Icon name="chevron" stroke={3} class="rotate-180" />
		</svelte:fragment>
	</PaginationNav>

</div>

<style>
	:root{
		--text-color: #000;
		--body-bg: #fff;
		--primary-color : #000;
	}
	/* .my-pagination-nav {
		@apply flex items-center justify-between;
	}

	.my-pagination-nav :global(.pagination-nav) {
		@apply rounded-lg max-w-max flex items-center text-sm;
	}

	.my-pagination-nav :global(.option) {
		@apply btn w-9 text-center;
	}

	.my-pagination-nav :global(.option.active) {
		@apply text-amber-600;
	}

	.my-pagination-nav :global(.option.disabled) {

		@apply text-gray-500 dark:text-gray-400;
	} */
</style>
