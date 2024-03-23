<script lang="ts">

    import { computePosition, flip, offset, shift, type Placement } from '@floating-ui/dom'
    import { scale } from "svelte/transition";
    import { clickOutside } from '@lib/utils'
    import { dragscroll } from '@svelte-put/dragscroll';
    
	export let placement : Placement = 'bottom';
    let btnTrigger : HTMLElement
    let popoverRef : HTMLElement
    
    let popoverShow :boolean = false;
    const update = () => {
        computePosition(btnTrigger, popoverRef, {
            placement,
            middleware : [offset(5), flip(), shift({padding : 5})]
        }).then(({x,y}) => {
            Object.assign(popoverRef.style, {
                
                left: `${Math.trunc(x)}px`,
                top: `${Math.trunc(y)}px`
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
<div use:clickOutside on:click_outside={() => popoverShow = false} >
    <button bind:this={btnTrigger} on:click={() => tooglePopover()} id="button" aria-describedby="tooltip" type="button" class="flex items-center justify-center  btn {$$props.class}">
        <slot name="button"></slot>
    </button>
    {#if popoverShow}
        <div transition:scale={{start:0.9, duration:200}} bind:this={popoverRef} id="tooltip" role="tooltip" class="bg-gray-100 shadow dark:shadow-slate-500 dark:bg-gray-800 rounded-lg max-w-lg absolute z-50 py-2 ">
            <div class=" px-4 max-h-[80dvh] overflow-y-auto" use:dragscroll={{cursor : false, axis :'y'}}>
                <slot name="content"></slot>
            </div>
            <div class="px-2 flex items-center justify-center">
                <slot name="controls"></slot>
            </div>
        </div>
    {/if}
</div>
