<script lang="ts">

    import { computePosition, flip, offset, shift, arrow, type Placement } from '@floating-ui/dom'
    import { scale } from "svelte/transition";
    import { clickOutside } from '@lib/utils'
    export let title :string = ""
	export let placement : Placement = 'top';
    let btnTrigger : HTMLElement
    let popoverRef : HTMLElement
    let arrowEL : HTMLElement
    let popoverShow :boolean = false;
    const update = () => {
        computePosition(btnTrigger, popoverRef, {
            placement,
            middleware : [offset(10), flip(), shift({padding : 5}), arrow({element : arrowEL})]
        }).then(({x,y}) => {
            Object.assign(popoverRef.style, {
                left: `${x}px`,
                top: `${y}px`
            })
        })
    }

    const tooglePopover = () => {
        if(popoverShow) popoverShow = false
        else {
            popoverShow = true
            setTimeout(() => update(), 0)
        }

    }
</script>
<div use:clickOutside on:click_outside={() => popoverShow = false}>
    <button bind:this={btnTrigger} on:click={() => tooglePopover()} id="button" aria-describedby="tooltip" type="button" class="flex items-center justify-center btn {$$props.class}">
        <slot name="button"></slot>
    </button>
    {#if popoverShow}
        <div in:scale={{start:0.9, duration:200}} out:scale={{duration:100, start:0.9}} bind:this={popoverRef} id="tooltip" role="tooltip" class="bg-gray-100 shadow dark:shadow-slate-500 dark:bg-gray-800 text-sm rounded-lg w-max max-w-lg absolute z-50 py-2 space-y-1">
            {#if title}
            <h1 class="text-center font-bold">{title}</h1>
            <hr class="border-gray-300 dark:border-gray-600"/>
            {/if}
            <div class="px-2">
                <slot name="content"></slot>
            </div>
            <div class="px-2 flex items-center justify-center">
                <slot name="controls"></slot>
            </div>
        </div>
    {/if}
</div>
