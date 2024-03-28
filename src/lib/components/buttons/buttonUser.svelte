<script>
    import Icon from '../ui/Icon.svelte';
    import { generateAvatar } from '@lib/utils'
	import { user } from '@lib/store'
	import ModalSwitchUser from '../modal/modalSwitchUser.svelte'
    let openModalSwithUser = false
    
</script>

{#if openModalSwithUser}
	<ModalSwitchUser currentUser={$user} on:close={(e) => openModalSwithUser = e.detail} on:success={() => openModalSwithUser = false} />
{/if}
<button on:click={() => openModalSwithUser = true} class="btn-secondary flex items-center space-x-4 !p-2">
    <div class="flex space-x-1 items-center">
        <img src={generateAvatar($user.name)} class="h-6 w-6" alt={`avatar-${$user.name}`}>
        <span>{$user.name}</span>
    </div>
    <Icon name="arrow-left-right" class="h-6 w-6" />
</button>