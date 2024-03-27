<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import {PaginationNav} from 'svelte-paginate'
    import Icon from "@components/ui/Icon.svelte";
    const dispatch = createEventDispatcher()
    export let currentPage : number
    export let totalItems : number
    export let pageSize : number

</script>

<div class="my-pagination-nav w-full">
    <PaginationNav 
        {currentPage}
        {totalItems}
        {pageSize}
        showStepOptions={true}
        on:setPage={e => dispatch('setPage', {page : e.detail.page})} >
            <button slot="prev" class="btn-secondary">
                <Icon name="chevron" stroke={3} class="rotate-0" />
            </button>
            <span slot="number">
                
            </span>
            <button slot="next" class="btn-secondary">
                <Icon name="chevron" stroke={3} class="rotate-180" />
            </button>
            
    </PaginationNav>
</div>

<style lang="postcss">
    .my-pagination-nav :global(.pagination-nav) {
		border-radius: 0.5rem;
		max-width: 100%;
		display: flex;
        justify-content: space-between;
		justify-items: center;
		font-size: 0.875rem;
        
		line-height: 1.24rem;
	}
    .my-pagination-nav :global(.option.disabled) {
		opacity: 0.5;
	}

</style>