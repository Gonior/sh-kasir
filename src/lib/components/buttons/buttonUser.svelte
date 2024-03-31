<script>
    import {createEventDispatcher} from 'svelte'
    import Icon from '../ui/Icon.svelte';
    import { generateAvatar } from '@lib/utils'
	import { user } from '@lib/store'
	import ModalSwitchUser from '../modal/modalSwitchUser.svelte'

    const dispatch = createEventDispatcher()

    let openModalSwithUser = false
    
</script>

{#if openModalSwithUser}
	<ModalSwitchUser currentUser={$user} on:close={(e) => {openModalSwithUser = e.detail,dispatch('close')}} on:success={() => {openModalSwithUser = false, dispatch('close')}} />
{/if}
<button type="button" on:click={() => openModalSwithUser = true} class="btn-secondary flex items-center space-x-4 !p-2">
    <div class="flex space-x-1 items-center">
        <img src={generateAvatar($user.name)} class="h-6 w-6" alt={`avatar-${$user.name}`}>
        <span>{$user.name}</span>
    </div>
    <Icon name="arrow-left-right" class="h-6 w-6" />
</button>