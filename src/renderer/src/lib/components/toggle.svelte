<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    const dispath = createEventDispatcher()

    let id = Date.now()
    export let checked : boolean = false
    export let disabled : boolean = false

    const onChange = (e: any) => {
        dispath('change', {checked : (e.target as HTMLInputElement).checked})
    }
    
</script>
<label for={`check-${id}`} class="{checked ? 'bg-amber-600' : 'bg-gray-300'} disabled:bg-gray-200 dark:disabled:bg-gray-700 transition-colors duration-300 cursor-pointer relative inline-flex items-center h-6 w-12 rounded-full">
    <input on:change={onChange} disabled={disabled} id={`check-${id}`} type="checkbox" bind:checked class="sr-only peer"/>
    <div class="h-4 w-4 bg-white absolute rounded-full left-1 top-1 peer-checked:left-7 transition-all duration-300"></div>
</label>