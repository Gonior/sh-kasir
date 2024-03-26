<script lang="ts">
	import { PaginationNav } from 'svelte-paginate'
	import { Constant } from '@lib/types'
	import {createEventDispatcher} from 'svelte'
	const dispatch = createEventDispatcher()
	import Icon from './Icon.svelte';
	export let currentPage = 1
	export let pageSize : number
	export let totalItems :number = 0
	$: dispatch('setPageSize', pageSize)
</script>

<div class="flex items-center justify-between my-2">
	<div>
		<span class="text-gray-500">Jumlah perhalaman</span>
		<select bind:value={pageSize} name="" id="" class="form-control !py-1 w-16">
			{#each Constant.PAGE_SIZE as page}
				<option value="{page.value}">{page.value}</option>
			{/each}
		</select>
	</div>
	<div class="my-pagination-nav max">
		<PaginationNav
			{totalItems}
			{pageSize}
			{currentPage}
			limit={1}
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


</div>

<style>
	:root{

		--primary-color : #d97706;;
	}

	.my-pagination-nav :global(.pagination-nav) {
		border-radius: 0.5rem;
		max-width: max-content;
		display: flex;
		justify-items: center;
		font-size: 0.875rem;
		line-height: 1.24rem;
	}
	.my-pagination-nav :global(.option) {
		width: 2.25rem;
		text-align: center;
		border-radius: 0.5rem;
		padding: 0.5rem;
		font-weight: 600;
		transition: all 200ms;
	}

	.my-pagination-nav :global(.option:active) {
		transform: scale(0.9);
	}

	.my-pagination-nav :global(.option.active) {
		color: var(--primary-color);
	}

	.my-pagination-nav :global(.option.disabled) {
		opacity: 0.5;
	}



</style>
