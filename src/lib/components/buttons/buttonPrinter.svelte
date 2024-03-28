
<script lang="ts">
    import Icon from '@components/ui/Icon.svelte'
    import {scale} from 'svelte/transition'

    let num = 2
</script>

<button class="btn-secondary relative flex-0 !max-h-max !p-2">
    <Icon name="printer" class="h-6 w-6" />
    {#key num}
        <div in:scale={{duration : 200}} class="w-5 h-5 flex items-center justify-center absolute bg-red-500 rounded-full -top-2 -right-2 text-white text-xs">
            <span class="">{num}</span>
        </div>
    {/key}
</button>


							