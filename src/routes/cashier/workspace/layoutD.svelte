<script lang="ts">
    import { Constant, IModel } from '@lib/types'
    import { ascendingAlphabetByName } from '@lib/utils'
    let listNotes : {name: string}[] = [...Constant.TEMPLATE_NOTE.sort(ascendingAlphabetByName).map( note => {return {...note}})]

    // eslint-disable-next-line no-unused-vars
    export let handleAddNote : (params : {name : string}) => void
    export let items : IModel.IItem[] = []
    export let selectedMenu : IModel.IItem

    $: isDisabledToAddNote = items.length === 0 
        || (selectedMenu && (!!selectedMenu?.forId || selectedMenu.printed) ) 
        || ((items.length > 0 && items.filter(i => !i.forId)[items.filter(i => !i.forId).length-1].printed) ?? true)
</script>

<div class="grid grid-rows-5 grid-cols-4 gap-1 h-full p-2">
    {#each listNotes as note}
        <button disabled={ isDisabledToAddNote } on:click={() => handleAddNote({...note})} class="btn-secondary text-sm text-left truncate !py-1 !px-2">
            {note.name}
        </button>
    {/each}
    
</div>