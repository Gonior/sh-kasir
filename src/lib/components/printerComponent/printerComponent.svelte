<script lang="ts">
    import Icon from "../Icon.svelte";
    import {IModel} from '@lib/types'
    export let printer : IModel.IPrinter 
</script>

<div class="flex items-center space-x-1 justify-start my-1">
    <Icon name='printer' class="!w-10 !h-10"/>
    <div class="text-left">
        <p class="font-bold">{printer.displayName}</p>
        {#if printer.name}
        <p class="-mt-1">{printer.name}</p>
        {:else}
        <span class="text-red-600 font-bold -mt-1">Printer Tidak Dikonfigurasi</span>
        {/if}
    </div>
</div>